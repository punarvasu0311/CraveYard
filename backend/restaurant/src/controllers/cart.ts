import mongoose from "mongoose";
import { AuthenticatedRequest } from "../middlewares/isAuth.js";
import TryCatch from "../middlewares/trycatch.js";
import Cart from "../models/Cart.js";

export const addToCart = TryCatch(async (req: AuthenticatedRequest, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Please Login",
    });
  }

  const userId = req.user._id;

  const { restaurantId, itemId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(restaurantId) ||
    !mongoose.Types.ObjectId.isValid(itemId)
  ) {
    return res.status(400).json({
      message: "Invalid restaurant or item id",
    });
  }

  const cartFromDifferentRestaurant = await Cart.findOne({
    userId,
    restaurantId: { $ne: restaurantId }, //it asks restaurantid which is not eqaul to current one
  });

  if (cartFromDifferentRestaurant) { //if we get another cart for same user from different restaurant
    return res.status(400).json({
      message:
        "You can order from only one restaurant at a time. Please clear your cart first to add items from this restaurant.",
    });
  }
  //template to increment quantity if same triplet is found and insert it again back to db
  const cartItem = await Cart.findOneAndUpdate(
    { userId, restaurantId, itemId },
    {
      $inc: { quauntity: 1 },//here 1 signifies the quantity is incremented by 1
      $setOnInsert: { userId, restaurantId, itemId },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return res.json({
    message: "Item added to cart",
    cart: cartItem,
  });
});
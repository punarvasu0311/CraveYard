import express from "express";
import { isAuth, isSeller } from "../middlewares/isAuth.js";
import uploadFile from "../middlewares/multer.js";
import { addRestaurant } from "../controllers/restaurant.js";


const router = express.Router();
router.post("/new", isAuth, isSeller, uploadFile, addRestaurant);


export default router;
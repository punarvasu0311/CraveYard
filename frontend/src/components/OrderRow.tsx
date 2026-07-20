import type { IOrder } from "../types";

const OrderRow = ({
  order,
  onClick,
}: {
  order: IOrder;
  onClick: () => void;
}) => {
  return (
    <div
      className="cursor-pointer rounded-xl bg-white p-4 shadow-sm hover:bg-gray-50"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">Order #{order._id.slice(-6)}</p>
        <span className="text-xs capitalize text-gray-500">{order.status}</span>
      </div>

      <div className="mt-2 text-sm text-gray-600">
        {order.items.map((item, i) => ( //here items array of is IMenuitems because of popule used in backend while creating order
          <span key={i}>
            {item.name} x {item.quauntity}
            {i < order.items.length - 1 && ", "}
          </span>
        ))}
      </div>

      <div className="mt-2 flex justify-between text-sm font-medium">
        <span>Total</span>
        <span>₹{order.totalAmount}</span>
      </div>
    </div>
  );
};

export default OrderRow;
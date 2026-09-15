import CartItem from "./CartItem";
import { useCart } from "../../context/CartContext";
const CartList = () => {
  const { cartItems } = useCart();
  console.log(`cart items:${cartItems}`)

  return (
    <div className="space-y-6 ">
      {cartItems.map((item) => (
        <CartItem
          key={item._id}
          item={item}
        />
      ))}
    </div>
  );
};

export default CartList;
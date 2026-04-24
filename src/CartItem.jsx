import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // ✅ TOTAL CART AMOUNT
  const calculateTotalAmount = () => {
    let total = 0;

    cart.forEach((item) => {
      const price = parseFloat(item.cost.substring(1));
      total += price * item.quantity;
    });

    return total.toFixed(2);
  };

  // ✅ CONTINUE SHOPPING
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // ❌ CHECKOUT (as per task)
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // ➕ INCREMENT (uses updateQuantity)
  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1
    }));
  };

  // ➖ DECREMENT (uses updateQuantity / removeItem)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // ❌ REMOVE ITEM (TASK REQUIREMENT)
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // ➕ ADD ITEM (TASK REQUIREMENT)
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  // 💰 ITEM SUBTOTAL
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1));
    return (price * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">

      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>

            <img
              className="cart-item-image"
              src={item.image}
              alt={item.name}
            />

            <div className="cart-item-details">

              <div className="cart-item-name">
                {item.name}
              </div>

              <div className="cart-item-cost">
                {item.cost}
              </div>

              {/* QUANTITY CONTROLS */}
              <div className="cart-item-quantity">

                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>

                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>

                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>

              </div>

              {/* SUBTOTAL */}
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>

              {/* DELETE */}
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>

              {/* ADD ITEM (TASK REQUIREMENT) */}
              <button
                className="cart-item-add"
                onClick={() => handleAddItem(item)}
              >
                Add
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* ACTION BUTTONS */}
      <div style={{ marginTop: '20px', color: 'black' }}>
      </div>

      <div className="continue_shopping_btn">

        <button
          className="get-started-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>

        <br />

        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>

      </div>

    </div>
  );
};

export default CartItem;
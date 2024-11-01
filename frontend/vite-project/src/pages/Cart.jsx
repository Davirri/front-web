import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para la navegación

const Cart = () => {
  // Estado para almacenar los items del carrito
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Efecto para cargar los items del carrito desde localStorage 
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || []; // Obtenemos los items del carrito
    setCartItems(items); // Establecemos el estado del carrito
  }, []);

  // Función para eliminar un item del carrito
  const removeItem = (id) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity > 1 ? item.quantity - 1 : 0 // Restamos la cantidad en 1 o establece a 0
        };
      }
      return item;
    }).filter(item => item.quantity > 0); // Filtramos los items que sean mayor a 0

    setCartItems(updatedItems); // Actualizamos el estado del carrito
    localStorage.setItem('cart', JSON.stringify(updatedItems)); // Actualizamos el localStorage
  };

  // Calculamos la cantidad total de productos en el carrito
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Calculamos el precio total del carrito
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

  return (
    <div className='cart'>
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        cartItems.map(item => ( // Mapeamos los items del carrito
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} style={{ width: '100px', height: 'auto' }} />
            <p>Precio: ${item.price.toFixed(2)}</p>
            <h3>{item.name}</h3>
            <p>Cantidad: {item.quantity}</p>
            <button onClick={() => removeItem(item.id)}>Eliminar</button>
          </div>
        ))
      )}
      {cartItems.length > 0 && ( // Mostramos el resumen solo si hay items en el carrito
        <div className="cart-summary">
          <h3>Total de productos: {totalQuantity}</h3>
          <h3>Total a pagar: ${totalPrice}</h3>
          <button onClick={() => navigate('/checkout')} className='cart-checkout'>Ir al Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;

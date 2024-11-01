import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [paymentDetails, setPaymentDetails] = useState({ name: '', cardNumber: '', expiration: '', cvv: '' });
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentMessage, setPaymentMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
        setTotalPrice(total);
    }, []);

    const handleInputChange = (e) => {
        setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos de pago:', paymentDetails);

        localStorage.removeItem('cart');

        setPaymentMessage('Pago completado con éxito!');

        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return (
        <div>
            <br />
            <br />
            <div className="checkout">

                <h2>Checkout</h2>
                <h3>Total a pagar: ${totalPrice}</h3>

                {paymentMessage && <p className="payment-message">{paymentMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label></label>
                        <input type="text" name="name" value={paymentDetails.name} placeholder='Nombre en la tarjeta:' onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label></label>
                        <input type="text" name="cardNumber" value={paymentDetails.cardNumber} placeholder='Número de tarjeta:' onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label></label>
                        <input type="text" name="expiration" value={paymentDetails.expiration} placeholder='Fecha de expiración:' onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label></label>
                        <input type="text" name="cvv" value={paymentDetails.cvv} placeholder='CVV:' onChange={handleInputChange} required />
                    </div>
                    <button type="submit">Pagar</button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;

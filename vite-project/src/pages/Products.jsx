import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const Products = () => {
  // Obtenemos los productos,addToCart y el usuario del contexto
  const { products, addToCart, user } = useProducts();
  const navigate = useNavigate();

  return (
    <div className='Product'>
      {/* Mostramos un saludo si hay un usuario atenticado */}
      {user && <h2  className='Principal'>Hola, {user}!</h2>}
      <h2>Productos</h2>
      <div className="product-list">
        {/* Mapeamos sobre la lista de productos y creamos una tarjeta para cada uno */}
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3> 
            <p>{product.description}</p> 
            <p>Precio: ${product.price.toFixed(2)}</p> {/* Ponemos el precio actualizado a dos decimales */}
            <img src={product.image} alt={product.name} className="product-image" /> 
            <button onClick={() => addToCart(product, navigate)}> 
              Añadir al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products; 

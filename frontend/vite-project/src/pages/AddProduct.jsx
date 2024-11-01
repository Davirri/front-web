import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext'; 
import { useNavigate } from 'react-router-dom'; 

const ProductList = () => {
  // Desestructuramos las funciones y variables del contexto
  const { products, message, addProduct, deleteProduct, updateProduct } = useProducts();
  const navigate = useNavigate(); // Hook de navegación

  // Estados para manejar el nuevo producto y la edición de un producto existente
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', image: '' });
  const [editProductId, setEditProductId] = useState(null);
  const [editProduct, setEditProduct] = useState({ name: '', description: '', price: '', image: '' });

  // Función con la que manejamos el envío del formulario para agregar un nuevo producto
  const handleAddProduct = (e) => {
    e.preventDefault(); // Evitamos el comportamiento por defecto del formulario
    addProduct(newProduct); 
    setNewProduct({ name: '', description: '', price: '', image: '' }); // Reiniciamos el estado del nuevo producto
  };

  // Función para editar  un producto
  const handleEdit = (product) => {
    setEditProductId(product.id); // Establecemos el ID del producto a editar
    setEditProduct({ ...product }); // Copiamos los datos del producto a editar en el estado
  };

  // Función para  el envío del formulario de actualización de un producto
  const handleUpdateProduct = (e) => {
    e.preventDefault(); 
    updateProduct(editProductId, editProduct); // Utilizamos la función para actualizar el producto
    setEditProductId(null); 
  };

  return (
    <div className='add-product'>
      <h2>Lista de Videojuegos</h2>
      {message && <p>{message}</p>} 

      
      {/* Lista de productos */}
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-card">
            {editProductId === product.id ? (
              // Si el producto se está editando, mostramos el formulario de edición
              <form onSubmit={handleUpdateProduct} className="add-product-form">
                <input
                  type="text"
                  value={editProduct.name}
                  onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                  placeholder="Nombre del producto"
                  required
                />
                <textarea
                  value={editProduct.description}
                  onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                  placeholder="Descripción del producto"
                  required
                />
                <input
                  type="number"
                  value={editProduct.price}
                  onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                  placeholder="Precio del producto"
                  required
                />
                <input
                  type="text"
                  value={editProduct.image}
                  onChange={(e) => setEditProduct({ ...editProduct, image: e.target.value })}
                  placeholder="URL de la imagen"
                  required
                />
                <button type="submit">Guardar Cambios</button>
                <button type="button" onClick={() => setEditProductId(null)}>Cancelar</button>
              </form>
            ) : (
              // Si el producto no se está editando, muestra los detalles del producto
              <>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Precio: ${product.price}</p>
                <img src={product.image} alt={product.name} className="product-image" />
                <button onClick={() => handleEdit(product)}>Editar</button>
                <button className='product-button' onClick={() => deleteProduct(product.id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
      {/* Formulario para añadir un nuevo producto */}
      <form onSubmit={handleAddProduct} className="add-product-form">
        <h3>Añadir Nuevo </h3>
        <input
          type="text"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          placeholder="Nombre del producto"
          required
        />
        <textarea
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          placeholder="Descripción del producto"
          required
        />
        <input
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          placeholder="Precio del producto"
          required
        />
        <input
          type="text"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          placeholder="URL de la imagen"
          required
        />
        <button type="submit">Añadir Producto</button>
      </form>

    </div>
  );
};

export default ProductList;

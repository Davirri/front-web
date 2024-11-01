import React from 'react';
import { useMerch } from '../context/MerchContext';
import { useUser } from '../context/UserContext';

const Merch = () => {
  const {
    merchItems,
    newMerch,
    setNewMerch,
    editMerchId,
    setEditMerchId,  
    editMerch,
    setEditMerch,
    handleAddMerch,
    handleEditMerch,
    handleUpdateMerch,
    handleDeleteMerch,
  } = useMerch();
  
  const { isAdmin } = useUser();

  return (
    <div className='add-product'>
      <h2>Lista de Merch</h2>

      <ul className='product-list'>
        {merchItems.map((item) => (
          <li key={item.id} className='product-card'>
            {editMerchId === item.id ? (
             <form onSubmit={handleUpdateMerch} className='edit-product-form'>
             <h3>Editar Producto</h3>
             <input
               type="text"
               value={editMerch.name}
               onChange={(e) => setEditMerch({ ...editMerch, name: e.target.value })}
               required
             />
             <textarea
               value={editMerch.description}
               onChange={(e) => setEditMerch({ ...editMerch, description: e.target.value })}
               required
             />
             <input
               type="number"
               value={editMerch.price}
               onChange={(e) => setEditMerch({ ...editMerch, price: parseFloat(e.target.value) || '' })}
               required
             />
             <input
               type="text"
               value={editMerch.image}
               onChange={(e) => setEditMerch({ ...editMerch, image: e.target.value })}
               placeholder="Imagen URL"
             />
             <button type="submit">Actualizar</button>
             <button type="button" onClick={() => { 
               setEditMerchId(null); 
               setEditMerch({ name: '', description: '', price: '', image: '' }); 
             }}>Cancelar</button>
           </form>
           
            ) : (
              <>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Precio: ${item.price}</p>
                {item.image && <img src={item.image} alt={item.name} className='product-image' />}
                {isAdmin && (
                  <>
                    <button onClick={() => handleEditMerch(item)}>Editar</button>
                    <button onClick={() => handleDeleteMerch(item.id)}>Eliminar</button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      
      {isAdmin && (
        <form onSubmit={handleAddMerch} className="add-product-form">
          <input
            type="text"
            placeholder="Nombre"
            value={newMerch.name}
            onChange={(e) => setNewMerch({ ...newMerch, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Descripción"
            value={newMerch.description}
            onChange={(e) => setNewMerch({ ...newMerch, description: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Precio"
            value={newMerch.price}
            onChange={(e) => setNewMerch({ ...newMerch, price: parseFloat(e.target.value) || '' })}
            required
          />
          <input
            type="text"
            placeholder="Imagen URL"
            value={newMerch.image}
            onChange={(e) => setNewMerch({ ...newMerch, image: e.target.value })}
          />
          <button type="submit">Agregar</button>
        </form>
      )}
    </div>
  );
};

export default Merch;

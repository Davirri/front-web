
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

const MerchContext = createContext();

export const MerchProvider = ({ children }) => {
  const { isAdmin } = useUser(); // Obtenemos el estado de administrador del contexto de usuario
  const [merchItems, setMerchItems] = useState([]);
  const [newMerch, setNewMerch] = useState({ name: '', description: '', price: '', image: '' });
  const [editMerchId, setEditMerchId] = useState(null);
  const [editMerch, setEditMerch] = useState({ name: '', description: '', price: '', image: '' });
  const Vite = import.meta.env.VITE_API_BASE_URL;

  // Función para obtener artículos de merch
  const fetchMerchItems = async () => {
    try {
      const response = await axios.get(`${Vite}/merch`);
      setMerchItems(response.data);
    } catch (error) {
      console.error('Error al obtener artículos de merch:', error);
    }
  };

  // Función para añadir un nuevo artículo de merch
  const handleAddMerch = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    try {
      const response = await axios.post(
        `${Vite}/merch/add`,
        newMerch,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMerchItems([...merchItems, response.data]);
      setNewMerch({ name: '', description: '', price: '', image: '' });
    } catch (error) {
      console.error('Error al añadir artículo de merch:', error);
    }
  };

  // Función para iniciar la edición de un artículo
  const handleEditMerch = (item) => {
    setEditMerchId(item.id);
    setEditMerch({ ...item });
  };

  // Función para actualizar un artículo
  const handleUpdateMerch = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
  
    console.log('Updating merch item with ID:', editMerchId);
    
    try {
      const response = await axios.put(
        `${Vite}/merch/${editMerchId}`,
        editMerch,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      
      const updatedItems = merchItems.map((item) => (item.id === editMerchId ? response.data : item));
      setMerchItems(updatedItems);
      setEditMerch({ name: '', description: '', price: '', image: '' });
      setEditMerchId(null);
    } catch (error) {
      console.error('Error al actualizar artículo de merch:', error.response ? error.response.data : error);
    }
  };
  

  // Función para eliminar un artículo de merch
  const handleDeleteMerch = async (id) => {
    if (!isAdmin) return;
    try {
      await axios.delete(`${Vite}/merch/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMerchItems(merchItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error al eliminar artículo de merch:', error);
    }
  };

  // Efecto para cargar los artículos de merch al montar el contexto
  useEffect(() => {
    fetchMerchItems();
  }, []);

  return (
    <MerchContext.Provider
      value={{
        merchItems,
        newMerch,
        setNewMerch,
        editMerchId,
        editMerch,
        setEditMerch,
        setEditMerchId,
        handleAddMerch,
        handleEditMerch,
        handleUpdateMerch,
        handleDeleteMerch,
      }}
    >
      {children}
    </MerchContext.Provider>
  );
};

export const useMerch = () => useContext(MerchContext);

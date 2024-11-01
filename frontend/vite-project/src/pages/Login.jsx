import { useState } from 'react'; // Importa useState para manejar el estado
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación
import { useUser } from '../context/UserContext'; // Importa el contexto de usuario

const Login = () => {
  const [username, setUsername] = useState(''); // Estado para el nombre de usuario
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [error, setError] = useState(''); // Estado para manejar errores
  const navigate = useNavigate(); // 
  const { login } = useUser(); // Obtenemos la función de login del contexto de usuario

  // Función para manejar el envío del formulario
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
    setError(''); 

    try {
      await login(username, password); // Intenta iniciar sesión
      navigate('/Products'); // Mandamos a la página de productos
    } catch (err) {
      setError(err.message); 
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}> {/*Envio del formulario */}
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} // Actualizamos el estado de nombre de usuario
          placeholder="Usuario" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} // Actualizamos el estado de contraseña
          placeholder="Contraseña" 
          required 
        />
        <button type="submit">Iniciar Sesión</button> 
      </form>
      {error && <p>{error}</p>} 
    </div>
  );
};

export default Login; 

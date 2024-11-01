import { useState } from 'react';
import { useUser } from '../context/UserContext'; 

const Register = () => {
  // Iniciamos los estados para el nombre de usuario, contraseña, correo electrónico y términos y condiciones
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false); 
  const [message, setMessage] = useState(''); 
  const { register } = useUser(); // Obtenemos el registro del contexto

  const handleRegister = async (e) => {
    e.preventDefault(); 
    // Verificamos si se han aceptado los términos antes de continuar
    if (!termsAccepted) {
      setMessage('Debes aceptar los términos y condiciones para registrarte.');
      return; 
    }

    try {
      // Llamamos a la función de registro y esperamos el mensaje de éxito
      const successMessage = await register(username, password, email);
      setMessage(successMessage);
  
      // Reiniciamos los campos del formulario
      setUsername('');
      setPassword('');
      setEmail('');
      setTermsAccepted(false);
    } catch (error) {
      setMessage(error.message); 
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <h2>Registro</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Actualizamos el estado del usuario
          placeholder="Usuario"
          required // Ponemos como obligatorio rellenar para mandar el formulario
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Actualizamos el estado del correo electrónico
          placeholder="Correo Electrónico"
          required 
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Actualizamos el estado de la contraseña
          placeholder="Contraseña"
          required 
        />
        <div>
          <label>
            Acepto los <a href="" target="_blank">términos y condiciones</a> 
          </label>
        </div>
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)} // Actualizamos el estado de aceptación de términos
          required 
        />
        <button type="submit">Registrarse</button> 
        {message && <p>{message}</p>} 
      </form>
    </div>
  );
};

export default Register; 

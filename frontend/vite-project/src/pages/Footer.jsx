import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} GamingZone. Todos los derechos reservados.</p>
        <p className="description">
          GamingZone es tu destino para todos los artículos de videojuegos y más. 
          ¡Explora nuestra tienda y encuentra lo mejor en juegos!
        </p>
        <div className="links">
          <a href="/privacy-policy">Política de privacidad</a> | 
          <a href="/terms-of-service"> Términos de servicio</a> | 
          <a href="/contact">Contacto</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

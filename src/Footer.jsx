import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.brand}>
          <h3 style={styles.title}>Gambeta Football</h3>
          <p style={styles.description}>Tu local de ventas deportivas. Calidad y pasión por el fútbol.</p>
        </div>

        <div style={styles.contact}>
          <h4 style={styles.subtitle}>Contacto</h4>
          <p>Email: Gambetafutbol24@gmail.com</p>
          <p>Teléfono: +54 9 299 518-8374</p>
          <p>📍Brown N°19 - Neuquén</p>
        </div>

        <div style={styles.social}>
          <h4 style={styles.subtitle}>Seguinos</h4>
          <a 
            href="https://www.instagram.com/gambetafutbol_/" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={styles.socialLink}
            aria-label="Instagram Gambeta Football"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" height="24" 
              fill="currentColor" 
              viewBox="0 0 24 24"
              style={{marginRight: 8}}
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.427.415a4.92 4.92 0 011.675 1.08 4.918 4.918 0 011.08 1.675c.175.457.36 1.256.414 2.427.058 1.266.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.415 2.427a4.92 4.92 0 01-1.08 1.675 4.918 4.918 0 01-1.675 1.08c-.457.175-1.256.36-2.427.414-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.427-.415a4.92 4.92 0 01-1.675-1.08 4.918 4.918 0 01-1.08-1.675c-.175-.457-.36-1.256-.414-2.427-.058-1.266-.07-1.645-.07-4.85s.012-3.584.07-4.85c.054-1.17.24-1.97.415-2.427a4.92 4.92 0 011.08-1.675 4.918 4.918 0 011.675-1.08c.457-.175 1.256-.36 2.427-.414 1.266-.058 1.645-.07 4.85-.07zm0-2.163C8.741 0 8.332.013 7.052.072 5.766.13 4.67.33 3.677.659a6.864 6.864 0 00-2.492 1.623A6.863 6.863 0 00.659 4.674c-.33.993-.53 2.09-.588 3.376C.013 8.332 0 8.741 0 12s.013 3.668.072 4.948c.058 1.286.258 2.383.588 3.376a6.863 6.863 0 001.623 2.492 6.863 6.863 0 002.492 1.623c.993.33 2.09.53 3.376.588C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.286-.058 2.383-.258 3.376-.588a6.864 6.864 0 002.492-1.623 6.863 6.863 0 001.623-2.492c.33-.993.53-2.09.588-3.376.058-1.28.072-1.689.072-4.948s-.013-3.668-.072-4.948c-.058-1.286-.258-2.383-.588-3.376a6.863 6.863 0 00-1.623-2.492 6.864 6.864 0 00-2.492-1.623c-.993-.33-2.09-.53-3.376-.588C15.668.013 15.259 0 12 0z"/>
              <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998z"/>
              <circle cx="18.406" cy="5.594" r="1.44"/>
            </svg>
            @gambetafutbol_
          </a>
        </div>
      </div>
      <p style={styles.copy}>&copy; {new Date().getFullYear()} Gambeta Football. Todos los derechos reservados.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#121212',
    color: '#f0f0f0',
    padding: '30px 20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '30px',
  },
  brand: {
    flex: '1 1 250px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '8px',
    color: '#e63946', // rojo
  },
  description: {
    fontSize: '16px',
    lineHeight: '1.5',
  },
  contact: {
    flex: '1 1 250px',
    fontSize: '14px',
  },
  subtitle: {
    fontWeight: '600',
    marginBottom: '10px',
    color: '#e63946',
  },
  social: {
    flex: '1 1 150px',
  },
  socialLink: {
    color: '#e63946',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'color 0.3s ease',
  },
  copy: {
    textAlign: 'center',
    marginTop: '30px',
    fontSize: '13px',
    color: '#888',
  }
};

export default Footer;

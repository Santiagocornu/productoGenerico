import React from 'react';

const Footer = () => {
  // URLs de los íconos externos
  const icons = {
    whatsapp: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
    instagram: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
    facebook: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
  };

  // Links reales
  const links = {
    whatsapp: "https://wa.me/5492996096397",
    instagram: "https://www.instagram.com/hofu.sushi.nqn/",
    facebook: "#" // si hay link real de Facebook, reemplazar
  };

  const footerStyle = {
    width: '100%',  // ocupa todo el ancho
    backgroundColor: '#1b1b1b',
    color: '#d4af37',
    padding: '50px 20px',
    textAlign: 'center',
    borderTop: '3px solid #d4af37',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxSizing: 'border-box',
  };

  const contentWrapper = {
    maxWidth: '1200px',  // contenido centrado y limitado
    margin: '0 auto',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#f5d76e',
  };

  const socialIconsStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '25px',
  };

  const iconStyle = {
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const [hoveredIcon, setHoveredIcon] = React.useState(null);

  const getIconHoverStyle = (icon) => ({
    transform: 'scale(1.2)',
    filter: 'brightness(1.2)',
  });

  return (
    <footer style={footerStyle}>
      <div style={contentWrapper}>
        <div style={titleStyle}>HofuSushi 🍣</div>
        <p>¡Disfrutá del mejor sushi fresco y artesanal directamente a tu mesa!</p>

        {/* Redes sociales con links reales */}
        <div style={socialIconsStyle}>
          {Object.keys(icons).map(icon => (
            <a
              key={icon}
              href={links[icon]}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredIcon(icon)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <img
                src={icons[icon]}
                alt={icon}
                style={hoveredIcon === icon ? { ...iconStyle, ...getIconHoverStyle(icon) } : iconStyle}
              />
            </a>
          ))}
        </div>

        <p style={{ marginTop: '20px', fontSize: '16px', color: '#f5d76e' }}>
          📞 +54 9 2996 09-6397
        </p>

        <p style={{ marginTop: '10px', fontSize: '14px', color: '#f5d76e' }}>
          © {new Date().getFullYear()} HofuSushi. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

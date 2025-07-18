import React from 'react';
import Swal from 'sweetalert2';
import { usePedido } from '../pedidoHook/PedidoContext';

const FinishPedido = () => {
  const { pedido, eliminarProducto } = usePedido();
  const numero = '5492995188374'; // Número de WhatsApp destino

  const calcularTotal = () => {
    return pedido.reduce((suma, prod) => suma + (typeof prod.total === 'number' ? prod.total : 0), 0);
  };

  const crearMensaje = () => {
  if (pedido.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'No hay nada añadido',
      text: 'Por favor, selecciona al menos un producto antes de enviar.',
    });
    return;
  }

  const total = calcularTotal();

  let mensaje = "¡Hola! Quiero hacer el siguiente pedido:\n";

pedido.forEach(producto => {
  const precio = typeof producto.precio === 'number' ? producto.precio : 0;
  const total = typeof producto.total === 'number' ? producto.total : 0;
  const cant = producto.cant && producto.cant > 0 ? producto.cant : null;
  const talle = producto.talle && producto.talle.trim() !== '' ? producto.talle : null;

  if (!cant) return; // omitimos si no hay cantidad válida

  const talleText = talle ? `(Talle ${talle})` : '';
  mensaje += `- ${producto.nombre} ${talleText}: ${cant} x $${precio.toFixed(2)} = $${total.toFixed(2)}\n`;
});

mensaje += `\nTotal a pagar: $${calcularTotal().toFixed(2)}`;


  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
};


  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'sans-serif',
      backgroundColor: '#121212', // fondo negro oscuro
      color: '#eee', // texto claro
      borderRadius: '12px',
      boxShadow: '0 0 10px rgba(255, 0, 0, 0.6)', // sombra roja
    },
    titulo: {
      textAlign: 'center',
      marginBottom: '15px',
      color: '#ff4444', // rojo brillante
      fontWeight: 'bold',
      textShadow: '0 0 5px #ff4444',
    },
    empty: {
      textAlign: 'center',
      color: '#aaa',
      fontStyle: 'italic',
    },
    lista: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    item: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#1f1f1f',
      padding: '8px 12px',
      borderRadius: '8px',
      boxShadow: '0 1px 4px rgba(255, 0, 0, 0.3)', // sombra roja suave
      color: '#eee',
    },
    span: {
      flex: 1,
      textAlign: 'center',
    },
    eliminar: {
      backgroundColor: '#d32f2f',
      color: 'white',
      border: 'none',
      padding: '4px 8px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s',
    },
    total: {
      textAlign: 'center',
      fontSize: '1.2em',
      margin: '15px 0',
      fontWeight: 'bold',
      color: '#ff5555',
      textShadow: '0 0 8px #ff5555',
    },
    botonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
    },
    boton: {
      backgroundColor: '#d32f2f', // rojo fuerte
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '1em',
      boxShadow: '0 0 12px #d32f2f',
      transition: 'background-color 0.3s, box-shadow 0.3s',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>Resumen del Pedido</h2>

      {pedido.length === 0 ? (
        <p style={styles.empty}>Seleccione al menos un producto</p>
      ) : (
        <div style={styles.lista}>
          {pedido.map((producto) => (
            <div key={producto.nombre + producto.talle} style={styles.item}>
              <span style={styles.span}>{producto.nombre} (Talle {producto.talle || '?'})</span>
              <span style={styles.span}>x{producto.cant || 0}</span>
              <span style={styles.span}>${(typeof producto.total === 'number' ? producto.total : 0).toFixed(2)}</span>
              <button
                style={styles.eliminar}
                onClick={() => eliminarProducto(producto.nombre, producto.talle)}
                title="Eliminar producto"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}

      <hr style={{ margin: '15px 0', borderColor: '#ff4444' }} />
      <p style={styles.total}>
        <strong>Total a pagar:</strong> ${calcularTotal().toFixed(2)}
      </p>

      <div style={styles.botonContainer}>
        <button
          style={styles.boton}
          onClick={crearMensaje}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#a52727'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#d32f2f'}
        >
          Enviar por WhatsApp
        </button>
      </div>
    </div>
  );
};

export default FinishPedido;

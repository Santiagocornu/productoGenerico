import React from 'react';
import Swal from 'sweetalert2';
import { usePedido } from '../pedidoHook/PedidoContext';

const FinishPedido = () => {
  const { pedido, eliminarProducto } = usePedido();
  const numero = '5492996101047';

  const calcularTotal = () => {
    return pedido.reduce((suma, prod) => suma + prod.total, 0);
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

    let mensaje = "Hola! Quiero hacer este pedido:\n";
    pedido.forEach(producto => {
      mensaje += `- ${producto.nombre}: ${producto.cant} - $${producto.total.toFixed(2)}\n`;
    });
    mensaje += `\nTotal a pagar: $${calcularTotal().toFixed(2)}`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'sans-serif',
    },
    titulo: {
      textAlign: 'center',
      marginBottom: '15px',
    },
    empty: {
      textAlign: 'center',
      color: 'gray',
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
      backgroundColor: '#f7f7f7',
      padding: '8px 12px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    span: {
      flex: 1,
      textAlign: 'center',
    },
    eliminar: {
      backgroundColor: '#ff4d4d',
      color: 'white',
      border: 'none',
      padding: '4px 8px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    eliminarHover: {
      backgroundColor: '#e63939',
    },
    total: {
      textAlign: 'center',
      fontSize: '1.1em',
      margin: '15px 0',
    },
    botonContainer: {
      textAlign: 'center',
    },
    boton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '6px',
      cursor: 'pointer',
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
            <div key={producto.nombre} style={styles.item}>
              <span style={styles.span}>{producto.nombre}</span>
              <span style={styles.span}>{producto.cant}</span>
              <span style={styles.span}>${producto.total.toFixed(2)}</span>
              <button
                style={styles.eliminar}
                onClick={() => eliminarProducto(producto.nombre)}
                title="Eliminar producto"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}

      <hr style={{ margin: '15px 0' }} />
      <p style={styles.total}>
        <strong>Total a pagar:</strong> ${calcularTotal().toFixed(2)} (el precio puede cambiar)
      </p>

      <div style={styles.botonContainer}>
        <button style={styles.boton} onClick={crearMensaje}>
          Enviar por WhatsApp
        </button>
      </div>
    </div>
  );
};

export default FinishPedido;

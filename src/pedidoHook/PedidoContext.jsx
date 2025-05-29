import React, { createContext, useState, useContext } from 'react';
import Swal from 'sweetalert2';

const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
  const [pedido, setPedido] = useState([]);

  const addProduct = (cant, nombre, precio) => {
    if (cant <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Cantidad inválida',
        text: 'La cantidad debe ser mayor a 0.',
      });
      return;
    }

    const total = precio * cant;
    setPedido(prev => {
      const index = prev.findIndex(prod => prod.nombre === nombre);
      if (index !== -1) {
        const updated = [...prev];
        updated[index].total += total;
        updated[index].cant += cant;

        Swal.fire({
          icon: 'info',
          title: 'Producto actualizado',
          text: `Se sumaron ${cant} unidades a ${nombre}.`,
        });

        return updated;
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Producto agregado',
          text: `${nombre} fue añadido al pedido.`,
        });

        return [...prev, { nombre, total, cant }];
      }
    });
  };

  const eliminarProducto = (nombre) => {
    setPedido(prev => prev.filter(prod => prod.nombre !== nombre));
    Swal.fire({
      icon: 'error',
      title: 'Producto eliminado',
      text: `${nombre} fue removido del pedido.`,
    });
  };

  return (
    <PedidoContext.Provider value={{ pedido, addProduct, eliminarProducto }}>
      {children}
    </PedidoContext.Provider>
  );
};

export const usePedido = () => useContext(PedidoContext);

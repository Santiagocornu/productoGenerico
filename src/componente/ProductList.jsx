import React, { useState } from 'react';
import { usePedido } from '../pedidoHook/PedidoContext';
import FinishPedido from './FinishPedido';
import '../estilitos/styleSheet.css';
import '../estilitos/ProductList.css';
import defaultImage from '../assets/Image-not-found.png';

const ProductList = ({ filter, productos }) => {
  const { addProduct } = usePedido();
  const [cantidades, setCantidades] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleCantidadChange = (id, value) => {
    setCantidades(prev => ({ ...prev, [id]: value }));
  };

  const handleAdd = (id, nombre, precio) => {
    const cantidad = Number(cantidades[id]);
    addProduct(cantidad, nombre, precio);
    setCantidades(prev => ({ ...prev, [id]: "" }));
  };

  // Función para validar que sea un link
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Estilo inline para botón fijo
  const finishBtnFixedStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '12px 20px',
    borderRadius: '10px',
    border: '2px solid #d4af37',
    backgroundColor: '#1b1b1b', // negro
    color: '#d4af37', // dorado
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    zIndex: 1001,
  };

  const finishBtnFixedHoverStyle = {
    backgroundColor: '#d41f1f', // rojo
    color: '#fff',
    boxShadow: '0 4px 12px rgba(212, 31, 31, 0.7)',
    transform: 'translateY(-2px)',
  };

  const [hoverFinish, setHoverFinish] = useState(false);

  return (
    <div style={{ position: "relative", paddingBottom: "80px" }}>
      {productos.filter(prod => (filter === "" || prod.categoria === filter)).length === 0 ? (
        <p style={{ textAlign: "center", margin: "20px 0", color: "gray" }}>No hay productos</p>
      ) : (
        productos
          .filter(prod => (filter === "" || prod.categoria === filter))
          .map(prod => (
            <div key={prod.id} className="product-card">
              <div className="product-info">
                <img
                  src={isValidUrl(prod.img) ? prod.img : defaultImage}
                  alt={prod.nombre}
                  className="product-image"
                />
                <div className="product-name">{prod.nombre}</div>
                <p>$ {prod.precio}</p>
              </div>
              {prod.estado ? (
                <div className="product-actions">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={cantidades[prod.id] || ""}
                    className="product-input"
                    placeholder="cantidad"
                    onChange={(e) => handleCantidadChange(prod.id, e.target.value)}
                    style={{ marginLeft: '10px' }}
                  />
                  <button
                    className="button-normal"
                    onClick={() => handleAdd(prod.id, prod.nombre, prod.precio)}
                  >
                    Añadir
                  </button>
                </div>
              ) : (
                <p className="product-unavailable">No hay</p>
              )}
            </div>
          ))
      )}

      {/* Botón fijo terminar pedido */}
      <button
        style={hoverFinish ? { ...finishBtnFixedStyle, ...finishBtnFixedHoverStyle } : finishBtnFixedStyle}
        onMouseEnter={() => setHoverFinish(true)}
        onMouseLeave={() => setHoverFinish(false)}
        onClick={() => setShowModal(true)}
      >
        Terminar pedido
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowModal(false)}>X</button>
            <FinishPedido />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;

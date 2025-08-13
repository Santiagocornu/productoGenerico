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

  return (
    <div>
      {productos.filter(prod => (filter === "" || prod.categoria === filter)).length === 0 ? (
        <p style={{ textAlign: "center", margin: "20px 0", color: "gray" }}>No hay productos</p>
      ) : (
        productos
          .filter(prod => (filter === "" || prod.categoria === filter))
          .map(prod => (
            <div key={prod.id} className="product-card">
              <div className="product-info">
                <img
                  src={prod.img || defaultImage}
                  alt={prod.nombre}
                  className="product-image"
                />
                <div className="product-name">{prod.nombre}</div>
                <p> ${prod.precio}</p>

              </div>
              {prod.estado ? (
                <div className="product-actions">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={cantidades[prod.id] || ""}
                    className="product-input"
                    placeholder="precio"
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

      <button className="finish-btn" onClick={() => setShowModal(true)}>
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

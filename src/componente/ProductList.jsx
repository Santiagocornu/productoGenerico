import React, { useState } from 'react';
import { usePedido } from '../pedidoHook/PedidoContext';
import FinishPedido from './FinishPedido';
import '../estilitos/styleSheet.css';
import '../estilitos/ProductList.css';
import defaultImage from '../assets/Image-not-found.png';

const ProductList = ({ productos }) => {
  const { addProduct } = usePedido();
  const [cantidades, setCantidades] = useState({});
  const [tallesSeleccionados, setTallesSeleccionados] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleCantidadChange = (id, value) => {
    const talle = tallesSeleccionados[id];
    const stockSeleccionado = productos.find(p => p.id === id)?.stock?.find(s => s.talle === talle)?.cantidad || 0;
    let valorNum = Number(value);

    if (value === '') {
      setCantidades(prev => ({ ...prev, [id]: '' }));
      return;
    }

    if (valorNum < 1) valorNum = 1;
    if (valorNum > stockSeleccionado) valorNum = stockSeleccionado;

    setCantidades(prev => ({ ...prev, [id]: valorNum }));
  };

  const handleTalleChange = (id, talle) => {
    setTallesSeleccionados(prev => ({ ...prev, [id]: talle }));
    setCantidades(prev => ({ ...prev, [id]: '' }));
  };

  const handleAdd = (producto) => {
    const cantidad = Number(cantidades[producto.id]);
    const talle = tallesSeleccionados[producto.id];
    if (!talle || cantidad <= 0) return;

    const stockSeleccionado = producto.stock?.find(s => s.talle === talle)?.cantidad || 0;
    if (cantidad > stockSeleccionado) {
      alert(`No hay suficiente stock para el talle ${talle}`);
      return;
    }

    const nombreConTalle = `${producto.nombre} (Talle: ${talle})`;
    addProduct(cantidad, nombreConTalle, producto.precio, talle);
    setCantidades(prev => ({ ...prev, [producto.id]: "" }));
    setTallesSeleccionados(prev => ({ ...prev, [producto.id]: "" }));
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      {productos.length === 0 ? (
        <p style={{ textAlign: "center", margin: "20px 0", color: "gray" }}>No hay productos</p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center'
          }}
        >
          {productos.map(prod => {
            const tallesDisponibles = prod.stock?.filter(s => s.cantidad > 0) || [];
            const stockTotal = prod.stock?.reduce((acc, s) => acc + s.cantidad, 0) || 0;
            const talleSeleccionado = tallesSeleccionados[prod.id];
            const stockTalleSeleccionado = talleSeleccionado
              ? prod.stock.find(s => s.talle === talleSeleccionado)?.cantidad || 0
              : 0;
            const cantidadSeleccionada = Number(cantidades[prod.id]) || 0;
            const sinStock = stockTotal === 0;

            return (
              <div
                key={prod.id}
                className="product-card"
                style={{
                  opacity: sinStock ? 0.5 : 1,
                  pointerEvents: sinStock ? "none" : "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "16px",
                  width: "220px"
                }}
              >
                {/* Imagen */}
                <img
                  src={prod.thumbnail || defaultImage}
                  alt={prod.nombre}
                  className="product-image"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />

                {/* Info */}
                <div className="product-info" style={{ textAlign: "center", padding: "8px", width: "100%" }}>
                  <div className="product-name">{prod.nombre}</div>
                  <p style={{ margin: "6px 0", fontWeight: "bold", color: "#ff5252" }}>
                    ${prod.precio}
                  </p>
                </div>

                {/* Acciones */}
                {sinStock ? (
                  <p className="product-unavailable" style={{ margin: "10px 0", color: "#aaa" }}>
                    No hay stock
                  </p>
                ) : (
                  <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {/* Inputs de talle y cantidad al lado */}
                    <div style={{ display: "flex", gap: "8px", marginBottom: "8px", width: "100%", justifyContent: "center" }}>
                      <select
                        className="input-normal"
                        value={tallesSeleccionados[prod.id] || ""}
                        onChange={(e) => handleTalleChange(prod.id, e.target.value)}
                        style={{ minWidth: "90px" }}
                      >
                        <option value="">Talle</option>
                        {tallesDisponibles.map((s, i) => (
                          <option key={i} value={s.talle}>
                            {s.talle} ({s.cantidad} disp.)
                          </option>
                        ))}
                      </select>

                      <input
                        type="number"
                        min="1"
                        max={stockTalleSeleccionado}
                        placeholder="Cantidad"
                        className="input-normal"
                        value={cantidades[prod.id] || ""}
                        onChange={(e) => handleCantidadChange(prod.id, e.target.value)}
                        disabled={!talleSeleccionado}
                        style={{ width: "80px" }}
                      />
                    </div>

                    <button
                      className="button-normal"
                      onClick={() => handleAdd(prod)}
                      disabled={
                        !cantidadSeleccionada ||
                        !talleSeleccionado ||
                        cantidadSeleccionada > stockTalleSeleccionado
                      }
                      style={{ width: "100%" }}
                    >
                      Añadir
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Botón fijo abajo */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#1e1e1e',
        borderTop: '2px solid #b00020',
        padding: '12px 16px',
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'border-box',
        zIndex: 1000
      }}>
        <button
          className="finish-btn"
          onClick={() => setShowModal(true)}
        >
          Terminar pedido
        </button>
      </div>

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

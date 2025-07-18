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

    if (valorNum < 1) {
      valorNum = 1;
    }
    if (valorNum > stockSeleccionado) {
      valorNum = stockSeleccionado;
    }

    setCantidades(prev => ({ ...prev, [id]: valorNum }));
  };

  const handleTalleChange = (id, talle) => {
    setTallesSeleccionados(prev => ({ ...prev, [id]: talle }));
    setCantidades(prev => ({ ...prev, [id]: '' })); // reset cantidad cuando cambia talle
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
    <div>
      {productos.length === 0 ? (
        <p style={{ textAlign: "center", margin: "20px 0", color: "gray" }}>No hay productos</p>
      ) : (
        productos.map(prod => {
          const tallesDisponibles = prod.stock?.filter(s => s.cantidad > 0) || [];
          const stockTotal = prod.stock?.reduce((acc, s) => acc + s.cantidad, 0) || 0;
          const talleSeleccionado = tallesSeleccionados[prod.id];
          const stockTalleSeleccionado = talleSeleccionado
            ? prod.stock.find(s => s.talle === talleSeleccionado)?.cantidad || 0
            : 0;
          const cantidadSeleccionada = Number(cantidades[prod.id]) || 0;

          const sinStock = stockTotal === 0;

          return (
            <div key={prod.id} className="product-card" style={{ opacity: sinStock ? 0.5 : 1, pointerEvents: sinStock ? 'none' : 'auto' }}>
              <div className="product-info">
                <img
                  src={prod.thumbnail || defaultImage}
                  alt={prod.nombre}
                  className="product-image"
                />
                <div className="product-name" style={{ fontSize: '1rem' }}>{prod.nombre}</div>
                <p style={{ margin: '0 10px', fontSize: '0.9rem' }}>Precio: ${prod.precio}</p>
              </div>

              {sinStock ? (
                <p className="product-unavailable" style={{ marginLeft: '20px' }}>No hay stock</p>
              ) : (
                <div className="product-actions" style={{ flexWrap: 'wrap', gap: '8px' }}>
                  <select
                    className="product-input"
                    value={tallesSeleccionados[prod.id] || ""}
                    onChange={(e) => handleTalleChange(prod.id, e.target.value)}
                    style={{ minWidth: '90px' }}
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
                    className="product-input"
                    value={cantidades[prod.id] || ""}
                    onChange={(e) => handleCantidadChange(prod.id, e.target.value)}
                    disabled={!talleSeleccionado}
                    style={{ width: '80px' }}
                  />

                  <button
                    className="button-normal"
                    onClick={() => handleAdd(prod)}
                    disabled={
                      !cantidadSeleccionada ||
                      !talleSeleccionado ||
                      cantidadSeleccionada > stockTalleSeleccionado
                    }
                    style={{ marginTop: '4px', flexGrow: 1, minWidth: '80px' }}
                  >
                    Añadir
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
        <button
          className="finish-btn"
          onClick={() => setShowModal(true)}
          style={{ minWidth: '140px' }}
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

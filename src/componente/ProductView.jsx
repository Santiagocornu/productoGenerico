import React, { useEffect, useState } from 'react';
import { productosRef } from '../firebase.js';
import { getDocs } from 'firebase/firestore';
import ProductList from './ProductList.jsx';
import '../estilitos/styleSheet.css';

const categorias = [
  "Camisetas de fútbol", "Remeras térmicas (H y M)", "Medias antideslizantes",
  "Medias pantorrilleras", "Canilleras", "Vendajes", "Botines", "Guantes",
  "Botineros", "Mochilas", "Chapas decorativas", "Sticker holograficos",
  "Con tapones (Pasto Natural)", "Sin tapones (Pasto Sintético)", "Futsal (salón)"
];

const ProductView = () => {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [nombre, setNombre] = useState("");
  const [talle, setTalle] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRaw = await getDocs(productosRef);
        const productJson = productRaw.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProductos(productJson);
      } catch (error) {
        alert(error);
      }
    };
    fetchProduct();
  }, []);

  const productosFiltrados = productos.filter(producto => {
    const nombreMatch = producto.nombre.toLowerCase().includes(nombre.toLowerCase());
    const categoriaMatch = categoria === "" || producto.categoria === categoria;
    const talleMatch = talle === "" || producto.stock?.some(item =>
      item.talle.toLowerCase().includes(talle.toLowerCase())
    );
    return nombreMatch && categoriaMatch && talleMatch;
  });

  return (
    <div className="filtro-contenedor" style={{
      width: '100%',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box',
      margin: '0 auto'
    }}>
      <h2 style={{ marginBottom: '16px', textAlign: 'center', fontSize: '1.5rem' }}>
        Filtrar productos
      </h2>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '500px',
          marginBottom: '24px',
          boxSizing: 'border-box'
        }}
      >
        <input
          className="input-normal"
          type="text"
          placeholder="Buscar por nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          className="input-normal"
          type="text"
          placeholder="Buscar por talle (ej: 38, s, m)"
          value={talle}
          onChange={(e) => setTalle(e.target.value)}
        />
        <select
          className="input-normal"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categorias.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div style={{ width: '100%', maxWidth: '1000px' }}>
        <ProductList productos={productosFiltrados} />
      </div>
    </div>
  );
};

export default ProductView;

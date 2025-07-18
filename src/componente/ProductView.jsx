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

  const fetchProduct = async () => {
    try {
      const productRaw = await getDocs(productosRef);
      const productJson = productRaw.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProductos(productJson);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
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
      maxWidth: '1000px',
      margin: '20px auto',
      width: '95%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>

      <h2 style={{ marginBottom: '20px' }}>Filtrar productos</h2>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '800px',
          marginBottom: '30px'
        }}
      >
        <input
          className="input-normal"
          type="text"
          placeholder="Buscar por nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ flex: '1 1 250px' }}
        />
        <input
          className="input-normal"
          type="text"
          placeholder="Buscar por talle (ej: 38, s, m)"
          value={talle}
          onChange={(e) => setTalle(e.target.value)}
          style={{ flex: '1 1 250px' }}
        />
        <select
          className="input-normal"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          style={{ flex: '1 1 250px' }}
        >
          <option value="">Todas las categorías</option>
          {categorias.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <ProductList productos={productosFiltrados} />
    </div>
  );
};

export default ProductView;

import React, { useEffect, useState } from 'react';
import { productosRef, db } from '../firebase.js';
import { getDocs, collection } from 'firebase/firestore';
import ProductList from './ProductList.jsx';
import '../estilitos/styleSheet.css';

const ProductView = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]); 
  const [categoria, setCategoria] = useState("");
  const [nombre, setNombre] = useState("");
  const [talle, setTalle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🛒 productos
        const productRaw = await getDocs(productosRef);
        const productJson = productRaw.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProductos(productJson);

        // 📂 categorías (desde la colección "categoria")
        const categoriaSnap = await getDocs(collection(db, 'categorias'));
        const categoriaList = categoriaSnap.docs.map(doc => ({
          id: doc.id,
          nombre: doc.data().nombre
        }));
        setCategorias(categoriaList);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        alert("Error al cargar productos o categorías");
      }
    };
    fetchData();
  }, []);

  const productosFiltrados = productos.filter(producto => {
    const nombreMatch = producto.nombre.toLowerCase().includes(nombre.toLowerCase());
    const categoriaMatch = categoria === "" || producto.categoria === categoria;
    const talleMatch =
      talle === "" ||
      producto.stock?.some(item =>
        item.talle.toLowerCase().includes(talle.toLowerCase())
      );
    return nombreMatch && categoriaMatch && talleMatch;
  });

  return (
    <div
      className="filtro-contenedor"
      style={{
        width: '100%',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
        margin: '0 auto'
      }}
    >
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
          {categorias.map(cat => (
            <option key={cat.id} value={cat.nombre}>
              {cat.nombre}
            </option>
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

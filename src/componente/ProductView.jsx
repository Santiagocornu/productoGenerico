import React, { useEffect, useState } from 'react';
import { productosRef } from '../firebase.js';
import { getDocs } from 'firebase/firestore';
import ProductList from './ProductList.jsx';
import '../estilitos/styleSheet.css'

const ProductView = () => {
  const [productos, setProductos] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchProduct = async () => {
    try {
      const productRaw = await getDocs(productosRef);
      const productJson = productRaw.docs.map(producto => ({ id: producto.id, ...producto.data() }));
      setProductos(productJson);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div
  style={{
    backgroundSize: 'cover',              // que cubra todo
    backgroundPosition: 'center',         // centrado
    backgroundRepeat: 'no-repeat',        // no se repita
    width: '100%',
    maxWidth: '1200px',
    padding: '10px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    margin: '0 auto',
  }}
>

      <div className="filter-buttons" style={{ overflowX: 'auto', width: '100%' }}>
        {["", "surtido hofu", "surtido salmon", "surtido veggie", "surtido cooked", "tradicional", "hot rolls", "poke bowl", "hot", "otro"].map((filt) => (
          <button
  key={filt || "todo"}
  className={`button-normal ${filter === filt ? "active" : ""}`}
  onClick={() => setFilter(filt)}
  style={{
    backgroundColor: '#fffaf0', // blanco cálido superpuesto
  }}
>
  {filt ? filt.charAt(0).toUpperCase() + filt.slice(1) : "Todo"}
</button>

        ))}
      </div>

      <div style={{ width: '100%' }}>
        <ProductList filter={filter} productos={productos} />
      </div>
    </div>
  );
};

export default ProductView;

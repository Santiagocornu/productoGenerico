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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        paddingBottom:'20px',
        padding: '5px',
        backgroundColor: "#f5f5f5",
        borderRadius: '10px', 
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)', 
        width: 'fit-content',
        height: 'fit-content',
        margin: '10px auto' 

        // pene entregado 🍆
}}

    >
      
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        <button className="button-normal" onClick={() => setFilter("")}>Todo</button>
        <button className="button-normal" onClick={() => setFilter("surtido hofu")}>Surtido hofu</button>
        <button className="button-normal" onClick={() => setFilter("surtido salmon")}>Surtido salmon</button>
        <button className="button-normal" onClick={() => setFilter("surtido veggie")}>Surtido veggie</button>
        <button className="button-normal" onClick={() => setFilter("surtido cooked")}>Surtido cooked</button>
        <button className="button-normal" onClick={() => setFilter("tradicional")}>tradicional</button>
        <button className="button-normal" onClick={() => setFilter("hot rolls")}>Hot rolls</button>
        <button className="button-normal" onClick={() => setFilter("poke bowl")}>Poke bowl</button>
        <button className="button-normal" onClick={() => setFilter("hot")}>Hot</button>
        <button className="button-normal" onClick={() => setFilter("otro")}>otros</button>
      </div>
      <div>
        <ProductList filter={filter} productos={productos} />
      </div>
    </div>
  );
};

export default ProductView;

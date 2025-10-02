import React from "react";
import ProductView from "./componente/ProductView";
import { PedidoProvider } from "./pedidoHook/PedidoContext";
import Footer from "./componente/Footer";

function App() {
  return (
    <PedidoProvider>
      <div
  style={{
    backgroundImage: `url("/fondo.jpg")`,
    minHeight: '100vh',           // ocupa toda la altura de la pantalla
    width: '100%',                // ocupa todo el ancho
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', 
    backgroundColor: '#f5f5f5',  // color de respaldo si la imagen tarda en cargar
    backgroundSize: 'cover',      // ajusta la imagen para cubrir todo el div
    backgroundPosition: 'center', // centra la imagen
    backgroundRepeat: 'no-repeat',// no se repite
  }}
>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <ProductView />
        </div>
        <Footer />
      </div>
    </PedidoProvider>
  );
}

export default App;

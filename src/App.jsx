import ProductView from "./componente/ProductView";
import { PedidoProvider } from "./pedidoHook/PedidoContext";
import Footer from "./Footer";

function App() {
  return (
    <PedidoProvider>
      <div>
        <ProductView />
        <Footer></Footer>
      </div>
    </PedidoProvider>
  );
}

export default App;

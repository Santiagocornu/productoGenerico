import ProductView from "./componente/productView";
import { PedidoProvider } from "./pedidoHook/PedidoContext";

function App() {
  return (
    <PedidoProvider>
      <div>
        <ProductView />
      </div>
    </PedidoProvider>
  );
}

export default App;

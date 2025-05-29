import ProductView from "./componente/ProductView";
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

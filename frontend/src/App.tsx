import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";

function App() {
  return (
    <MainLayout>

      <Dashboard />

      <Sales />

      <Inventory />

    </MainLayout>
  );
}

export default App;
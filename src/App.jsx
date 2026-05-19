import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fontsource/cormorant-garamond";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Katalog from "./pages/Products";
import Contact from "./pages/Contact";
import Detail from "./pages/Detailproducts";
import Result from "./pages/Resultcode";
import Addproducts from "./pages/Addproducts";
import AdminAccess from "./pages/AdminAccess";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Katalog />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/products/:id" element={<Detail />} />
        <Route path="/resultcode" element={<Result />} />
        <Route
          path="/Addproducts"
          element={
            <ProtectedRoute>
              <Addproducts />
            </ProtectedRoute>
          }
        />
        <Route path="/admin-sp" element={<AdminAccess />} />
        <Route
          path="/settings-sp"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

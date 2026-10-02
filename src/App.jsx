import { Routes, Route } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import RequireAdmin from "./components/layout/RequireAdmin";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/products/Products";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";
import ProductDetailsPage from "./pages/products/ProductDetails";
import Categories from "./pages/categories/Categories";
import AddCategory from "./pages/categories/AddCategory";
import EditCategory from "./pages/categories/EditCategory";
import Brands from "./pages/brands/Brands";
import AddBrand from "./pages/brands/AddBrand";
import EditBrand from "./pages/brands/EditBrand";
import Collections from "./pages/collections/Collections";
import AddCollection from "./pages/collections/AddCollection";
import EditCollection from "./pages/collections/EditCollection";
import Orders from "./pages/orders/Orders";
import OrderDetailsPage from "./pages/orders/OrderDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<RequireAdmin />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />

          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<AddProduct />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />

          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/new" element={<AddCollection />} />
          <Route path="/collections/:id/edit" element={<EditCollection />} />

          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/new" element={<AddCategory />} />
          <Route path="/categories/:id/edit" element={<EditCategory />} />

          <Route path="/brands" element={<Brands />} />
          <Route path="/brands/new" element={<AddBrand />} />
          <Route path="/brands/:id/edit" element={<EditBrand />} />

          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetailsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

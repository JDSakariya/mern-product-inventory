import { Box } from "@mui/material";
import "./App.scss";
import CategoryManager from "./Comps/CategoryManager";
import AddProductForm from "./Comps/ProductForm";
import ProductList from "./Comps/ProductList";

function App() {
  return (
    <Box className="main-container ">
      <CategoryManager />
      <AddProductForm />
      <ProductList />
    </Box>
  );
}

export default App;

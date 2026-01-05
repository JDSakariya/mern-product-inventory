import "./App.css";
import CategoryManager from "./Comps/CategoryManager";
import AddProductForm from "./Comps/ProductForm";
import ProductList from "./Comps/ProductList";

function App() {
  return (
    <>
      <CategoryManager />
      <AddProductForm />
      <ProductList />
    </>
  );
}

export default App;

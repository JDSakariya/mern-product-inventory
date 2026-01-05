import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import { GET_PRODUCTS } from "../graphql/queries";
import { DELETE_PRODUCT } from "../graphql/mutations";
import { useMutation, useQuery } from "@apollo/client/react";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  createdAt: string;
  categories: Category[];
}

const ProductList = () => {
  const { data, loading, error, refetch } = useQuery<
    { products: Product[] },
    { page: number; limit: number }
  >(GET_PRODUCTS, {
    variables: { page: 1, limit: 5 },
  });

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => refetch(),
  });

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products</p>;

  const products: Product[] = data?.products ?? [];

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h5" mb={2}>
        Product Inventory
      </Typography>

      {products.length === 0 && <p>No products found</p>}

      <Stack spacing={2}>
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography color="text.secondary">
                {product.description}
              </Typography>

              <Typography mt={1}>Quantity: {product.quantity}</Typography>

              <Box mt={1} sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {product.categories.map((cat) => (
                  <Chip key={cat.id} label={cat.name} />
                ))}
              </Box>

              <Button
                color="error"
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => deleteProduct({ variables: { id: product.id } })}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default ProductList;

import { useQuery, useMutation } from "@apollo/client/react";
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Chip,
  Pagination,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { GET_PRODUCTS } from "../graphql/queries";
import { DELETE_PRODUCT } from "../graphql/mutations";

const LIMIT = 3;

interface Product {
  id: string;
  name: string;
  quantity: number;
  createdAt: string;
  categories: Array<{ id: string; name: string }>;
}

interface GetProductsData {
  products: Product[];
}

const ProductList = () => {
  const [page, setPage] = useState(1);

  const { data, loading, refetch } = useQuery<GetProductsData>(GET_PRODUCTS, {
    variables: { page, limit: LIMIT },
  });

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => refetch(),
  });

  if (loading) return <p>Loading products...</p>;

  return (
    <Box className="sub-div-container">
      <Typography variant="h5" mb={2}>
        Product Listing
      </Typography>

      {data?.products?.map((product: any) => (
        <Paper key={product.id} sx={{ p: 2, mb: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box width={"70%"}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2">
                Quantity: {product.quantity}
              </Typography>
              <Typography variant="caption">
                Added on: {product.createdAt}
              </Typography>

              <Stack
                direction="row"
                gap={1}
                flexWrap={"wrap"}
                spacing={1}
                mt={1}
              >
                {product.categories.map((cat: any) => (
                  <Chip key={cat.id} label={cat.name} size="small" />
                ))}
              </Stack>
            </Box>

            <IconButton
              color="error"
              onClick={() => deleteProduct({ variables: { id: product.id } })}
              sx={{ width: "8px" }}
            >
              X
            </IconButton>
          </Stack>
        </Paper>
      ))}

      {/* Pagination */}
      <Stack alignItems="center" mt={3}>
        <Pagination
          count={page + 1}
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      </Stack>
    </Box>
  );
};

export default ProductList;

import { useQuery, useMutation } from "@apollo/client/react";
import { useState } from "react";
import { Box, Typography, TextField, Button, Stack, Chip } from "@mui/material";

import { GET_CATEGORIES } from "../graphql/queries";
import { ADD_CATEGORY, DELETE_CATEGORY } from "../graphql/mutations";
interface IProps {}
interface Category {
  id: string;
  name: string;
}

const CategoryManager = (_props: IProps) => {
  const [name, setName] = useState("");

  const { data, loading, refetch } = useQuery<{ categories: Category[] }>(
    GET_CATEGORIES
  );

  const [addCategory] = useMutation(ADD_CATEGORY, {
    onCompleted: () => {
      setName("");
      refetch();
    },
  });

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    onCompleted: () => refetch(),
  });

  const handleAdd = () => {
    if (!name.trim()) return;
    addCategory({ variables: { name } });
  };

  if (loading) return <p>Loading categories...</p>;

  return (
    <Box className="sub-div-container">
      <Typography variant="h5" mb={2}>
        Category Manager
      </Typography>

      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          label="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </Stack>

      <Stack direction="row" spacing={1} flexWrap="wrap" gap={2}>
        {data?.categories?.map((cat: Category) => (
          <Chip
            key={cat.id}
            label={cat.name}
            onDelete={() => deleteCategory({ variables: { id: cat.id } })}
            sx={{ mb: 1 }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default CategoryManager;

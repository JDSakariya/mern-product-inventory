import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  Box,
  Typography,
} from "@mui/material";
import { GET_CATEGORIES } from "../graphql/queries";
import { ADD_PRODUCT } from "../graphql/mutations";
import { useMutation, useQuery } from "@apollo/client/react";

interface Category {
  id: string;
  name: string;
}

const AddProductForm: React.FC = () => {
  const { data } = useQuery<{ categories: Category[] }>(GET_CATEGORIES);
  const categories: Category[] = data?.categories || [];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [addProduct, { loading, error }] = useMutation(ADD_PRODUCT, {
    onCompleted: () => {
      setName("");
      setDescription("");
      setQuantity(0);
      setSelectedCategories([]);
      alert("Product added successfully!");
    },
    refetchQueries: ["GetProducts"],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(new Date().toISOString());
    addProduct({
      variables: {
        input: {
          name,
          description,
          quantity,
          categoryIds: selectedCategories,
          createdAt: new Date().toISOString(),
        },
      },
    });
  };

  return (
    <Box
      className="sub-div-container"
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" mb={2}>
        Product Form
      </Typography>

      <TextField
        label="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={3}
      />
      <TextField
        type="number"
        label="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
      />

      <FormControl>
        <InputLabel>Categories</InputLabel>
        <Select
          multiple
          value={selectedCategories}
          onChange={(e) => setSelectedCategories(e.target.value as string[])}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {(selected as string[]).map((id) => {
                const cat = categories.find((c) => c.id === id);
                return <Chip key={id} label={cat?.name} />;
              })}
            </Box>
          )}
        >
          {categories.map((cat) => (
            <MenuItem
              key={cat.id}
              value={cat.id}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Product"}
      </Button>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </Box>
  );
};

export default AddProductForm;

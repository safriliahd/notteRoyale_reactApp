import React, { useState, useEffect } from "react";
import { Box, TextField, MenuItem, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { primary, light } from "../../theme/color";
import StarIcon from "@mui/icons-material/Star";
import { addProduct } from "../../store/endpoint/product/add-product/view"; // Pastikan path benar

const Container = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  height: "90vh",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    height: "auto",
    overflow: "auto",
  },
}));

const Column = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: light[100],
  border: `1px solid ${theme.palette.divider}`,
  height: "100%",
  overflow: "hidden",
}));

const validCategories = ["Food", "Drink", "Dessert"];
const validSubcategories = {
  Food: [
    "Indonesian Food",
    "Korean Food",
    "Italian Food",
    "Japanese Food",
    "Chinese Food",
    "American Food",
  ],
  Drink: ["Cold", "Hot"],
  Dessert: ["Cold", "Hot"],
};

export default function DataProductCRUD() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Food",
    subcategory: "Indonesian Food",
    description: "",
    image: null,
  });

  const [subcategories, setSubcategories] = useState(validSubcategories.food);

  useEffect(() => {
    setSubcategories(validSubcategories[formData.category]);
  }, [formData.category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "price" && isNaN(value)) {
      alert("MUST BE NUMBER");
      return;
    }
    if (name === "category") {
      setFormData((prevData) => ({
        ...prevData,
        category: value,
        subcategory: validSubcategories[value][0],
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found in localStorage");
      return;
    }

    const productData = new FormData();
    productData.append("name", formData.name);
    productData.append("price", formData.price);
    productData.append("category.main", formData.category);
    productData.append("category.sub", formData.subcategory);
    productData.append("description", formData.description);

    if (formData.image) {
      productData.append("image", formData.image);
    }

    try {
      const result = await addProduct(productData);
      alert("Product created successfully");
      console.log("Result:", result);
    } catch (error) {
      alert(error.message || "Error creating product");
    }
  };

  return (
    <Container>
      <Column>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "90vh",
            padding: 2,
            "& .MuiTextField-root": {
              m: 1,
              width: "100%",
            },
            position: "relative",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="outlined-required"
            label="Nama"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            sx={{
              marginBottom: 3,
              "& .MuiInputLabel-root": {
                color: primary[100],
                fontWeight: "bold",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: primary[100],
                },
                "&:hover fieldset": {
                  borderColor: primary[100],
                },
                "&.Mui-focused fieldset": {
                  borderColor: primary[100],
                },
                "& input": {
                  color: "black",
                },
              },
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            fullWidth
            sx={{
              marginBottom: 3,
              "& .MuiInputLabel-root": {
                color: primary[100],
                fontWeight: "bold",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: primary[100],
                },
                "&:hover fieldset": {
                  borderColor: primary[100],
                },
                "&.Mui-focused fieldset": {
                  borderColor: primary[100],
                },
                "& input": {
                  color: "black",
                },
              },
            }}
          />
          <TextField
            id="outlined-select-category"
            select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            fullWidth
            sx={{
              marginBottom: 3,
              "& .MuiInputLabel-root": {
                color: primary[100],
                fontWeight: "bold",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: primary[100],
                },
                "&:hover fieldset": {
                  borderColor: primary[100],
                },
                "&.Mui-focused fieldset": {
                  borderColor: primary[100],
                },
                "& input": {
                  color: "black",
                },
              },
            }}
          >
            {validCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="subcategory"
            name="subcategory"
            value={formData.subcategory}
            fullWidth
            sx={{
              marginBottom: 3,
              "& .MuiInputLabel-root": {
                color: primary[100],
                fontWeight: "bold",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: primary[100],
                },
                "&:hover fieldset": {
                  borderColor: primary[100],
                },
                "&.Mui-focused fieldset": {
                  borderColor: primary[100],
                },
                "& input": {
                  color: "black",
                },
              },
            }}
          >
            {subcategories.map((sub) => (
              <MenuItem key={sub} value={sub}>
                {sub}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            disabled
            id="outlined-disabled"
            label="Rating"
            sx={{
              marginBottom: 3,
              "& .MuiInputLabel-root": {
                color: primary[100],
                fontWeight: "bold",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: primary[100],
                },
                "&:hover fieldset": {
                  borderColor: primary[100],
                },
                "&.Mui-focused fieldset": {
                  borderColor: primary[100],
                },
                "& input": {
                  color: "black",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    ml: 1,
                  }}
                >
                  <StarIcon sx={{ color: primary[100] }} />
                </Box>
              ),
            }}
          />
        </Box>
      </Column>
      <Box sx={{ display: "flex", justifyContent: "flex-end", paddingTop: 2 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: primary[100],
            boxShadow: "none",
            borderRadius: "20px",
            "&:hover": {
              backgroundColor: primary[200],
            },
            fontWeight: "bold",
            color: "white",
            fontSize: "16px",
            padding: "10px 20px",
          }}
        >
          Save
        </Button>
      </Box>
    </Container>
  );
}

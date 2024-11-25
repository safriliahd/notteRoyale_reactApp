import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { primary, dark } from "../../../theme/color";
import StarIcon from "@mui/icons-material/Star";

const validCategories = ["food", "drink", "dessert"]; // Kategori yang valid (sesuai backend)

const validSubcategories = {
  food: [
    "Indonesian Food",
    "Korean Food",
    "Italian Food",
    "Japanese Food",
    "Chinese Food",
    "American Food",
  ],
  drink: ["Cold", "Hot"],
  dessert: ["Cold", "Hot"],
};

export default function RightDataCRUD({}) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "food", // default category is food
    subcategory: "Indonesian Food", // default subcategory for food
    description: "",
  });

  const [subcategories, setSubcategories] = useState(validSubcategories.food); // Subkategori default untuk kategori 'food'

  useEffect(() => {
    // Update subkategori berdasarkan kategori yang dipilih
    setSubcategories(validSubcategories[formData.category]);
  }, [formData.category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price' && isNaN(value)) {
      alert('MUST BE NUMBER');
      return;
    }
    if (name === 'category') {
      setFormData((prevData) => ({ 
        ...prevData, 
        category: value,
        subcategory: validSubcategories[value][0], // Defaultkan subkategori berdasarkan kategori yang dipilih
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  

  return (
    <Box
      component='form'
      sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "90vh", // Batasi tinggi maksimum menjadi 100vh
        padding: 2,
        "& .MuiTextField-root": {
          m: 1,
          width: "100%",
        },
        position: "relative", // Untuk positioning tombol di dalam Box
      }}
      noValidate
      autoComplete='off'
    >
      <TextField
        required
        id='outlined-required'
        label='Nama'
        name='name'
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
              borderColor: primary[100], // Warna border default
            },
            "&:hover fieldset": {
              borderColor: primary[100], // Warna border saat hover
            },
            "&.Mui-focused fieldset": {
              borderColor: primary[100], // Warna border saat fokus
            },
            "& input": {
              color: "black", // Warna teks input
            },
          },
        }}
      />
      <TextField
        required
        id='outlined-required'
        label='Price'
        name='price'
        value={formData.price}
        onChange={handleInputChange}
        defaultValue='Hello World'
        fullWidth
        sx={{
          marginBottom: 3,
          "& .MuiInputLabel-root": {
            color: primary[100],
            fontWeight: "bold",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: primary[100], // Warna border default
            },
            "&:hover fieldset": {
              borderColor: primary[100], // Warna border saat hover
            },
            "&.Mui-focused fieldset": {
              borderColor: primary[100], // Warna border saat fokus
            },
            "& input": {
              color: "black", // Warna teks input
            },
          },
        }}
      />
      <TextField
        id='outlined-select-category'
        select
        label='Category'
        name='category'
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
        id='outlined-select-currency'
        select
        label='subcategory'
        name='subcategory'
        value={formData.subcategory}
        defaultValue='EUR'
        fullWidth
        sx={{
          marginBottom: 3,
          "& .MuiInputLabel-root": {
            color: primary[100],
            fontWeight: "bold",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: primary[100], // Warna border default
            },
            "&:hover fieldset": {
              borderColor: primary[100], // Warna border saat hover
            },
            "&.Mui-focused fieldset": {
              borderColor: primary[100], // Warna border saat fokus
            },
            "& input": {
              color: "black", // Warna teks input
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
        id='outlined-disabled'
        label='Rating'
        defaultValue=''
        sx={{
          marginBottom: 3,
          "& .MuiInputLabel-root": {
            color: primary[100],
            fontWeight: "bold",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: primary[100], // Warna border default
            },
            "&:hover fieldset": {
              borderColor: primary[100], // Warna border saat hover
            },
            "&.Mui-focused fieldset": {
              borderColor: primary[100], // Warna border saat fokus
            },
            "& input": {
              color: "black", // Warna teks input
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ml: 1, // Spasi antara input dan ikon
              }}
            >
              <StarIcon sx={{ color: primary[100] }} />
            </Box>
          ),
        }}
      />

      <Box sx={{ flexGrow: 1 }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "flex-end", // Tempatkan tombol di bagian bawah
        }}
      ></Box>
    </Box>
  );
}

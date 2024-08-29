import { Button } from "@mui/material";
import { primary } from "../../../theme/color";

export default function BasicButtonPrimary () {
  return (
    <Button
      variant="contained"
      type="button" // You can set the type as "button" or other values as needed
      sx={{
        backgroundColor: primary[100],
        boxShadow: "none",
        borderRadius: '10px',
        "&:hover": {
          boxShadow: "none",
        },
        marginBottom: 5
      }}
    >
      
    </Button>
  );
}
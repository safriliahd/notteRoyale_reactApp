import { Box, Card, CardMedia, CardContent, Grid, Paper, Typography } from "@mui/material";
import ImageNotte from "../../../../../../public/background.jpg";

// Sample data array for cards
const menuData = [
  { id: 1, name: "Menu 1", price: "Rp 50,000", rating: "4.5", image: ImageNotte },
  { id: 2, name: "Menu 2", price: "Rp 75,000", rating: "4.2", image: ImageNotte },
  { id: 3, name: "Menu 3", price: "Rp 100,000", rating: "4.8", image: ImageNotte },
  { id: 4, name: "Menu 4", price: "Rp 60,000", rating: "4.3", image: ImageNotte },
  { id: 5, name: "Menu 5", price: "Rp 40,000", rating: "4.1", image: ImageNotte },
  { id: 6, name: "Menu 6", price: "Rp 30,000", rating: "4.7", image: ImageNotte },
];

export default function ListProductDashboard() {
  return (
    <Box sx={{ marginTop: 5, padding: 0 }}>
      <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ paddingLeft: 0, borderRadius: 10,marginBottom: 5 }}>
        {menuData.map((menu) => (
          <Grid key={menu.id} item xs={4} sm={8} md={4} sx={{ mb: { xs: 5, sm: 0 } }}>
            <Paper
              elevation={0}
              sx={{
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
              }}
            >
              <Card sx={{ flex: 1, borderRadius: 5 }}>
                <CardMedia
                  component="img"
                  image={menu.image}
                  alt={menu.name}
                  sx={{ height: 300 }}
                />
                <CardContent sx={{ textAlign: 'center', paddingBottom: 0 }}>
                  <Typography
                    gutterBottom
                    component="div"
                    sx={{
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                  >
                    {menu.name}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: 18 }}>
                    {menu.price}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                    {menu.rating}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

import { Box, Grid, Paper, Typography } from "@mui/material";
import { dark, light } from "../../../theme/color";
import RightSideProduct from "./right-side/view";
import LeftSideProduct from "./left-side/view";
import LeftSideProductDetail from "./left-side/view";

export default function PageUserProduct () {
    return (
        <>
            <Box sx={{ marginTop: 3, padding: 0 }}>
                <Grid
                    container
                    spacing={3}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    sx={{ paddingLeft: 0 }}
                >
                    <Grid
                        item
                        xs={4}
                        sm={8}
                        md={8}
                        sx={{mb: {xs: 5, sm: 0}}}

                    >
                       
                        <Paper
                            sx={{
                                backgroundColor: light[100],
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'stretch',
                                paddingTop: 0,
                                borderRadius: 5,
                                // justifyContent: 'center', 
                            }}>                           
                                <LeftSideProductDetail />
                        </Paper>
                        <Box>
                            
                        </Box>

                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sm={8}
                        md={4}
                        sx={{
                            mb: {xs: 2, sm: 0},
                            // display: 'flex',
                            // flexDirection: 'column',
                            // height: '100%',
                        }}
                    >
                        <Paper
                            sx={{
                                backgroundColor: light[100],
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                // justifyContent: 'center',
                                paddingTop: 0,  
                                borderRadius: 5, 
                            }}>
                                <RightSideProduct />
                        </Paper>

                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
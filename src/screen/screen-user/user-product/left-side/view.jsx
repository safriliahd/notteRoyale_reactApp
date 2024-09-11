import { Box, Card, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { dark, light } from "../../../../theme/color";
import ImageNotte from "../../../../../public/background.jpg"


export default function LeftSideProduct() {
    return (
        <>
            <Box sx={{ marginTop: 5, padding: 0 }}>
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
                        md={6}
                        sx={{ mb: { xs: 5, sm: 0 } }}

                    >
                        <Paper
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'stretch',
                                paddingTop: 0,
                                boxShadow: 'none',
                            }}>
                            <Box sx={{
                                paddingInlineStart: 2,
                                paddingInlineEnd: 2,
                            }}>
                                <h1>test left box</h1>
                                <Card sx={{ flex: 1, width: '100%' }}>
                                    <CardMedia
                                        component="img"
                                        image={ImageNotte}
                                        alt="Placeholder Image"
                                        sx={{ height: 400 }}
                                    />
                                </Card>
                            </Box>

                        </Paper>

                    </Grid>

                    <Grid
                        item
                        xs={4}
                        sm={8}
                        md={6}
                        sx={{ mb: { xs: 2, sm: 0 } }}
                    >
                        <Paper
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                paddingTop: 0,
                                boxShadow: 'none',
                            }}>
                            <Box sx={{
                                paddingInlineStart: 2,
                                paddingInlineEnd: 2,
                            }}>
                                 <h1>test right box</h1>
                                <Card sx={{ flex: 1, width: '100%' }}>
                                    <CardMedia
                                        component="img"
                                        image={ImageNotte}
                                        alt="Placeholder Image"
                                        sx={{ height: 400 }}
                                    />
                                </Card>
                               
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
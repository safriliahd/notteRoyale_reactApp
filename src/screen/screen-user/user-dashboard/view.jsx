import { Box, Grid, Paper, Typography, MenuItem, Select } from "@mui/material";
import { dark, light } from "../../../theme/color";
import LeftSideDahboard from "./left-side/view";
import RightSideDashboard from "./right-side/view";
import { useState } from "react";

export default function PageDashboardUser () {

    return (
        <>
            <Box sx={{ marginTop: 3, padding: 0 }}>

                {/* Main Content */}
                <Grid
                    container
                    spacing={3}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    sx={{ paddingLeft: 0, marginTop: 2 }}
                >
                    <Grid
                        item
                        xs={4}
                        sm={8}
                        md={8}
                        sx={{ mb: { xs: 5, sm: 0, paddingTop: 0 }, overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }} // Scrollable
                    >
                        <Paper
                            sx={{
                                backgroundColor: 'transparent',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'stretch',
                                paddingTop: 0,
                                borderRadius: 5,
                                boxShadow: 'none',
                            }}
                        >
                            <LeftSideDahboard />
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sm={8}
                        md={4}
                        sx={{
                            mb: { xs: 2, sm: 0, paddingTop: 0 },
                        }}
                    >
                        <Paper
                            sx={{
                                backgroundColor: light[100],
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                paddingTop: 0,
                                borderRadius: 5,
                            }}
                        >
                            <RightSideDashboard />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

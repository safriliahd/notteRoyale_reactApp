import { Box, Grid, Paper, Typography } from "@mui/material";
import DailySalesCharts from "./data-statistic/dailySales-charts/view";
import ListDashboardAdmin from "./list-dashboard/view";
import { dark, light } from "../../theme/color";
import IncomeChartsData from "./data-statistic/income-charts/view";

export default function DashboardAdmin() {
    return (
        <Box sx={{marginTop: 3}}>
            <ListDashboardAdmin />
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
                        sm={6}
                        md={8}
                        sx={{mb: {xs: 5, sm: 0}}}

                    >
                        <Paper
                            sx={{
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                                paddingBottom: 0,
                                elevation: 0, 
                                borderTopLeftRadius: 15,
                                borderTopRightRadius: 15,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: 32,
                                    paddingLeft: 2,
                                    paddingTop: 1
                                }}
                            >
                                Daily Sales
                            </Typography>
                        </Paper>
                        <Paper
                            sx={{
                                backgroundColor: light[100],
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'stretch',
                                paddingTop: 0,
                                justifyContent: 'center',
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                                elevation: 0, 
                                borderBottomLeftRadius: 15,
                                borderBottomRightRadius: 15, 
                            }}>                           
                                <DailySalesCharts />
                        </Paper>
                        <Box>
                            
                        </Box>

                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sm={6}
                        md={4}
                        sx={{mb: {xs: 2, sm: 0}}}
                    >
                        <Paper
                            sx={{
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                                paddingBottom: 0,
                                elevation: 0, 
                                borderTopLeftRadius: 15,
                                borderTopRightRadius: 15,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: 32,
                                    paddingLeft: 2,
                                    paddingTop: 1,
                                }}
                            >
                                Income
                            </Typography>
                        </Paper>
                        <Paper
                            sx={{
                                backgroundColor: light[100],
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                paddingTop: 0,  
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                                elevation: 0,
                                borderBottomLeftRadius: 15,
                                borderBottomRightRadius: 15, 
                            }}>
                                <IncomeChartsData />
                        </Paper>

                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

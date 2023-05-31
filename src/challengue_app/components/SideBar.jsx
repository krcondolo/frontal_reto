import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material';
import { useAuthStore } from '../../hooks/useAuthStore';
import { Link } from 'react-router-dom';

export const SideBar = ({ drawerWidth = 240 }) => {
    const { user } = useAuthStore();
    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent' // temporary
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        {user.name}
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        ['Usuarios', 'Registro de usuarios'].map(text => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <Grid container>
                                        <>
                                            <Link to={`/${text}`}>
                                                <ListItemText primary={text} />
                                            </Link>
                                        </>
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>

            </Drawer>

        </Box>
    )
}
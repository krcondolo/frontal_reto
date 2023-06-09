import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material';
import { useAuthStore } from '../../hooks/useAuthStore';
import { Link } from 'react-router-dom';

export const SideBar = ({ drawerWidth = 240 }) => {
    const { user } = useAuthStore();
    const tipo_usuario = user.user_type;

    const getMenuItems = () => {
        if (tipo_usuario === 'super') {
            // Menú para el tipo de usuario "super"
            return ['Usuarios', 'Registro de usuarios', 'Cuentas', 'Registro de cuentas', 'Movimientos', 'Logs',];
        } else if (tipo_usuario === 'admin') {
            // Menú para el tipo de usuario "admin"
            return ['Usuarios', 'Registro de usuarios', 'Cuentas', 'Registro de cuentas', 'Movimientos', 'Logs',];
        } else {
            // Menú para el tipo de usuario "normal"
            return ['Perfil'];
        }
    };
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
                        getMenuItems().map(text => (
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
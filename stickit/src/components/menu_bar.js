import React, { useContext, useState } from 'react';
import {Link, useLocation} from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider,
    AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { AppContext } from './user_context';
import {Menu, ExitToApp} from '@material-ui/icons';

function MenuBar() {
    const location = useLocation();
    const { logout } = useContext(AppContext);
    const [drawerState, setDrawerState] = useState({
        open: false,
    });

    //Get location of current page / route

    function logoutButtonClick() {
        logout();
    }

    function getPageName(routeName) {
        if (!routeName || routeName === '/') return '';
        return routeName.charAt(1).toUpperCase() + routeName.slice(2);
    }

    // Array of drawer content
    const drawerContent = [
        {
            pageName: 'Dashboard',
            pageRoute: '/dashboard'
        },
        {
            pageName: 'Test',
            pageRoute: '/test'
        }
    ]

    // Toggles open drawer
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerState({ ...drawerState, 'open': open });
    };

    // Generates all the drawer contents
    const drawerComponents = () => (
        <div
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            <List>
                {drawerContent.map((page) => (
                    <ListItem button key={page.pageName} component={Link} to={page.pageRoute}>
                        <ListItemText primary={page.pageName} />
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                <ListItem button key={'logout'} onClick={logoutButtonClick}>
                    <ListItemText primary={"Logout"}/>
                    <ListItemIcon>
                        <ExitToApp/>
                    </ListItemIcon>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment>
                <AppBar>
                    <Toolbar>
                        <IconButton edge="start" onClick={toggleDrawer(true)}>
                            <Menu id="menubar-navicon"/>
                        </IconButton>
                        <Typography id="menubar-title" variant="h6">
                            {getPageName(location.pathname)}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer anchor={'left'} open={drawerState['open']} onClose={toggleDrawer(false)}>
                    {drawerComponents()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}

export default MenuBar;
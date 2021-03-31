import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
} from '@material-ui/core';
import { UserContext } from '../context/user_context';
import { Menu, ExitToApp } from '@material-ui/icons';

function MenuBar(props) {
    const location = useLocation();
    const { logout } = useContext(UserContext);
    const { pagesInfo } = props;
    const [drawerState, setDrawerState] = useState({
        open: false,
    });

    const currentPageInfo = pagesInfo.find(
        (obj) => obj.pageRoute === location.pathname
    );

    function logoutButtonClick() {
        logout();
    }

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setDrawerState({ ...drawerState, open: open });
    };

    // All the drawer contents
    const drawerComponents = () => (
        <div role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {pagesInfo.map((page) => (
                    <ListItem
                        button
                        key={page.pageName}
                        component={Link}
                        to={page.pageRoute}
                    >
                        <ListItemText primary={page.pageName} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem button key={'logout'} onClick={logoutButtonClick}>
                    <ListItemText primary={'Logout'} />
                    <ListItemIcon>
                        <ExitToApp />
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
                            <Menu id="menubar-navicon" />
                        </IconButton>
                        {currentPageInfo ? (
                            <Typography id="menubar-title" variant="h6">
                                {currentPageInfo.pageName}
                            </Typography>
                        ) : null}
                    </Toolbar>
                </AppBar>
                <Drawer
                    anchor={'left'}
                    open={drawerState['open']}
                    onClose={toggleDrawer(false)}
                >
                    {drawerComponents()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}

export default MenuBar;

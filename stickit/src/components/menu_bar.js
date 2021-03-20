import React, { useContext, useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { Button, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core';
import { AppContext } from './user_context';
import {Menu, ExitToApp} from '@material-ui/icons';

function MenuBar(props) {
    const { withPage } = props;
    const { logout, userID } = useContext(AppContext);
    const [drawerState, setDrawerState] = useState({
        open: false,
    });

    // Attempting to navigate to a page without being logged in
    if (userID === null) {
        return <Redirect to="/" />;
    }

    function logoutButtonClick() {
        logout();
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

    //Track title of current page / view
    //Provide navigation to other pages
    //Provide logout option

    return (
        <div>
            <React.Fragment>
                <Button onClick={toggleDrawer(true)}>
                    <Menu />
                </Button>
                <Drawer anchor={'left'} open={drawerState['open']} onClose={toggleDrawer(false)}>
                    {drawerComponents()}
                </Drawer>
                {withPage}
            </React.Fragment>
        </div>
    );
}

export default MenuBar;
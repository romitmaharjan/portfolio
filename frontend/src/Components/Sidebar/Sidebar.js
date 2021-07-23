import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { AppBar, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem, 
    ListItemIcon, ListItemText, ListSubheader, Toolbar, Typography, makeStyles, 
    useTheme, MenuItem, Menu, Collapse, Link  } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { logout } from '../../Services/auth'

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',        
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShirnk: 0,                        
        },        
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: '100%',            
            zIndex: theme.zIndex.drawer + 3
        },        
    },
    title: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,        
    },
    stayAway: {
        width: drawerWidth,   
        top: '64px !important', 
        height: 'calc(100% - 64px)'
    },
    list: {
        width: '100%',
        position: 'relative',
        overFlow: 'hidden',
        textAlign: 'left'
    }, 
    nested: {
        paddingLeft: theme.spacing(4)
    },
    ul:{
        padding: 0
    },
    doubleNested:{
        paddingLeft: theme.spacing(7),
        textDecoration: 'none'
    }
}))

function getItems() {    
    var json ={
        list: [
            {
                id: 1, 
                title: 'General',
                items: [
                    {
                        id: 1,
                        subTitle: 'Dashboard'
                    },
                    {
                        id: 2,
                        subTitle: 'Coming Soon 1'
                    },
                    {
                        id: 3,
                        subTitle: 'Coming Soon 2'
                    },
                    {
                        id: 4,
                        subTitle: 'Coming Soon 3'
                    }
                ]
            }, 
            {
                id: 2, 
                title: 'Management',
                items: [
                    {
                        id: 1,
                        subTitle: 'Trade',
                        nests:true                    
                    },
                    {
                        id: 2,
                        subTitle: 'Deposit',
                        nests:true
                    },
                    {
                        id: 3,
                        subTitle: 'Dividend',
                        nests:true
                    }
                ]
            },
            {
                id: 3, 
                title: 'Coming Soon',
                items: [
                    {
                        id: 1,
                        subTitle: 'Coming Soon 1'
                    },
                    {
                        id: 2,
                        subTitle: 'Coming Soon 2'
                    },
                    {
                        id: 3,
                        subTitle: 'Coming Soon 3'
                    }
                ]
            }
        ]        
    }
    return json;
}

function getNest(){
    var nesting = {
        managementNest: [
            {
                id: 1,
                nestItem: 'Add',
            }, 
            {
                id: 2,
                nestItem: 'View',
            }
        ]
    }

    return nesting;
}

const Sidebar = (props) => {
    const history = useHistory()
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const [expand, setExpand] = useState({})

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => setAnchorEl(null)

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen)
    
    const handleLogout = () => {
        logout()
        history.push('/login')        
    }

    const handleExpansion = (text) => {
        setExpand({[text]: !expand[text]})        
    }

    const items = getItems();
    const nests = getNest();

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List className={classes.list} subheader={<li />}>
                <li>
                    <ul className={classes.ul}>
                        {items.list.map((list) => (
                            <>
                             <ListSubheader disableSticky>{list.title}</ListSubheader>
                             {list.items.map((item) => (
                                item.nests != null ? (
                                 <>
                                <ListItem button className={classes.nested} onClick={() => handleExpansion(item.subTitle)}>
                                    <ListItemText primary={item.subTitle} />
                                    {expand[item.subTitle] ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse
                                    component="li"
                                    in={expand[item.subTitle]}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <List>
                                        {nests.managementNest.map((nested) => (
                                            <Link href={(nested.nestItem+item.subTitle).toLowerCase()} color="inherit"><ListItem button className={classes.doubleNested}>
                                                <ListItemText primary={nested.nestItem} />
                                            </ListItem></Link>
                                        ))}
                                    </List>
                                </Collapse>
                                </>

                             ) : (
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={item.subTitle} />
                                </ListItem>
                             )  ))  
                            }                    
                            </>                            
                        ))}
                    </ul>
                </li>                
            </List>
        </div>
    )

    const container = window !==undefined ? () => window().document.body : undefined    

    return(
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title} noWrap>
                        myportfolio
                    </Typography>   
                    <div>
                        <IconButton 
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />    
                        </IconButton>    
                        <Menu 
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical:'top',
                                horizontal: 'right'
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem>Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>                 
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer}>
                <Hidden smUp implementation='css'>
                    <Drawer 
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{paper: classes.drawerPaper}}
                        ModalProps={{keepMounted: true}}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{paper: classes.stayAway}}                        
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    )
}

export default Sidebar
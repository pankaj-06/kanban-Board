import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../Redux/Store';
import { Button } from '@mui/material';
import { userLoggedOut } from '../../Redux/Actions/AuthActions';

interface IPages {
    path: string;
    label: string;
}


export default function ResponsiveAppBar() {
    const { email } = useSelector((state: RootState) => state.authenticationReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pages, setPage] = React.useState<IPages[]>([]);
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    React.useEffect(() => {
        if (userLoggedIn==="true") {
            const newPageArr: IPages[] = [
                { label: "Dashboard", path: "/dashboard" },
                { label: "TaskManagement", path: "/task-management" },
                { label: "Logout", path: "/" }
            ];
            setPage(newPageArr);
        } else {
            const initialPages: IPages[] = [
                { label: "SignIn", path: "/signIn", },
                { label: "SignUp", path: "/register" }
            ];
            setPage(initialPages);
            navigate('/landing-page');
        }
    }, [userLoggedIn]);


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const buttonOnClickHandler = (path: string) => {
        if (path === '/') {
            dispatch(userLoggedOut());
            localStorage.setItem("userLoggedIn", "false");
        }
        navigate(path);
    }


    const handleProfileMenuOpen = (path: string) => (event: React.MouseEvent<HTMLElement>) => {
        buttonOnClickHandler(path)
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {pages.map((page: IPages, idx: number) => (
                <MenuItem key={idx} onClick={handleProfileMenuOpen(page.path)}>
                    <p>{page.label}</p>
                </MenuItem>

            ))}
        </Menu>
    );


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Neo Kanban
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page: IPages, idx: number) => (
                            <Button
                                key={idx}
                                onClick={() => { buttonOnClickHandler(page.path) }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.label}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </Box>
    );
}

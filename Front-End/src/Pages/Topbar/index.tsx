import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
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


export default function TopBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pages, setPage] = React.useState<IPages[]>([]);
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    
    React.useEffect(() => {
        if (userLoggedIn === "true") {
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
        handleMobileMenuClose();
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

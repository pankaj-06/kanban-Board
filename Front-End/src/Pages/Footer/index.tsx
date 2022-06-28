import { Link, Typography } from '@mui/material';
import './footer.css';



const Footer = () => {
    return (
        <footer className='footer-container'>
            <Typography variant="body2" align="center" color="inherit"  >
                {'Copyright © '}
                <Link color="inherit" href="#">
                    KanbanBoards
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </footer>
    )
};

export default Footer;
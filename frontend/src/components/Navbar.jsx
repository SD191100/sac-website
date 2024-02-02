import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
    const navigate = useNavigate();
    const handleNavigation = (path) => (event) => {
        event.preventDefault();
        navigate(path);
    };
    return (
        // <Box sx={{ flexGrow: 1, mb: '100px',  }} >
        <>
            <AppBar style={{ botder: 'solid 1px grey' }} position="fixed" >
                <div style={{ display: 'flex', justifyContent: 'space-around', placeItems: 'center', height: '70px', color: '#656c73', background: 'white', }} >
                    <div style={{display: 'flex', placeItems: 'center'}} >
                        <img style={{ height: '40px', width: '40px', marginRight: '20px ' }} src="../../public/images/logo.png" alt="" />
                        <Typography> <strong>Students` Association of Computer</strong> </Typography>
                    </div>
                    <div>
                        <Button sx={{ mr: '10px' }} color="inherit" onClick={handleNavigation("/")}>Home</Button>
                        <Button sx={{ mr: '10px', ml: '10px' }} color="inherit" onClick={handleNavigation('/team')} >Team</Button>
                        <Button sx={{ mr: '10px', ml: '10px' }} color="inherit" onClick={handleNavigation('/events')} >Events</Button>
                        <Button sx={{ mr: '10px', ml: '10px' }} color="inherit" onClick={handleNavigation('/gallery')} >Gallery</Button>
                        <Button sx={{ mr: '10px', ml: '10px' }} color="inherit" onClick={handleNavigation('/newsletter')} >Newsletter</Button>
                        {/* <Button sx={{mr: '10px', ml: '10px'}} color="inherit" onClick={handleNavigation('/contact')} >Contact</Button> */}
                        <Button sx={{ mr: '10px' }} color="inherit" onClick={handleNavigation('/login')} >Login</Button>
                    </div>
                </div>
            </AppBar>
            <Toolbar />
            <Toolbar />
        </>
        // </Box>
    );
}
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
    return (
        // <Box sx={{ flexGrow: 1, mb: '100px',  }} >
        <>
            <AppBar style={{ botder: 'solid 1px grey' }} position="fixed" >
            <div style={{ display: 'flex', justifyContent: 'space-around', placeItems: 'center', height: '70px', color: '#656c73', background: 'white', }} >
                <div>
                    <Typography> <strong>Students` Association of Computer</strong> </Typography>
                </div>
                <div>
                    <Button sx={{mr: '10px'}} color="inherit" href="/">Home</Button>
                    <Button sx={{mr: '10px', ml: '10px'}} color="inherit" href="/team">Team</Button>
                    <Button sx={{mr: '10px', ml: '10px'}} color="inherit" href="/events">Events</Button>
                    <Button sx={{mr: '10px', ml: '10px'}} color="inherit" href="/gallery">Gallery</Button>
                    <Button sx={{mr: '10px', ml: '10px'}} color="inherit" href="/newsletter">Newsletter</Button>
                    <Button sx={{mr: '10px', ml: '10px'}} color="inherit" href="/contact">Contact</Button>
                    <Button sx={{mr: '10px'}} color="inherit" href="/login">Login</Button>
                </div>
            </div>
        </AppBar>
        <Toolbar />
        <Toolbar />
        </>
        // </Box>
    );
}
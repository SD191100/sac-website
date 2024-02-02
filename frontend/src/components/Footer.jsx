import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';


const socialMediaLinks = {
    facebook: 'https://www.facebook.com/yourPage',
    twitter: 'https://www.twitter.com/yourProfile',
    instagram: 'https://www.instagram.com/yourProfile',
};

export default function StickyFooter() {
    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                color: 'text.secondary',
                py: 3,
                borderTop: '1px solid',
                borderColor: 'divider',
                bottom: 0,
                left: 0,
                right: 0,
            }}
        >
            <Container maxWidth={false}>
                <Grid container spacing={2} justifyContent="space-between">
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Students Association of Computer
                        </Typography>
                        {/* Add your logo component or image here */}
                    </Grid>
                    <Grid item xs={6} sm={3} md={2}>
                        <Typography variant="subtitle1" color="text.primary" gutterBottom>
                            Quick Links
                        </Typography>
                        <Link href="/" color="inherit" display="block">Home</Link>
                        <Link href="/team" color="inherit" display="block">Team</Link>
                        <Link href="/events" color="inherit" display="block">Events</Link>
                        <Link href="/gallery" color="inherit" display="block">Gallery</Link>
                        <Link href="/newsletter" color="inherit" display="block">Newsletter</Link>
                        {/* <Link href="/contact" color="inherit" display="block">Contact</Link> */}
                    </Grid>

                    <Grid item xs={6} sm={3} md={2}>
                        <Typography variant="subtitle1" color="text.primary" gutterBottom>
                            SOCIAL MEDIA
                        </Typography>
                        <IconButton aria-label="Instagram" color="inherit" component="a" href={socialMediaLinks.instagram}>
                            <InstagramIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 4 }}>
                    © 2024 SAC. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
}
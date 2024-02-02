/* eslint-disable react/prop-types */
// import  axios  from "axios";
import { useState } from "react";
import Add from "./Add";
import { useNavigate } from "react-router-dom";
import Show from "./Show";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';




const Admin = () => {
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [showShowEvent, setShowShowEvent] = useState(false);

    const [showAddMember, setShowAddMember] = useState(false);
    const [showShowMember, setShowShowMember] = useState(false);

    const [showAddImage, setShowAddImage] = useState(false);
    const [showShowGallery, setShowShowGallery] = useState(false);

    const [showAddLetter, setShowAddLetter] = useState(false);
    const [showShowLetters, setShowShowLetters] = useState(false);

    const [showAddAdmin, setShowAddAdmin] = useState(false);

    let Navigate = useNavigate();

    const handleLogout = () => {
        // Implement logout logic here
        localStorage.removeItem('token');
        Navigate('/login')
        console.log('Logout clicked');
    };

    return (
        <>
            <div style={{ margin: '0 auto', width: '80%', PaddingTop: '200px',  }} >
                <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: '20px' }} >
                    <Typography style={{color: 'GrayText'}} variant="h4"> <strong>Admin Dashboard</strong> </Typography>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>

                <div style={{ display: "flex", justifyContent: 'space-evenly', marginTop: '50px' }} >
                    <Card style={{ marginRight: '20px', padding: '10px' }} >
                        <h3>Events</h3>
                        {showAddEvent && <Add section="events" onClose={() => setShowAddEvent(false)} />}
                        <div style={{display: "flex"}} >

                        <Button style={{marginRight: '5px'}} size="small" variant="outlined" onClick={() => setShowAddEvent(true)}>Add Event</Button>
                        <Button size="small" variant="outlined" onClick={() => setShowShowEvent(true)}>Show Events</Button>
                        </div>
                    </Card>

                    <Card style={{ marginRight: '20px', padding: '10px' }} >
                        <h3>Members</h3>
                        {showAddMember && <Add section="member" onClose={() => setShowAddMember(false)} />}

                        <div style={{display: "flex"}} >

                        <Button style={{marginRight: '5px'}} size="small" variant="outlined" onClick={() => setShowAddMember(true)}>Add Member</Button>
                        <Button size="small" variant="outlined" onClick={() => setShowShowMember(true)}>Show Members</Button>
                        </div>
                    </Card>

                    <Card style={{ marginRight: '20px', padding: '10px' }} >
                        <h3>Gallery</h3>
                        {showAddImage && <Add section="gallery" onClose={() => setShowAddImage(false)} />}

                        <div style={{display: "flex"}} >

                        <Button style={{marginRight: '5px'}} size="small" variant="outlined" onClick={() => setShowAddImage(true)}>Add Image</Button>
                        <Button size="small" variant="outlined" onClick={() => setShowShowGallery(true)}>Show Gallery</Button>
                        </div>
                    </Card>

                    <Card style={{ marginRight: '20px', padding: '10px' }} >
                        <h3>News Letters</h3>
                        {showAddLetter && <Add section="newsletters" onClose={() => setShowAddLetter(false)} />}

                        <div style={{display: "flex"}} >

                        <Button style={{marginRight: '5px'}} size="small" variant="outlined" onClick={() => setShowAddLetter(true)}>Add News Letter</Button>
                        <Button size="small" variant="outlined" onClick={() => setShowShowLetters(true)}>Show Letters</Button>
                        </div>
                    </Card>

                    <Card style={{ marginRight: '20px', padding: '10px' }} >
                        <h3>Register New Admin</h3>
                        {showAddAdmin && <Add section="signup" onClose={() => setShowAddAdmin(false)} />}
                        <div style={{display: "flex"}} >

                        <Button size="small" variant="outlined" onClick={() => setShowAddAdmin(true)}>Add Admin</Button>
                        </div>
                    </Card>
                </div>
                <div style={{border: 'solid 1px grey', width: '100%', marginBottom: '100px', marginTop: '100px', minHeight: '200px', borderRadius: '17px', display: "flex", justifyContent: "center", padding: '20px'}} >
                    {showShowEvent && <Show section="events" onClose={() => setShowShowEvent(false)} />}
                    {showShowMember && <Show section="member" onClose={() => setShowShowMember(false)} />}
                    {showShowGallery && <Show section="gallery" onClose={() => setShowShowGallery(false)} />}
                    {showShowLetters && <Show section="newsletters" onClose={() => setShowShowLetters(false)} />}
                </div>
            </div>
        </>
    );
}



export default Admin;
// Enjoy Coding
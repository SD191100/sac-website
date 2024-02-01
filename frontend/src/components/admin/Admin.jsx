/* eslint-disable react/prop-types */
// import  axios  from "axios";
import { useState } from "react";
import Add from "./Add";
import {useNavigate} from "react-router-dom";
import Show from "./Show";


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
            <div style={{ display: "flex", justifyContent: "space-between" }} >
                <h1>Admin Dashboard</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div>
                <h3>Events</h3>
                {showAddEvent && <Add section="events" onClose={() => setShowAddEvent(false)} />}
                
                <button onClick={() => setShowAddEvent(true)}>Add Event</button>
                <button onClick={() => setShowShowEvent(true)}>Show Events</button>
            </div>

            <div>
                <h3>Members</h3>
                {showAddMember && <Add section="member" onClose={() => setShowAddMember(false)} />}
                
                <button onClick={() => setShowAddMember(true)}>Add Member</button>
                <button onClick={() => setShowShowMember(true)}>Show Members</button>
            </div>

            <div>
                <h3>Gallery</h3>
                {showAddImage && <Add section="gallery" onClose={() => setShowAddImage(false)} />}
                
                <button onClick={() => setShowAddImage(true)}>Add Image</button>
                <button onClick={() => setShowShowGallery(true)}>Show Gallery</button>
            </div>

            <div>
                <h3>News Letters</h3>
                {showAddLetter && <Add section="newsletters" onClose={() => setShowAddLetter(false)} />}
                
                <button onClick={() => setShowAddLetter(true)}>Add News Letter</button>
                <button onClick={() => setShowShowLetters(true)}>Show Letters</button>
            </div>

            <div>
                <h3>Register New Admin</h3>
                {showAddAdmin && <Add section="signup" onClose={() => setShowAddAdmin(false)} />}
                <button onClick={() => setShowAddAdmin(true)}>Add Admin</button>
            </div>
            {showShowEvent && <Show section="events" onClose={() => setShowShowEvent(false)} />}
            {showShowMember && <Show section="member" onClose={() => setShowShowMember(false)} />}
            {showShowGallery && <Show section="gallery" onClose={() => setShowShowGallery(false)} />}
            {showShowLetters && <Show section="newsletters" onClose={() => setShowShowLetters(false)} />}
        </>
    );
}



export default Admin;
// Enjoy Coding
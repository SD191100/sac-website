/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";


const Add = ({ section, onClose }) => {
    // Define initial form data based on the section
    const initialFormData = {
        events: { eventName: '', eventPosterLink: '' },
        member: { memberName: '', memberImageLink: '', memberPost: '', memberContact: '', memberTeam: '' },
        gallery: { photoLink: '', description: '' },
        newsletters: { letterLink: '', description: '', year: '' },
        signup: { username: '', password: '' },
        // Add more sections as needed
    };

    const [formData, setFormData] = useState(initialFormData[section]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement your logic for handling form submission based on the action
        console.log(`Add ${section}:`, formData);
        const submitData = async () => {
            try {
                const res = await axios.post(`http://localhost:3000/admin/${section}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                alert(res.data.message);
            }
            catch (error) {
                alert(error.response.data.message);
            }
        };
        submitData();

        // Reset form data
        setFormData(initialFormData[section]);

        // Close the form
        onClose();
    };

    // Define fields based on the section
    const renderFields = () => {
        if (!formData) return null;
        switch (section) {
            case 'events':
                return (
                    <>
                        <label>
                            <TextField
                                size="small"
                                style={{ marginBottom: '10px' }}
                                label="Name" variant="outlined"
                                type="text"
                                name="eventName"
                                value={formData.eventName}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            <TextField
                                size="small"
                                style={{ marginBottom: '10px' }}
                                label="Photo" variant="outlined"
                                type="text"
                                name="eventPosterLink"
                                value={formData.eventPosterLink}
                                onChange={handleChange}
                            />
                        </label>
                    </>
                );
            case 'gallery':
                return (
                    <>
                        <label>
                            <TextField
                                size="small"
                                style={{ marginBottom: '10px' }}
                                label="Link" variant="outlined"
                                type="text"
                                name="photoLink"
                                value={formData.photoLink}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            <TextField
                                size="small"
                                style={{ marginBottom: '10px' }}
                                label="Description" variant="outlined"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </label>
                    </>
                );
            case 'member':
                return (
                    <>
                        <label>
                            <TextField
                                size="small"
                                style={{ marginBottom: '10px' }}
                                label="Name" variant="outlined"
                                type="text"
                                name="memberName"
                                value={formData.memberName}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            <TextField
                                size="small"
                                style={{ marginBottom: '10px' }}
                                label="Post" variant="outlined"
                                type="text"
                                name="memberPost"
                                value={formData.memberPost}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            <TextField
                                size="small"
                                style={{ marginBottom: '10px' }}
                                label="Image" variant="outlined"
                                type="text"
                                name="memberImageLink"
                                value={formData.memberImageLink}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            <TextField
                                size="small"
                                style={{ marginBottom: '10px' }}
                                label="Contact" variant="outlined"
                                type="text"
                                name="memberContact"
                                value={formData.memberContact}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            <TextField
                                size="small"
                                style={{ marginBottom: '10px' }}
                                label="Team" variant="outlined"
                                type="text"
                                name="memberTeam"
                                value={formData.memberTeam}
                                onChange={handleChange}
                            />
                        </label>
                    </>
                );
            case 'newsletters':
                return (
                    <>
                        <label>
                            <TextField
                                size="small"
                                style={{ marginBottom: '10px' }}
                                label="Link" variant="outlined"
                                type="text"
                                name="letterLink"
                                value={formData.letterLink}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            <TextField
                                size="small"
                                style={{ marginBottom: '10px' }}
                                label="Description" variant="outlined"
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            <TextField
                                size="small"
                                style={{ marginBottom: '10px' }}
                                label="Year" variant="outlined"
                                type="text"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                            />
                        </label>
                    </>
                );
            case 'signup':
                return (
                    <>
                        <label>
                            <TextField
                                size="small"
                                style={{ marginBottom: '10px' }}
                                label="Username" variant="outlined"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            <TextField
                                size="small"
                                style={{ marginBottom: '10px' }}
                                label="Password" variant="outlined"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </label>
                    </>
                );
            // Add more cases for additional sections
            default:
                return null;
        }
    };

    return (
        <Card style={{ padding: '10px', marginBottom: '10px' }} >
            <Typography variant="h5" >Add {section}</Typography>
            <form onSubmit={handleSubmit}>
                {renderFields()}
                <br />
                <Button type="submit">Submit</Button>
                <Button onClick={onClose}>Close</Button>
            </form>
        </Card>
    );
};

export default Add;
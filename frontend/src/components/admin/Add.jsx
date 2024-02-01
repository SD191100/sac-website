/* eslint-disable react/prop-types */
import  axios  from "axios";
import { useState } from "react";


const Add = ({ section, onClose }) => {
    // Define initial form data based on the section
    const initialFormData = {
        events: { eventName: '', eventPosterLink: '' },
        member: { memberName: '', memberImageLink: '', memberPost: '', memberContact: '', memberTeam: ''  },
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
                            Title:
                            <input
                                type="text"
                                name="eventName"
                                value={formData.eventName}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Poster:
                            <input
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
                            Image:
                            <input
                                type="text"
                                name="photoLink"
                                value={formData.photoLink}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Description:
                            <textarea
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
                            Name:
                            <input
                                type="text"
                                name="memberName"
                                value={formData.memberName}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Post:
                            <input
                                type="text"
                                name="memberPost"
                                value={formData.memberPost}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Image:
                            <input
                                type="text"
                                name="memberImageLink"
                                value={formData.memberImageLink}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Post:
                            <input
                                type="text"
                                name="memberContact"
                                value={formData.memberContact}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Post:
                            <input
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
                            Link:
                            <input
                                type="text"
                                name="letterLink"
                                value={formData.letterLink}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Description:
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Year:
                            <input
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
                            Username:
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input
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
        <div>
            <h2>Add {section}</h2>
            <form onSubmit={handleSubmit}>
                {renderFields()}
                <br />
                <button type="submit">Submit</button>
            </form>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default Add;
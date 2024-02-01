/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Show = ({ section, onClose }) => {

    const [fetchData, setFetchData] = useState('');

    let navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/admin/${section}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (section === 'events') {
                    setFetchData(res.data.events);
                }
                else if (section === 'gallery') {
                    setFetchData(res.data.photos);
                }
                else if (section === 'member') {
                    setFetchData(res.data.members);
                }
                else if (section === 'newsletters') {
                    setFetchData(res.data.newsLetters);
                }
                else {
                    alert('Invalid section');
                    onClose();
                }


                console.log(res.data);
            }
            catch (error) {
                alert(error.response.data.message);
            }
        }
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (e) => {

        const id = e.target.id;
        console.log(id);
        try {
            const res = await axios.delete(`http://localhost:3000/admin/${section}/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert(res.data.message);
            onClose();
        }
        catch (error) {
            alert(error.response.data.message);
        }
    }

    const handleEdit = async (e) => {
        const id = e.target.id;
        console.log(id);
        navigate(`/edit/${section}/${id}`);
    }


    const renderFields = () => {
        if (!fetchData) return null;
        switch (section) {
            case 'events':
                return (
                    <>
                        {fetchData.map((event) => {
                            return (
                                <div>
                                    <img src={event.eventPosterLink} />
                                    <h3>{event.eventName}</h3>
                                    <button id={event._id} onClick={handleDelete} >Delete</button>
                                </div>
                            )
                        })}
                    </>
                );
            case 'gallery':
                return (
                    <>
                        {fetchData.map((photo) => {
                            return (
                                <div>
                                    <img src={photo.photoLink} />
                                    <h3>{photo.description}</h3>
                                    <button id={photo._id} onClick={handleDelete} >delete</button>
                                </div>
                            )
                        })}
                    </>
                );
            case 'member':
                return (
                    <>
                        {fetchData.map((member) => {
                            return (
                                <div>
                                    <img src={member.memberImageLink} />
                                    <h3>{member.memberName}</h3>
                                    <h4>{member.memberPost}</h4>
                                    <button id={member._id} onClick={handleEdit} >Edit</button>
                                    <button id={member._id} onClick={handleDelete} >Delete</button>
                                </div>
                            )
                        })}
                    </>
                );
            case 'newsletters':
                return (
                    <>
                        {fetchData.map((letter) => {
                            return (
                                <div>
                                    <a href={letter.letterLink}>{letter.description}</a>
                                    <h3>{letter.year}</h3>
                                    <button id={letter._id} onClick={handleDelete} >Delete</button>
                                </div>
                            )
                        })}
                    </>
                );
            // Add more cases for additional sections
            default:
                return null;
        }
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-around" }} >
                <h2>Add {section}</h2>
                <button onClick={onClose}>Close</button>
            </div>
            <div>
                {renderFields()}
            </div>
        </div>
    );
}

export default Show;
// Enjoy Coding
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';



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
                                <Card sx={{ m: '30px', maxWidth: '300px', width: '100%', }}>
                                    <CardActionArea>
                                        <div style={{ display: "flex", justifyContent: "center" }} >
                                            <img style={{ height: '300px', width: '300px', margin: '10px' }} src={event.eventPosterLink} alt="" />
                                        </div>
                                        <CardContent>
                                            <Typography textAlign={"center"} gutterBottom variant="caption" component="div">
                                                {event.eventName}
                                            </Typography>
                                            <Button id={event._id} onClick={handleEdit} size={'small'}>Delete</Button>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )
                        })}
                    </>
                );
            case 'gallery':
                return (
                    <>
                        {fetchData.map((photo) => {
                            return (
                                <ImageListItem key={photo._id}>
                                    <img
                                        srcSet={`${photo.photoLink}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        src={`${photo.photoLink}?w=164&h=164&fit=crop&auto=format`}
                                        alt={photo.description}
                                        loading="lazy"
                                    />
                                    <Button id={photo._id} onClick={handleDelete} size={'small'}>Delete</Button>
                                </ImageListItem>
                            )
                        })}
                    </>
                );
            case 'member':
                return (
                    <>
                        {fetchData.map((member) => {
                            return (
                                <Card variant={'elevation'} elevation={9} sx={{ m: '30px', maxWidth: '300px', width: '100%', }}>
                                    <CardActionArea>
                                        <div style={{ display: "flex", justifyContent: "center" }} >
                                            <img style={{ height: '200px', width: '200px', border: 'solid 1px lightgray', borderRadius: '50%', margin: '10px' }} src={member.memberImageLink} alt="" />
                                        </div>
                                        <CardContent>
                                            <Typography textAlign={"center"} gutterBottom variant="h5" component="div">
                                                {member.memberName}
                                            </Typography>
                                            <Typography textAlign={'center'} variant="body2" color="text.secondary">
                                                {member.memberPost}
                                            </Typography>
                                            <div style={{ display: "flex", justifyContent: "center" }} >
                                                <Button id={member._id} onClick={handleEdit} size={'small'}>Edit</Button>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "center" }} >
                                                <Button id={member._id} onClick={handleDelete} size={'small'}>Delete</Button>
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )
                        })}
                    </>
                );
            case 'newsletters':
                return (
                    <>
                        {fetchData.map((letter) => {
                            return (
                                <Card sx={{ m: '30px', maxWidth: '500px', padding: '10px', width: '100%', }} >
                                    <a style={{ textDecoration: 'none' }} href={letter.letterLink}>{letter.description}</a>
                                    <Typography>{letter.year}</Typography>
                                    <Button id={letter._id} onClick={handleDelete} size={'small'}>Delete</Button>
                                </Card>
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
                <Typography variant="h4" >Add {section}</Typography>
                <Button onClick={onClose}>Close</Button>
            </div>
            <div style={{marginBottom: '30px'}} >
                {section === 'member'?<div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: 'wrap', marginBottom: '100px', marginTop: '50px', width: '100%', borderRadius: '18px', flexDirection: 'row', maxWidth: 'calc(100% - 15px)' }} >{renderFields()}</div>: renderFields()}

            </div>
        </div>
    );
}

export default Show;
// Enjoy Coding
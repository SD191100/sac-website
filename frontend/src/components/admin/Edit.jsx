import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';


const Edit = () => {
    const { section, id } = useParams();
    const [data, setData] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/admin/${section}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log(res.data);
                setData(res.data.member);
            }
            catch (error) {
                alert(error.response.data.message);
            }
        }
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement your logic for handling form submission based on the action
        console.log(`Edit ${section}:`, data);
        const submitData = async () => {
            try {
                const res = await axios.put(`http://localhost:3000/admin/${section}/${id}`, data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                alert(res.data.message);
                navigate('/admin');
            }
            catch (error) {
                alert(error.response.data.message);
            }
        };
        submitData();
    }

    return (
        <>
            <Typography variant="h4" align="center" > <strong>Edit</strong> </Typography>
            <div style={{display: "flex", justifyContent: 'space-around', marginBottom: '100px'}} >
                <div>
                    <img style={{height: '300px', width: '300px'}} src={data.memberImageLink} />
                    <Typography>{data.memberName}</Typography>
                    <Typography>{data.memberPost}</Typography>
                    <Typography>{data.memberContact}</Typography>
                    <Typography>{data.memberTeam}</Typography>
                </div>
                <Card style={{padding: '20px', }} >
                    <form onSubmit={handleSubmit}>
                        <label>
                            <TextField
                                style={{ margin: '10px' }}
                                size='small'
                                // label="Name"
                                // type="text"
                                name="memberName"
                                value={data.memberName}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            <TextField
                                style={{ margin: '10px' }}
                                size='small'
                                // label="Post"
                                // type="text"
                                name="memberPost"
                                value={data.memberPost}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            <TextField
                                style={{ margin: '10px' }}
                                size='small'
                                // label="Image Link"
                                // type="text"
                                name="memberImageLink"
                                value={data.memberImageLink}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            <TextField
                                style={{ margin: '10px' }}
                                size='small'
                                // label="Contact"
                                // type="text"
                                name="memberContact"
                                value={data.memberContact}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            <TextField
                                style={{ margin: '10px' }}
                                size='small'
                                // label="Team"
                                // type="text"
                                name="memberTeam"
                                value={data.memberTeam}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <Button type="submit">Submit</Button>
                    </form>
                </Card>
            </div>
        </>
    );
}

export default Edit;
// Enjoy Coding
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


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
            <h1>Edit</h1>
            <div>
                <img src={data.memberImageLink} />
                <h3>{data.memberName}</h3>
                <h4>{data.memberPost}</h4>
                <h4>{data.memberContact}</h4>
                <h4>{data.memberTeam}</h4>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="memberName"
                        value={data.memberName}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Post:
                    <input
                        type="text"
                        name="memberPost"
                        value={data.memberPost}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Image:
                    <input
                        type="text"
                        name="memberImageLink"
                        value={data.memberImageLink}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Post:
                    <input
                        type="text"
                        name="memberContact"
                        value={data.memberContact}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Post:
                    <input
                        type="text"
                        name="memberTeam"
                        value={data.memberTeam}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default Edit;
// Enjoy Coding
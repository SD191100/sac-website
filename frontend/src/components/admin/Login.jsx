import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate();
    const handleLogin = () => {
        const headers = {
            username: username,
            password: password
        }
        const login = async () => {
            try {
                const res = await axios.post('http://localhost:3000/admin/login', null, { headers });
                alert(res.data.message);
                localStorage.setItem('token', res.data.token);
                navigate('/admin');
            } catch (error) {
                if (axios.isCancel(error)) {
                    // Request was canceled (aborted)
                    console.log('Request was canceled (aborted)');
                } else {
                    // Other errors
                    console.log('Other errors');
                    alert(error.response.data.message);
                }
            }
        }
        login();
    }
    return (
        <>
            <div style={{marginBottom: 100}}>
                <div style={{ marginTop: 100, marginBottom: 10, display: "flex", justifyContent: 'center' }}>
                    <Typography variant="h7"> Welcome back, please Sign in Here</Typography>
                </div>
                <div style={{ display: "flex", justifyContent: 'center' }} >
                    {/* <div style={{ border: '2px solid black', width: 400, padding: 10 }}> */}
                    <Card style={{ height: 244, width: 320, paddingLeft: 20, paddingRight: 20, paddingTop: 40 }}  >
                        <TextField fullWidth={true} style={{ paddingBottom: '5px', marginTop: 10 }} id="outlined-basic" label="Username" variant="outlined" onChange={e => setUsername(e.target.value)} />
                        <br />
                        <TextField fullWidth={true} style={{ paddingBottom: '5px', marginTop: 10 }} id="outlined-basic" label="Password" variant="outlined" onChange={e => setPassword(e.target.value)} />
                        <br />
                        <Button style={{  marginTop: 10 }} size={"large"} variant="contained" onClick={handleLogin} >Login</Button>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default Login;
// Enjoy Coding
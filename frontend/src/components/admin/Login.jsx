import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    
    const navigate = useNavigate();
    const handleLogin =  () => {
        const headers = {
            username: username,
            password: password
        }
        const login = async () => {
            try {
                const res = await axios.post('http://localhost:3000/admin/login', null, { headers });
                console.log(res.data.message);
                localStorage.setItem('token', res.data.token);
                navigate('/admin');
            } catch (error) {
                if (axios.isCancel(error)) {
                    // Request was canceled (aborted)
                    console.log('Request was canceled (aborted)');
                } else {
                    // Other errors
                    console.log('Other errors');
                    console.log(error);
                }
            }
        }
        login();
    }
    return (
        <>
            <h1>Login</h1>
                <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                <button onClick={handleLogin} >Login</button>
        </>
    );
}
 
export default Login;
// Enjoy Coding
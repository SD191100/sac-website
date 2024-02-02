/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from 'axios';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const Newsletter = () => {
    const [newsletter, setNewsletter] = useState([]);

    useEffect(() => {
        const getNewsletter = async () => {
            try {
                const res = await axios.get('http://localhost:3000/user/newsletters');
                setNewsletter(res.data.newsLetters);
                console.log(res.data.message);
                console.log(res.data.newsLetters);
            }
            catch (error) {
                console.log(error);
            }
        }
        getNewsletter();
    }, []);
    return (
        <>
            <div style={{ margin: '0 auto', width: '80%', PaddingTop: '200px', marginBottom: '300px' }} >
                <div>
                    <NewsInfo />
                </div>
                <hr style={{height: '1px', borderColor: "gray", background: 'gray'}} />
                <div style={{ display: "flex", justifyContent: 'center' }} >
                    <div>
                        {newsletter.map((letter) => {
                            return (
                                <News key={letter._id} letter={letter} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

const News = ({ letter }) => {
    return (
        <>
            <Card sx={{  m: '30px', maxWidth: '500px', padding: '10px', width: '100%', }} >
                <a style={{textDecoration: 'none'}} href={letter.letterLink}>{letter.description}</a>
                <Typography>{letter.year}</Typography>
            </Card>
        </>
    )
}

const NewsInfo = () => {
    return <div>
        <h1>Newsletter</h1>
    </div>
}

export default Newsletter;
// Enjoy Coding
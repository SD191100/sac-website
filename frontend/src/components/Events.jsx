/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
// import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';


const Events = () => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const getEvents = async () => {
            try {
                const res = await axios.get('http://localhost:3000/user/events');
                setEvents(res.data.events);
                console.log(res.data.message);
                console.log(res.data.events);
            } catch (error) {
                console.log(error);
            }
        }
        getEvents();
    }, []);
    return (
        <>
            <div style={{ margin: '0 auto', width: '80%', PaddingTop: '200px' }} >
                <EventInfo />
                <hr style={{height: '1px', borderColor: "gray", background: 'gray'}} />
                <div style={{ display: "flex", justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '100px', marginTop: '50px', width: '100%', borderRadius: '18px', flexDirection: 'row', maxWidth: 'calc(100% - 15px)' }} >
                    
                    {events.map((event) => {
                        return (
                            <Event key={event._id} event={event} />
                        )
                    })}
                </div>
            </div>
        </>
    );
}

const Event = ({ event }) => {
    return (
        <>
            <Card sx={{ m: '30px', maxWidth: '300px', width: '100%', }}>
                <CardActionArea>
                    <div style={{ display: "flex", justifyContent: "center" }} >
                        <img style={{ height: '300px', width: '300px', margin: '10px' }} src={event.eventPosterLink} alt="" />
                    </div>
                    <CardContent>
                        <Typography textAlign={"center"} gutterBottom variant="caption" component="div">
                            {event.eventName}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}

const EventInfo = () => {
    return <div style={{ marginBottom: '50px' }} >
        <Typography style={{ marginBottom: '10px' }} variant={'h4'} >Events</Typography>
    </div>
}

export default Events;
// Enjoy Coding
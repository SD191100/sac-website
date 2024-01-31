/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from 'axios';

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
            <EventInfo />
            <div>
                {events.map((event) => {
                    return (
                        <Event key={event._id} event={event} />
                    )
                })}
            </div>
        </>
    );
}

const Event = ({ event }) => {
    return (
        <>
            <div>
                <img src={event.eventPosterLink} />
                <h3>{event.eventName}</h3>
                <button>more Info</button>
            </div>
        </>
    )
}

const EventInfo = () => {
    return <div>
    <h1>Events</h1>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi hic maxime velit. Adipisci fugit, doloremque consequatur harum natus, cum optio et aperiam eum labore temporibus. Dolorum laboriosam, explicabo dolore enim repellendus similique quisquam reprehenderit sit laudantium quo quibusdam iure aut quos corrupti deleniti perferendis doloribus! Reprehenderit beatae modi saepe numquam ullam totam blanditiis doloribus vero error dolores, odit suscipit ratione nobis. Similique omnis eos veritatis, ipsa fuga tempore fugit, tenetur animi accusantium praesentium nobis, dolor mollitia odio nemo reprehenderit error vel hic deserunt? Deserunt quas, saepe deleniti cum corrupti veniam, dicta voluptates accusantium vero hic distinctio animi ipsum unde blanditiis a nesciunt dolor voluptatibus pariatur quos, officiis repellendus explicabo exercitationem nihil velit. Recusandae alias obcaecati quos asperiores minima ex consectetur laudantium fugiat doloremque ab, molestiae enim non! Sed iusto, quae, est porro unde reiciendis labore, dolore accusamus laboriosam sapiente nulla magni facere distinctio amet recusandae animi repudiandae ad. Ullam, facilis nulla fuga odit cumque voluptatibus vitae. A hic, beatae eligendi sit odio quidem enim iure repudiandae cupiditate, deleniti ea. Velit, minus dolorem amet architecto odit assumenda quis eius accusamus excepturi esse ad aliquid ducimus laudantium natus, quisquam praesentium nihil eum illum animi expedita voluptas. Autem recusandae nisi cumque nam quae.</p>
    </div>
}
 
export default Events;
// Enjoy Coding
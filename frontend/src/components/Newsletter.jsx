/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from 'axios';

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
            <div>
                <NewsInfo />
            </div>
            <div>
                {newsletter.map((letter) => {
                    return (
                        <News key={letter._id} letter={letter} />
                    )
                })}
            </div>
        </>
    );
}

const News = ({ letter }) => {
    return (
        <>
            <div>
                <a href={letter.letterLink}>{letter.description}</a>
                <h3>{letter.year}</h3>
            </div>
        </>
    )
}

const NewsInfo = () => {
    return <div>
        <h1>Newsletter</h1>
        <p>Each year Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem voluptatum, repudiandae cumque sequi temporibus laborum corporis porro tempore qui enim nisi quos minus provident beatae suscipit consequuntur consequatur aperiam. Ex aut minus corrupti ipsam sequi inventore et hic saepe vero fugiat, ab sapiente dolorem labore exercitationem, doloremque nulla similique itaque. Maxime ipsam quasi, eveniet praesentium voluptate, beatae deleniti aut libero adipisci error temporibus veniam laudantium recusandae numquam minima saepe voluptatibus tempore inventore ad fugiat blanditiis quae alias. Recusandae praesentium excepturi, sed est id hic eius deleniti nesciunt eos commodi reprehenderit quis facilis suscipit, laboriosam eaque. Dolores aperiam quia corporis soluta.</p>
    </div>
}

export default Newsletter;
// Enjoy Coding
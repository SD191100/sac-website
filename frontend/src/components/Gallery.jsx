/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from 'axios';

const Gallery = () => {
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        const getPhotos = async () => {
            try {
                const res = await axios.get('http://localhost:3000/user/gallery');
                setPhotos(res.data.photos);
                console.log(res.data.message);
                console.log(res.data.photos);
            } catch (error) {
                console.log(error);
            }
        }
        getPhotos();
    }, []);

    return (
        <>
            <div>
                <GalleryInfo />
            </div>
            <div>
                {photos.map((photo) => {
                    return (
                        <Photo key={photo._id} photo={photo} />
                    )
                })}
            </div>
        </>
    );
}

const Photo = ({ photo }) => {
    return (
        <>
            <div>
                <img src={photo.photoLink} />
                <h3>{photo.description}</h3>
                <button>more Info</button>
            </div>
        </>
    )
}

const GalleryInfo = () => {
    return <div>
        <h1>Gallery</h1>
        <p>Gallery Page Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic, magni obcaecati aspernatur illo perferendis officiis mollitia numquam! Accusantium magnam beatae minus quas corporis cum ipsam nihil aliquam consectetur eos, tempore sequi voluptatum illum eum qui, velit non dolorem expedita, quasi ea praesentium obcaecati excepturi. Veniam voluptatem dicta repellendus non esse accusantium cupiditate totam amet. Praesentium nobis ipsum quaerat asperiores, architecto ducimus enim quidem mollitia cumque tempore ullam, nam voluptas placeat voluptatem consequatur eos sint modi dolore. Qui saepe et deleniti quibusdam cupiditate laboriosam dolor nulla, quod a commodi ad exercitationem! Id pariatur explicabo obcaecati aliquid architecto ipsum eveniet dignissimos ea.</p>
    </div>
}

export default Gallery;
// Enjoy Coding
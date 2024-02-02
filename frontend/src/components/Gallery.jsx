/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from 'axios';
// import Card from '@mui/material/Card';
// import CardActionArea from '@mui/material/CardActionArea';
// import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


// import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';




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
            <div style={{ margin: '0 auto', width: '80%', PaddingTop: '200px' }} >
                <div>
                    <GalleryInfo />
                </div>
                <hr style={{height: '1px', borderColor: "gray", background: 'gray'}} />
                <div style={{ display: "flex", justifyContent: 'center' }} >
                    <ImageList sx={{ width: 1500, height: 1000 }} cols={2} rowHeight={500}>
                        {photos.map((item) => (
                            <ImageListItem key={item._id}>
                                <img
                                    srcSet={`${item.photoLink}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${item.photoLink}?w=164&h=164&fit=crop&auto=format`}
                                    alt={item.description}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            </div>
        </>
    );
}


const GalleryInfo = () => {
    return <div style={{ marginBottom: '50px' }} >
        <Typography style={{ marginBottom: '10px' }} variant={'h4'} >Gallery</Typography>
    </div>
}

export default Gallery;
// Enjoy Coding
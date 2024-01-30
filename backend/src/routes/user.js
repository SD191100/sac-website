const express = require('express');
const router = express.Router();
const { Event, Member, Gallery, Letter } = require('../db/index');


router.get('/events', async (req, res) => {
    // gets/shows all events
    const events = await Event.find({});
    res.json({ message: 'events Fetched Sucessfully, ', events: events });
});

router.get('/newsletters', async (req, res) => {
    // gets/shows all news
    const newsLetters = await Letter.find({});
    res.json({ message: 'news Fetched Sucessfully, ', newsLetters: newsLetters });
});

router.get('/gallery', async (req, res) => {
    const photos = await Gallery.find({});
    res.json({ message: 'images Fetched Sucessfully', photos: photos });
});

router.get('/gallery/:photoId', async (req, res) => {
    const id = req.params.photoId;
    const photo = await Gallery.findById(id);
    if (photo) {
        res.json({ photo: photo });
    } else {
        res.status(404).json({ message: 'Photo not found' });
    }
});

router.get('/member', async (req, res) => {
    // gets/shows all members
    const members = await Member.find({});
    res.json({ message: 'members Fetched Sucessfully, ', members: members });
});

module.exports = router;
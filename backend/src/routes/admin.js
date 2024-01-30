const express = require('express');
const router = express.Router();
const { auth, generateJwt } = require('../middleware/auth');
const { Admin, Event, Member, Gallery, Letter } = require('../db/index');

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    // console.log('admin signup body ' + username + " " + password);
    const admin = await Admin.findOne({ username: username });
    if (admin) {
        res.json({ message: 'Admin already exist' });
    }
    else {
        const newAdmin = new Admin({ username: username, password: password });
        await newAdmin.save();
        res.json({ message: "admin registered sucessfully" });
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.headers;
    const admin = await Admin.findOne({ username: username, password: password });
    if (admin) {
        const token = generateJwt(admin.username);
        res.json({ message: 'Login Sucessful', token: token });
    }
    else {
        res.status(404).json({ message: 'admin not found' });
    }
})

router.post('/events', auth, async (req, res) => {
    // adds events
    const { eventName, eventDateandTime, eventVenue, eventContact, eventOrganiser } = req.body;
    const event = await Event.findOne({ eventName: eventName });
    if (event) {
        res.status(403).json({ message: 'event already uploaded, check name again' });
    }
    else {
        const newEvent = new Event({
            eventName: eventName,
            eventDateandTime: eventDateandTime,
            eventVenue: eventVenue,
            eventContact: {
                contactName: eventOrganiser,
                contact: eventContact
            }
        });
        await newEvent.save();
        res.status(201).json({ message: 'event added sucessfully' });
    }
});

router.get('/events', auth, async (req, res) => {
    // gets/shows all events
    const events = await Event.find({});
    res.json({ message: 'events Fetched Sucessfully, ', events: events });
});

router.get('/events/:eventId', auth, async (req, res) => {
    // gets/shows one events
    const id = req.params.eventId;
    const event = await Event.findById(id);
    if (event) {
        res.json({ message: 'event fetched sucessfully', event: event });
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
});

router.put('/events/:eventId', auth, async (req, res) => {
    // Edit one events
    const id = req.params.eventId;
    const updatedEvent = req.body;
    const event = await Event.findByIdAndUpdate(id, updatedEvent);
    if (event) {
        res.json({ message: 'Event updated successfully' });
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
});

router.delete('/events/:eventId', auth, async (req, res) => {
    // delete one events
    const id = req.params.eventId;
    const event = await Event.findByIdAndDelete(id);
    if (event) {
        res.json({ message: 'Event deleted successfully' });
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
});

router.get('/member', auth, async (req, res) => {
    // gets/shows all members
    const members = await Member.find({});
    res.json({ message: 'members Fetched Sucessfully, ', members: members });
});

router.post('/member', auth, async (req, res) => {
    const { memberName, memberImageLink, memberPost, memberContact, memberTeam } = req.body;
    const member = await Member.findOne({ memberName: memberName });
    if (member) {
        res.status(403).json({ message: 'Member already Exist, check name again' });
    }
    else {
        const newMember = new Member({
            memberName: memberName,
            memberPost: memberPost,
            memberContact: memberContact,
            memberImageLink: memberImageLink,
            memberTeam: memberTeam
        })
        await newMember.save();
        res.status(201).json({ message: 'Member added sucessfully' });
    }
});

router.get('/member/:memberId', auth, async (req, res) => {
    const id = req.params.memberId;
    const member = await Member.findById(id);
    if (member) {
        res.json({ message: 'member fetched sucessfully', member });
    } else {
        res.status(404).json({ message: 'Member not found' });
    }
});

router.put('/member/:memberId', auth, async (req, res) => {
    const id = req.params.memberId;
    const updatedMember = req.body;
    const member = await Member.findByIdAndUpdate(id, updatedMember);
    if (member) {
        res.json({ message: 'Member updated successfully' });
    } else {
        res.status(404).json({ message: 'Member not found' });
    }
});

router.delete('/member/:memberId', auth, async (req, res) => {
    const id = req.params.memberId;
    const member = await Member.findByIdAndDelete(id);
    if (member) {
        res.json({ message: 'Member deleted successfully' });
    } else {
        res.status(404).json({ message: 'Member not found' });
    }
});

router.post('/gallery', auth, async (req, res) => {
    const { photoLink, description } = req.body;
    const photo = new Gallery({
        photoLink: photoLink,
        description: description
    })
    await photo.save();
    res.status(201).json({ message: 'Photo added successfully' });
});

router.get('/gallery', auth, async (req, res) => {
    const photos = await Gallery.find({});
    res.json({ message: 'images Fetched Sucessfully', photos: photos });
});

router.get('/gallery/:photoId', auth, async (req, res) => {
    const id = req.params.photoId;
    const photo = await Gallery.findById(id);
    if (photo) {
        res.json({ photo: photo });
    } else {
        res.status(404).json({ message: 'Photo not found' });
    }
});

router.put('/gallery/:photoId', auth, async (req, res) => {
    const id = req.params.photoId;
    const newPhoto = req.body;
    const photo = await Gallery.findByIdAndUpdate(id, newPhoto);
    if (photo) {
        res.json({ message: 'Photo updated successfully' });
    } else {
        res.status(404).json({ message: 'Photo not found' });
    }
});

router.delete('/gallery/:photoId', auth, async (req, res) => {
    const id = req.params.photoId;
    const photo = await Gallery.findByIdAndDelete(id);
    if (photo) {
        res.json({ message: 'Photo deleted successfully' });
    } else {
        res.status(404).json({ message: 'Photo not found' });
    }
});

router.post('/newsletters', auth, async (req, res) => {
    // adds news
    const { letterLink, description, year } = req.body;
    const letter = await Letter.findOne({ year: year });
    if (letter) {
        res.status(403).json({ message: 'news already uploaded, check year again' });
    }
    else {
        const newLetter = new Letter({
            letterLink: letterLink,
            description: description,
            year: year
        })
        await newLetter.save();
        res.status(201).json({ message: 'news added sucessfully' });
    }
});

router.get('/newsletters', auth, async (req, res) => {
    // gets/shows all news
    const newsLetters = await Letter.find({});
    res.json({ message: 'news Fetched Sucessfully, ', newsLetters: newsLetters });
});

router.get('/newsletters/:letterId', auth, async (req, res) => {
    // gets/shows one news
    const id = req.params.letterId;
    const letter = await Letter.findById(id);
    if (letter) {
        res.json({ letter: letter });
    } else {
        res.status(404).json({ message: 'news not found' });
    }
});

router.put('/newsletters/:letterId', auth, async (req, res) => {
    // Edit one news
    const id = req.params.letterId;
    const updatedLetter = req.body;
    const letter = await Letter.findByIdAndUpdate(id, updatedLetter);
    if (letter) {
        res.json({ message: 'news updated successfully' });
    } else {
        res.status(404).json({ message: 'news not found' });
    }
});

router.delete('/newsletters/:letterId', auth, async (req, res) => {
    // delete one news
    const id = req.params.letterId;
    const letter = await Letter.findByIdAndDelete(id);
    if (letter) {
        res.json({ message: 'news deleted successfully' });
    } else {
        res.status(404).json({ message: 'news not found' });
    }
});

module.exports = router;
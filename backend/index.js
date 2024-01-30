const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
const ADMINS = [];
const EVENTS = [];
const MEMBERS = [];
const GALLERY = [];
const NEWSLETTERS = [];

app.use(cors());
app.use(express.json())

function genId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}

// mongoose.connect('mongodb+srv://shivamdurgude:01010202@cluster0.hny5grp.mongodb.net/sac', { dbName: sac });

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/admin/signup', (req, res) => {
    const { username, password } = req.body;
    // console.log('admin signup body ' + username + " " + password);
    const admin = ADMINS.find(a => a.username === username);
    if (admin) {
        res.json({ message: 'Admin already exist' });
    }
    else {
        ADMINS.push({ username: username, password: password });
        res.json({ message: "admin registered sucessfully" });
    }
})
app.post('/admin/login', (req, res) => {
    const { username, password } = req.headers;
    const admin = ADMINS.find(a => a.username === username && a.password === password);
    if (admin) {
        // console.log('kya hai ye ' + admin.username + " " + admin.password);
        res.json({ message: 'Login Sucessful' })
    }
    else {
        res.status(404).json({ message: 'admin not found' })
    }
})

app.post('/admin/events', (req, res) => {
    // adds events
    const { eventName, eventDateandTime, eventVenue, eventContact } = req.body;
    const event = EVENTS.find(e => e.eventName === eventName);
    if (event) {
        res.status(403).json({ message: 'event already uploaded, check name again' });
    }
    else {
        const id = genId();
        EVENTS.push({
            id: id,
            eventName: eventName,
            eventDateandTime: eventDateandTime,
            eventVenue: eventVenue,
            eventContact: eventContact
        })
        res.status(201).json({ message: 'event added sucessfully' });
    }
});
app.get('/admin/events', (req, res) => {
    // gets/shows all events
    res.json({ message: 'events Fetched Sucessfully, ', EVENTS });
});
app.get('/admin/events/:eventId', (req, res) => {
    // gets/shows one events
    const id = req.params.eventId;
    const event = EVENTS.find(e => e.id === id);
    if (event) {
        res.json({ event });
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
});
app.put('/admin/events/:eventId', (req, res) => {
    // Edit one events
    const id = req.params.eventId;
    const { eventName, eventDateandTime, eventVenue, eventContact } = req.body;
    const event = EVENTS.find(e => e.id === id);
    if (event) {
        event.eventName = eventName;
        event.eventDateandTime = eventDateandTime;
        event.eventVenue = eventVenue;
        event.eventContact = eventContact;
        res.json({ message: 'Event updated successfully' });
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
});
app.delete('/admin/events/:eventId', (req, res) => {
    // delete one events
    const id = req.params.eventId;
    const index = EVENTS.findIndex(e => e.id === id);
    if (index !== -1) {
        EVENTS.splice(index, 1);
        res.json({ message: 'Event deleted successfully' });
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
});

app.get('/admin/member', (req, res) => {
    // gets/shows all members
    res.json({ message: 'members Fetched Sucessfully, ', MEMBERS });
});
app.post('/admin/member', (req, res) => {
    const { memberName, memberImageLink, memberPost, memberContact, memberTeam } = req.body;
    // console.log(memberName + " " + memberImageLink + " " + memberPost + " " + memberContact);
    const member = MEMBERS.find(m => m.memberName === memberName);
    if (member) {
        res.status(403).json({ message: 'Member already Exist, check name again' });
    }
    else {
        const id = genId();
        MEMBERS.push({
            id: id,
            memberName: memberName,
            memberPost: memberPost,
            memberContact: memberContact,
            memberImageLink: memberImageLink, //add team name
            memberTeam: memberTeam
        })
        res.status(201).json({ message: 'Member added sucessfully' }); // change it to member added successfully
    }
});
app.get('/admin/member/:memberId', (req, res) => {
    const id = req.params.memberId;
    const member = MEMBERS.find(m => m.id === id);
    if (member) {
        res.json({ member });
    } else {
        res.status(404).json({ message: 'Member not found' });
    }
});
app.put('/admin/member/:memberId', (req, res) => {
    const id = req.params.memberId;
    const { memberName, memberImageLink, memberPost, memberContact } = req.body;
    const member = MEMBERS.find(m => m.id === id);
    if (member) {
        member.memberName = memberName;
        member.memberImageLink = memberImageLink;
        member.memberPost = memberPost;
        member.memberContact = memberContact;
        res.json({ message: 'Member updated successfully' });
    } else {
        res.status(404).json({ message: 'Member not found' });
    }
});
app.delete('/admin/member/:memberId', (req, res) => {
    const id = req.params.memberId;
    const index = MEMBERS.findIndex(m => m.id === id);
    if (index !== -1) {
        MEMBERS.splice(index, 1);
        res.json({ message: 'Member deleted successfully' });
    } else {
        res.status(404).json({ message: 'Member not found' });
    }
});

app.post('/admin/gallery', (req, res) => {
    const { photoLink, description } = req.body;
    const id = genId();
    const newPhoto = { id, photoLink, description };

    // add photo to gallery
    GALLERY.push(newPhoto);
    res.status(201).json({ message: 'Photo added successfully' });
});
app.get('/admin/gallery', (req, res) => {
    res.json({ message: 'images Fetched Sucessfully, ', GALLERY});
});
app.get('/admin/gallery/:photoId', (req, res) => {
    const id = req.params.photoId;
    const photo = GALLERY.find(p => p.id === id);
    if (photo) {
        res.json({ photo });
    } else {
        res.status(404).json({ message: 'Photo not found' });
    }
});
app.put('/admin/gallery/:photoId', (req, res) => {
    const id = req.params.photoId;
    const { photoLink, description } = req.body;
    const photo = GALLERY.find(p => p.id === id);
    if (photo) {
        photo.photoLink = photoLink;
        photo.description = description;
        res.json({ message: 'Photo updated successfully' });
    } else {
        res.status(404).json({ message: 'Photo not found' });
    }
});
app.delete('/admin/gallery/:photoId', (req, res) => {
    const id = req.params.photoId;
    const index = GALLERY.findIndex(p => p.id === id);
    if (index !== -1) {
        GALLERY.splice(index, 1);
        res.json({ message: 'Photo deleted successfully' });
    } else {
        res.status(404).json({ message: 'Photo not found' });
    }
});

app.post('/admin/newsletters', (req, res) => {
    // adds news
    const { letterLink, description, year } = req.body;
    const letter = NEWSLETTERS.find(n => n.year === year);
    if (letter) {
        res.status(403).json({ message: 'news already uploaded, check year again' });
    }
    else {
        const id = genId();
        NEWSLETTERS.push({
            id: id,
            letterLink: letterLink,
            description: description,
            year: year
        })
        res.status(201).json({ message: 'news added sucessfully' });
    }
});
app.get('/admin/newsletters', (req, res) => {
    // gets/shows all news
    res.json({ message: 'news Fetched Sucessfully, ', NEWSLETTERS });
});
app.get('/admin/newsletters/:letterId', (req, res) => {
    // gets/shows one news
    const id = req.params.letterId;
    const letter = NEWSLETTERS.find(n => n.id === id);
    if (letter) {
        res.json({ letter });
    } else {
        res.status(404).json({ message: 'news not found' });
    }
});
app.put('/admin/newsletters/:letterId', (req, res) => {
    // Edit one news
    const id = req.params.letterId;
    const { letterLink,description, year } = req.body;
    const letter = NEWSLETTERS.find(n => n.id === id);
    if (letter) {
        letter.letterLink = letterLink;
        letter.description = description;
        letter.year = year;
        res.json({ message: 'news updated successfully' });
    } else {
        res.status(404).json({ message: 'news not found' });
    }
});
app.delete('/admin/newsletters/:letterId', (req, res) => {
    // delete one news
    const id = req.params.letterId;
    const index = NEWSLETTERS.findIndex(n => n.id === id);
    if (index !== -1) {
        NEWSLETTERS.splice(index, 1);
        res.json({ message: 'news deleted successfully' });
    } else {
        res.status(404).json({ message: 'news not found' });
    }
});

app.listen(PORT, () => {    
    console.log(`server listening on port ${PORT}`);
})

/**
 * AdminSchema: {
 *      _id: string
 *      username: string
 *      password: string
 * }
 * 
 * EventsSchema: {
 *      _id: string
 *      eventName: string
 *      eventDateandTime: string
 *      eventVenue: string
 *      eventContact: { type: mongoose.Schema.Types.ObjectId, ref: 'members' }
 * }
 * 
 * MemberSchema: {
 *      _id: string
 *      memberName: string
 *      memberImageLink: string
 *      memberPost: string
 *      memberTeam: string
 *      memberContact: number(10 digits)
 * }
 * 
 * photoSchema: {
 *      _id: string
 *      photoLink: string
 *      photoDescription: string
 * }
 * 
 * newsLetterSchema: {
 *      _id: string
 *      letterLink: string
 *      letterDescription: string
 *      year: string
 * }
 * 
 * 
 * 
 * 
 * 
 * 
 */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
const ADMINS = [];

app.use(cors());
app.use(express.json())



mongoose.connect('mongodb+srv://shivamdurgude:01010202@cluster0.hny5grp.mongodb.net/sac', { dbName: sac });

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/admin/signup', (req, res) => {
    const { username, password } = req.body;
    const admin = ADMINS.find(a => a.username === username );
    if (admin) {
        res.json({ message: 'Admin already exist' });
    }
    else {
        ADMINS.push({username: username, password: password});
        res.json({message: "admin registered sucessfully"});
    }
})
app.post('/admin/login', (req, res) => {
    const { username, password } = req.headers;
    const admin = ADMINS.find(a => a.username === username && a.password === password);
    if (admin) {
        res.json({ message: 'Login Sucessful' })
    }
    else {
        res.status(404).json({ message: 'admin not found' })
    }
})

app.post('/admin/events', (req, res) => { 
    // adds events
});
app.get('/admin/events', (req, res) => {
    // gets/shows all events
});
app.get('/admin/events/:eventId', (req, res) => {
    // gets/shows one events
});
app.put('/admin/events/:eventId', (req, res) => {
    // Edit one events
});
app.delete('/admin/events/:eventId', (req, res) => {
    // Edit one events
});

app.get('/admin/member', (req, res) => {

});
app.post('/admin/member', (req, res) => {

});
app.get('/admin/member/:memberId', (req, res) => {

});
app.put('/admin/member/:memberId', (req, res) => {

});
app.delete('/admin/member/:memberId', (req, res) => {

});

app.post('/admin/galary', (req, res) => { 
    // adds news
});
app.get('/admin/galary', (req, res) => {
    // gets/shows all news
});
app.get('/admin/galary/:photoId', (req, res) => {

});
app.put('/admin/galary/:photoId', (req, res) => {

});
app.delete('/admin/galary/:photoId', (req, res) => {

});

app.post('/admin/newsLetters', (req, res) => { 
    // adds news
});
app.get('/admin/newsLetters', (req, res) => {
    // gets/shows all news
});
app.get('/admin/newsLetters/:letterId', (req, res) => {

});
app.put('/admin/newsLetters/:letterId', (req, res) => {

});
app.delete('/admin/newsLetters/:letterId', (req, res) => {

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
 *      letterYear: string
 * }
 * 
 * 
 * 
 * 
 * 
 * 
 */
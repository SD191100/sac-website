const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const app = express();
const PORT = 3000;
const SECRET = 'SaCS3cr3T';

app.use(cors());
app.use(express.json())

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(403).json({ message: 'Token not found' });
  }
  else {
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        res.status(403).json({ message: 'Invalid Token' });
      }
      else {
        req.user = user;
        next();
      }
    })
  }
}

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
})

const eventSchema = new mongoose.Schema({
  eventName: String,
  eventDateandTime: String,
  eventVenue: String,
  eventContact: {
    contactName: String,
    contact: String
  }
})

const memberSchema = new mongoose.Schema({
  memberName: String,
  memberPost: String,
  memberImageLink: String,
  memberContact: String,
  memberTeam: String
})

const gallerySchema = new mongoose.Schema({
  photoLink: String,
  description: String
})

const letterSchema = new mongoose.Schema({
  letterLink: String,
  description: String,
  year: String
})

const Admin = mongoose.model('Admin', adminSchema);
const Event = mongoose.model('Event', eventSchema);
const Member = mongoose.model('Member', memberSchema);
const Gallery = mongoose.model('Gallery', gallerySchema);
const Letter = mongoose.model('Letter', letterSchema);

mongoose.connect('mongodb+srv://shivamdurgude:01010202@cluster0.hny5grp.mongodb.net/sac', { dbName: 'sac' });

app.get('/', auth, async (req, res) => {
  res.send('Hello World');
})

app.post('/admin/signup', async (req, res) => {
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

app.post('/admin/login', async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username: username, password: password });
  if (admin) {
    const token = jwt.sign({ username: admin.username }, SECRET , { expiresIn: '1h' });
    res.json({ message: 'Login Sucessful', token: token});
  }
  else {
    res.status(404).json({ message: 'admin not found' });
  }
})

app.post('/admin/events', auth, async (req, res) => {
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

app.get('/admin/events', auth, async (req, res) => {
  // gets/shows all events
  const events = await Event.find({});
  res.json({ message: 'events Fetched Sucessfully, ', events: events });
});

app.get('/admin/events/:eventId', auth, async (req, res) => {
  // gets/shows one events
  const id = req.params.eventId;
  const event = await Event.findById(id);
  if (event) {
    res.json({ message: 'event fetched sucessfully', event: event });
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
});

app.put('/admin/events/:eventId', auth, async (req, res) => {
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

app.delete('/admin/events/:eventId', auth, async (req, res) => {
  // delete one events
  const id = req.params.eventId;
  const event = await Event.findByIdAndDelete(id);
  if (event) {
    res.json({ message: 'Event deleted successfully' });
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
});

app.get('/admin/member', auth, async (req, res) => {
  // gets/shows all members
  const members = await Member.find({});
  res.json({ message: 'members Fetched Sucessfully, ', members: members });
});

app.post('/admin/member', auth, async (req, res) => {
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

app.get('/admin/member/:memberId', auth, async (req, res) => {
  const id = req.params.memberId;
  const member = await Member.findById(id);
  if (member) {
    res.json({ message: 'member fetched sucessfully', member });
  } else {
    res.status(404).json({ message: 'Member not found' });
  }
});

app.put('/admin/member/:memberId', auth, async (req, res) => {
  const id = req.params.memberId;
  const updatedMember = req.body;
  const member = await Member.findByIdAndUpdate(id, updatedMember);
  if (member) {
    res.json({ message: 'Member updated successfully' });
  } else {
    res.status(404).json({ message: 'Member not found' });
  }
});

app.delete('/admin/member/:memberId', auth, async (req, res) => {
  const id = req.params.memberId;
  const member = await Member.findByIdAndDelete(id);
  if (member) {
    res.json({ message: 'Member deleted successfully' });
  } else {
    res.status(404).json({ message: 'Member not found' });
  }
});

app.post('/admin/gallery', auth, async (req, res) => {
  const { photoLink, description } = req.body;
  const photo = new Gallery({
    photoLink: photoLink,
    description: description
  })
  await photo.save();
  res.status(201).json({ message: 'Photo added successfully' });
});

app.get('/admin/gallery', auth, async (req, res) => {
  const photos = await Gallery.find({});
  res.json({ message: 'images Fetched Sucessfully', photos: photos});
});

app.get('/admin/gallery/:photoId', auth, async (req, res) => {
  const id = req.params.photoId;
  const photo = await Gallery.findById(id);
  if (photo) {
    res.json({ photo: photo });
  } else {
    res.status(404).json({ message: 'Photo not found' });
  }
});

app.put('/admin/gallery/:photoId', auth, async (req, res) => {
  const id = req.params.photoId;
  const newPhoto = req.body;
  const photo = await Gallery.findByIdAndUpdate(id, newPhoto);
  if (photo) {
    res.json({ message: 'Photo updated successfully' });
  } else {
    res.status(404).json({ message: 'Photo not found' });
  }
});

app.delete('/admin/gallery/:photoId', auth, async (req, res) => {
  const id = req.params.photoId;
  const photo = await Gallery.findByIdAndDelete(id);
  if (photo) {
    res.json({ message: 'Photo deleted successfully' });
  } else {
    res.status(404).json({ message: 'Photo not found' });
  }
});

app.post('/admin/newsletters', auth, async (req, res) => {
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

app.get('/admin/newsletters', auth, async (req, res) => {
  // gets/shows all news
  const newsLetters = await Letter.find({});
  res.json({ message: 'news Fetched Sucessfully, ', newsLetters: newsLetters});
});

app.get('/admin/newsletters/:letterId', auth, async (req, res) => {
  // gets/shows one news
  const id = req.params.letterId;
  const letter = await Letter.findById(id);
  if (letter) {
    res.json({ letter: letter });
  } else {
    res.status(404).json({ message: 'news not found' });
  }
});

app.put('/admin/newsletters/:letterId', auth, async (req, res) => {
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

app.delete('/admin/newsletters/:letterId', auth, async (req, res) => {
  // delete one news
  const id = req.params.letterId;
  const letter = await Letter.findByIdAndDelete(id);
  if (letter) {
    res.json({ message: 'news deleted successfully' });
  } else {
    res.status(404).json({ message: 'news not found' });
  }
});

app.get('/user/events', async (req, res) => {
  // gets/shows all events
  const events = await Event.find({});
  res.json({ message: 'events Fetched Sucessfully, ', events: events });
});

app.get('/user/newsletters', async (req, res) => {
  // gets/shows all news
  const newsLetters = await Letter.find({});
  res.json({ message: 'news Fetched Sucessfully, ', newsLetters: newsLetters});
});

app.get('/user/gallery', async (req, res) => {
  const photos = await Gallery.find({});
  res.json({ message: 'images Fetched Sucessfully', photos: photos});
});

app.get('/user/gallery/:photoId', async (req, res) => {
  const id = req.params.photoId;
  const photo = await Gallery.findById(id);
  if (photo) {
    res.json({ photo: photo });
  } else {
    res.status(404).json({ message: 'Photo not found' });
  }
});

app.get('/user/member', async (req, res) => {
  // gets/shows all members
  const members = await Member.find({});
  res.json({ message: 'members Fetched Sucessfully, ', members: members });
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

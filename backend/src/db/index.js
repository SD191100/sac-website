const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
})

const eventSchema = new mongoose.Schema({
    eventName: String,
    eventPosterLink: String
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

module.exports = {
    Admin,
    Event,
    Member,
    Gallery,
    Letter
}
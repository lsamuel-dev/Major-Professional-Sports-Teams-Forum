const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeagueSchema = new Schema({
    name: {
        type: String,
        required: [true, 'League name is required'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'A brief description is required']
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true
    }
});

module.exports = mongoose.model('League', LeagueSchema);
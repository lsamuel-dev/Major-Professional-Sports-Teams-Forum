const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Question title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Question content is required'],
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Links to the User model in User.js
        required: true
    },
    league: {
        type: Schema.Types.ObjectId,
        ref: 'League', // Links to the League model in League.js
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // This handles the "Chronological Order" requirement
    }
});

// Create an index for faster searching by league
QuestionSchema.index({ league: 1, createdAt: -1 });

module.exports = mongoose.model('Question', QuestionSchema);
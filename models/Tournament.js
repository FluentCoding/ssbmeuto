import mongoose from 'mongoose'

const TournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this tournament!'],
        maxlength: [30, 'Name cannot be longer than 30 characters!']
    },
    datetime: {
        type: Number,
        required: [true, 'Please provide a timestamp!']
    },
    challonge: {
        type: String
    },
    smashgg: {
        type: String
    },
    discord: {
        type: String
    },
    authorId: {
        type: String
    },
    authorName: {
        type: String
    },
    state: {
        type: Number
    }
});

export default mongoose.models.Tournament || mongoose.model('Tournament', TournamentSchema)
import mongoose from 'mongoose'

const AdminEntrySchema = new mongoose.Schema({
    id: {
        type: String
    }
});

export default mongoose.models.AdminEntry || mongoose.model('AdminEntry', AdminEntrySchema);
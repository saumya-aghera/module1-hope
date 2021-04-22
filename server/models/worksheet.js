import mongoose from 'mongoose';

const worksheetSchema = new mongoose.Schema({
    ans1: String,
    ans2: String,
    ans3: String,
    userId: String,
    userName: String
});

const worksheet = mongoose.model('worksheet',worksheetSchema);

export default worksheet;
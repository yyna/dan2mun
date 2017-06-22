import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Error = new Schema({
  username: String,
  contents: String,
  created: { type: Date, default: Date.now }
});

export default mongoose.model('error', Error);

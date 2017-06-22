import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Drama = new Schema({
  title: String,
  director: String,
  actors: [{
    role: String,
    actor: String
  }],
  genre: String,
  era: String,
  king: String,
  events: [String]
});

export default mongoose.model('drama', Drama);

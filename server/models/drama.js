import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Drama = new Schema({
  title: String,
  director: String,
  actors: Array,
  genre: String,
  era: String,
  king: String,
  events: String,
  image: String
});

export default mongoose.model('drama', Drama);

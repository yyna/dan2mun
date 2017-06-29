import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Drama = new Schema({
  title: String,
  director: String,
  actors: String,
  era: String,
  king: String,
  events: String,
  image: String,
  when: Number,
  when_date: Number,
});

export default mongoose.model('drama', Drama);

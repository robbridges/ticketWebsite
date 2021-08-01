import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  console.log('Starting up.........');
  
  if (!process.env.JWT_TOKEN) {
    throw new Error('JWT_Key must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined')
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('connected to mongo db');
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
};

start();




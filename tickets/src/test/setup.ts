import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { beforeAll, beforeEach, afterAll } from '@jest/globals'
import { app } from '../app';
import request from 'supertest';


declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string>
    }
  }
}



let mongo: any;


beforeAll(async () => {
  process.env.JWT_TOKEN = 'dwadwad'
  
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});


beforeEach( async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});



afterAll( async ()=> {
  await mongo.stop();
  await mongoose.connection.close();
});
/* we are creating a global sign up variable so that we do not duplicate every time there
is an authenicated request test in our testing environment */

global.signin = async () => {
  // Build a JWT payload.

  // create the JWT!

  // Build a session Object

  // turn that session into JSON

  //take Json and encode as base64

  return '';
};
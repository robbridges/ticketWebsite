import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { beforeAll, beforeEach, afterAll } from '@jest/globals'
import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';


declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}

jest.mock('../nats-wrapper');



let mongo: any;


beforeAll(async () => {
  jest.clearAllMocks();
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
is an authenicated request test in our testing environment In this environment we are actually creating a random ID every time. So that during testing we can test
if the user ID is different that user will not be able to update the ticket. Essentially cannot update a ticket you do not own. */

global.signin =  () => {
  // Build a JWT payload.
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'admin@admin.com'
  }; 

  // create the JWT!
  const token = jwt.sign(payload, process.env.JWT_TOKEN!);
  // Build a session Object
  const session = { jwt: token };
  // turn that session into JSON
  const sessionJson = JSON.stringify(session);
  //take Json and encode as base64
  const base64 = Buffer.from(sessionJson).toString('base64');
  return [`express:sess=${base64}`];
};
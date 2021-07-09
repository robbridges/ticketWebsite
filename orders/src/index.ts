import mongoose from 'mongoose';

import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { TicketCreatedListener } from './events/listeners/ticket-created-listener';
import { TicketUpdatedListener } from './events/listeners/ticket-updated-listener';

const start = async () => {
  if (!process.env.JWT_TOKEN) {
    throw new Error('JWT_Key must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error ('MONGO_URI must be defined');
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error ('NATS client ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error ('NATS url must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error ('NATS cluster ID must be defined');
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    // graceful shut down on nats client, so that nats knows to stop looking for something we just shut down.
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();

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




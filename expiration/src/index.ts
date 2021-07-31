
import { natsWrapper } from './nats-wrapper';
import { OrderCreatedListener } from './events/listeners/order-created-listener';


const start = async () => {
  
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

    
    new OrderCreatedListener(natsWrapper.client).listen(); 
  } catch (err) {
    console.error(err);
  }
  
};

start();




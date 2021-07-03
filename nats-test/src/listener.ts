
import nats, {Message} from 'node-nats-streaming'
import { randomBytes } from 'crypto';


console.clear();


const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222'
});

stan.on('connect', () => {
  console.log('Listener connected to nats');

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });
  /* 
  chaining different options to nats, manual acknowledgements so that we only complete
  a request once it's been succesful, and playing with delivery all mode, though this not forseeable as
  when any project scales we are looking at resending a lot of events at once.
  
  Fixed! We can set a durable name a que group so that nats keeps a record and sends us what we need. 
  So then we do not send the entire list to the group once it restarts
  */
  const options = stan
  .subscriptionOptions()
  .setManualAckMode(true)
  .setDeliverAllAvailable()
  .setDurableName('order-service');

  const subscription = stan.subscribe(
    'ticket:created', 
    'listenerQueueGroup',
    options
  );

  subscription.on('message', (msg : Message ) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Recieved event #${msg.getSequence()}, with data: ${(data)}`)
    }

    msg.ack();
  });
});


process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
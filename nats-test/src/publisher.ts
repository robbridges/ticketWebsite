import nats from 'node-nats-streaming';

const stan = nats.connect('ticketing', 'abc', {
  url:'http://localhost:4222'
});


/* we are sending over the fake data object just to practice sending through nats nats actually does not let objects be sent to it
it wants single strings, so we're going to stringify the object to make nats happy */
stan.on('connect', () => {
  console.log('Publisher connected to nats');

  const data = JSON.stringify({
    id: '123',
    title: 'concert',
    price: 10
  });

  stan.publish('ticket:created', data, () => {
    console.log('data published');
  });
});
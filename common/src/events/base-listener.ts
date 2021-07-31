import { Message, Stan } from 'node-nats-streaming'
import { Subjects } from './subjects';

interface Event {
  subject: Subjects;
  data: any;

}

export abstract class Listener<T extends Event> {
  abstract subject: T['subject'];
  abstract queueGroupName: string;
  abstract onMessage(data: T['data'], msg: Message): void;
  protected client: Stan;
  protected ackWait = 5 * 1000;
  

  constructor(client: Stan) {
    this.client = client;
  }

  /* 
  chaining different options to nats, manual acknowledgements so that we only complete
  a request once it's been succesful, and playing with delivery all mode, though this not forseeable as
  when any project scales we are looking at resending a lot of events at once.
  
  Fixed! We can set a durable name a que group so that nats keeps a record and sends us what we need. 
  So then we do not send the entire list to the group once it restarts
  */
  subscriptionOptions() {
    return this.client
    .subscriptionOptions()
    .setDeliverAllAvailable()
    .setManualAckMode(true)
    .setAckWait(this.ackWait)
    .setDurableName(this.queueGroupName)

  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on('message', (msg: Message) => {
      console.log(
        `Message recieved ${this.subject} / ${this.queueGroupName}`
      );

      const parseData = this.parseMessage(msg);
      this.onMessage(parseData, msg);
    });
  }

  parseMessage(msg: Message) {
      const data = msg.getData();
      return typeof data ==='string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
  }
}
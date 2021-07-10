import mongoose from 'mongoose';
import { Order, OrderStatus } from './order';


interface TicketAttrs {
  title: string;
  price: number;
  id: string;
}

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  isReserved(): Promise<boolean>;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket({
   _id: attrs.id,
   title: attrs.title,
   price: attrs.price, 
  });
};

ticketSchema.methods.isReserved = async function() {
  // this === the ticket document that we just called 'isReserved' on
  /* Make sure the ticket is not already reserved
   Run query to look at all orders, Find an order where the ticket is not the ticket we just found
   the orders status is not cancelled
   if we find an order like this ticket is reserved
  */
   const existingOrder = await Order.findOne({
    ticket: this.id,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return !!existingOrder;
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket }
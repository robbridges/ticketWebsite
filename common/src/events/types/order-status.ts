export enum OrderSatus {
  //order is created, but the ticket it is in trying to order has not been reserved
  Created = 'created',
  
  // The ticket the order is trying to reserve has already been reserved, or user chooses to cancel order
  // the order expires before payment
  Cancelled = 'cancelled',

  //Order is awaiting complete payment, order has reserved the ticket
  AwaitingPayment = 'awaiting:payment',

  //Order has complete payment and ticket has been reserved.
  Complete = 'complete'
}
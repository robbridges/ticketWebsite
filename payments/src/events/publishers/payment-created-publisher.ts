import {Subjects, Publisher, PaymentCreatedEvent} from '@ticket.dev/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated
}
import {Subjects, Publisher, ExpirationCompleteEvent} from '@ticket.dev/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
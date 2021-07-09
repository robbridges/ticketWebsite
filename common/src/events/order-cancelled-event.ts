import { Subjects } from "./subjects";

export interface OrderCancelledEvent {
  Subjects: Subjects.OrderCancelled;
  data: {
    id: string;
    ticket: {
      id: string;
    };
  };
}
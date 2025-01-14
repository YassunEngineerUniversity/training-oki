import { Event } from "@/types/event/types";
import { Ticket, TicketDetail } from "@/types/Ticket/types";

export interface TicketViewsMine {
  id: string;
  user_id: string;
  event: Event;
  tickets: Ticket[];
}

export interface TicketViewsDetail {
  id: string;
  user_id: string;
  event: Event;
  tickets: TicketDetail[];
}
import { Event } from "@/types/event/types";
import { Ticket } from "@/types/Ticket/types";

export interface TicketViewsMine {
  id: string;
  user_id: string;
  event: Event;
  tickets: Ticket[];
}
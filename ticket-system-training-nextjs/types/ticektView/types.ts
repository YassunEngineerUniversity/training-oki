import { Event } from "@/types/event/types";
import { Ticket } from "@/types/Ticket/types";

export interface TicketViewsMine {
  id: number;
  user_id: number;
  event: Event;
  tickets: Ticket[];
}
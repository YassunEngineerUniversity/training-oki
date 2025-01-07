import { Entrance } from "@/types/entrance/types";
import { PlayGuide } from "@/types/playGuide/types";
import { Seat } from "@/types/seat/types";
import { TicketType } from "@/types/ticketType/types";

export interface Ticket {
  id: string;
  used_time: string | null;
  transfer_time: string | null;
  play_guide: PlayGuide;
  ticket_type: TicketType;
  entrance: Entrance;
  seat: Seat;
}
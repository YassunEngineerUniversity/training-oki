import { PlayGuide } from "@/types/playGuide/types";

export interface Ticket {
  id: number;
  used_time: string | null;
  transfer_time: string | null;
  play_guide: PlayGuide;
}
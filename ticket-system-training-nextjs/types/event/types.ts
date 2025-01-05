import { Show } from "@/types/show/types";

export interface Event {
  id: number;
  name: string;
  details: string;
  date: string;
  venue: string;
  open_time: string;
  start_time: string;
  end_time: string;
  show: Show;
}
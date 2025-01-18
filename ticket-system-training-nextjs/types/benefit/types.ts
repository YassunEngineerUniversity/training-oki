export interface Benefit {
  id: number;
  name: string;
  details: string;
  used_time: string | null;
  created_at?: Date;
  updated_at?: Date;
};
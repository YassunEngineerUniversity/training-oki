export interface Benefit {
  id: number;
  name: string;
  details: string;
  used_time: Date | null;
  created_at?: Date;
  updated_at?: Date;
};
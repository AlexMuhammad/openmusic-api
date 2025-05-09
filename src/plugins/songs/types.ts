export interface SongRequest {
  title: string;
  year: number;
  performer: string;
  genre: string;
  duration?: number | null;
  albumId: string | null;
}

import { Pool } from "pg";
import { SongRequest } from "../plugins/songs/types";
import { nanoid } from "nanoid";
import InvariantError from "../exceptions/invariant-error";
import NotFoundError from "../exceptions/not-found";

class SongService {
  private _pool: Pool;

  constructor() {
    this._pool = new Pool();
  }

  async addSong({
    title,
    year,
    performer,
    genre,
    duration,
    albumId,
  }: SongRequest) {
    const id = nanoid(16);
    const query = {
      text: "INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id",
      values: [id, title, year, performer, genre, duration, albumId],
    };
    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Failed to add song");
    }
    return result.rows[0].id;
  }

  async getAllSongs(params?: { title?: string; performer?: string }) {
    let query = {
      text: "SELECT id, title, performer FROM songs",
      values: [] as any[],
    };

    if (params && (params.title || params.performer)) {
      let conditions = [];
      let valueIndex = 1;

      if (params.title) {
        conditions.push(`title ILIKE $${valueIndex}`);
        query.values.push(`%${params.title}%`);
        valueIndex++;
      }

      if (params.performer) {
        conditions.push(`performer ILIKE $${valueIndex}`);
        query.values.push(`%${params.performer}%`);
        valueIndex++;
      }

      if (conditions.length > 0) {
        query.text += " WHERE " + conditions.join(" AND ");
      }
    }

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getSongById({ id }: { id: string }) {
    const query = {
      text: "SELECT * FROM songs WHERE id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Song not found");
    }
    return result.rows[0];
  }

  async updateSongById(
    id: string,
    { title, year, performer, genre, duration, albumId }: SongRequest
  ) {
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, "albumId" = $6 WHERE id = $7 RETURNING id',
      values: [title, year, performer, genre, duration, albumId, id],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Song not found");
    }
  }

  async deleteSongById({ id }: { id: string }) {
    const query = {
      text: "DELETE FROM songs WHERE id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Song not found");
    }
  }
}

export default SongService;

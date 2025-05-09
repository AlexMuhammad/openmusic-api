//external import
import { nanoid } from "nanoid";
import { Pool } from "pg";

//internal import
import InvariantError from "../exceptions/invariant-error";
import NotFoundError from "../exceptions/not-found";

class AlbumService {
  private _pool: Pool;

  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }: { name: string; year: number }) {
    const id = nanoid(16);
    const query = {
      text: "INSERT INTO albums VALUES($1, $2, $3) RETURNING id",
      values: [id, name, year],
    };
    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Failed to add album");
    }
    return result.rows[0].id;
  }

  async getAlbumById({ id }: { id: string }) {
    const query = {
      text: "SELECT * FROM albums WHERE id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Album not found");
    }
    return result.rows[0];
  }

  async updateAlbumById({
    id,
    name,
    year,
  }: {
    id: string;
    name: string;
    year: number;
  }) {
    const query = {
      text: "UPDATE albums SET name = $1, year = $2 WHERE id = $3",
      values: [name, year, id],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Album not found");
    }
    return result.rowCount;
  }

  async deleteAlbumById({ id }: { id: string }) {
    const query = {
      text: "DELETE FROM albums WHERE id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Album not found");
    }
    return result.rowCount;
  }
}

export default AlbumService;

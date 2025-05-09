//external import
import { nanoid } from "nanoid";
import { Pool } from "pg";

//internal import
import InvariantError from "../exceptions/invariant-error";

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
}

export default AlbumService;

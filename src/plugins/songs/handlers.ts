import { Request, ResponseToolkit } from "hapi";
import ClientError from "../../exceptions/client-error";
import SongService from "../../services/song";
import SongValidator from "../../validator/songs/index";
import { SongRequest } from "./types";

class SongHandler {
  private _service: SongService;
  private _validator: typeof SongValidator;
  constructor(service: SongService, validator: typeof SongValidator) {
    this._service = service;
    this._validator = validator;

    this.postSongHandler = this.postSongHandler.bind(this);
    this.getAllSongsHandler = this.getAllSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.updateSongByIdHandler = this.updateSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  async postSongHandler(request: Request, h: ResponseToolkit) {
    try {
      this._validator.validateSongPayload(request.payload as SongRequest);
      const { title, year, performer, genre, duration, albumId } =
        request.payload as SongRequest;
      const songId = await this._service.addSong({
        title,
        year,
        performer,
        genre,
        duration,
        albumId,
      });

      const res = h.response({
        status: "success",
        data: {
          songId,
        },
      });
      res.code(201);
      return res;
    } catch (error) {
      if (error instanceof ClientError) {
        const res = h.response({
          status: "fail",
          message: error.message,
        });
        res.code(error.statusCode);
        return res;
      }
      const res = h.response({
        status: "error",
        message: "Something went wrong",
      });
      res.code(500);
      return res;
    }
  }

  async getAllSongsHandler(request: Request, h: ResponseToolkit) {
    try {
      const { title, performer } = request.query as {
        title?: string;
        performer?: string;
      };
      const songs = await this._service.getAllSongs({ title, performer });

      const res = h.response({
        status: "success",
        data: {
          songs,
        },
      });
      res.code(200);
      return res;
    } catch (error) {
      if (error instanceof ClientError) {
        const res = h.response({
          status: "fail",
          message: error.message,
        });
        res.code(error.statusCode);
        return res;
      }
      const res = h.response({
        status: "error",
        message: "Something went wrong",
      });
      res.code(500);
      return res;
    }
  }

  async getSongByIdHandler(request: Request, h: ResponseToolkit) {
    try {
      const { id } = request.params;
      const song = await this._service.getSongById({ id });

      const res = h.response({
        status: "success",
        data: {
          song,
        },
      });
      res.code(200);
      return res;
    } catch (error) {
      if (error instanceof ClientError) {
        const res = h.response({
          status: "fail",
          message: error.message,
        });
        res.code(error.statusCode);
        return res;
      }
      const res = h.response({
        status: "error",
        message: "Something went wrong",
      });
      res.code(500);
      return res;
    }
  }

  async updateSongByIdHandler(request: Request, h: ResponseToolkit) {
    try {
      this._validator.validateSongPayload(request.payload as SongRequest);
      const { id } = request.params;
      const { title, year, performer, genre, duration, albumId } =
        request.payload as SongRequest;

      await this._service.updateSongById(id, {
        title,
        year,
        performer,
        genre,
        duration,
        albumId,
      });

      const res = h.response({
        status: "success",
        message: "Song updated",
      });
      res.code(200);
      return res;
    } catch (error) {
      if (error instanceof ClientError) {
        const res = h.response({
          status: "fail",
          message: error.message,
        });
        res.code(error.statusCode);
        return res;
      }
      const res = h.response({
        status: "error",
        message: "Something went wrong",
      });
      res.code(500);
      return res;
    }
  }

  async deleteSongByIdHandler(request: Request, h: ResponseToolkit) {
    try {
      const { id } = request.params;
      await this._service.deleteSongById({ id });

      const res = h.response({
        status: "success",
        message: "Song deleted",
      });
      res.code(200);
      return res;
    } catch (error) {
      if (error instanceof ClientError) {
        const res = h.response({
          status: "fail",
          message: error.message,
        });
        res.code(error.statusCode);
        return res;
      }
      const res = h.response({
        status: "error",
        message: "Something went wrong",
      });
      res.code(500);
      return res;
    }
  }
}

export default SongHandler;

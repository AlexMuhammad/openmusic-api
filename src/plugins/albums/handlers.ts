import { Request, ResponseToolkit } from "hapi";

import AlbumService from "../../services/album";
import { CreateAlbumRequest } from "./types";
import ClientError from "../../exceptions/client-error";
import AlbumValidator from "../../validator/albums/index";

class AlbumHandler {
  public _service: AlbumService;
  public _validator: typeof AlbumValidator;
  constructor(service: any, validator: any) {
    this._service = service;
    this._validator = validator;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumDetailHandler = this.getAlbumDetailHandler.bind(this);
    this.updateAlbumByIdHandler = this.updateAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
  }

  async postAlbumHandler(request: Request, h: ResponseToolkit) {
    try {
      this._validator.validateAlbumPayload(
        request.payload as CreateAlbumRequest
      );
      const { name, year } = request.payload as CreateAlbumRequest;
      const albumId = await this._service.addAlbum({ name, year });

      const res = h.response({
        status: "success",
        data: {
          albumId,
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

  async getAlbumDetailHandler(request: Request, h: ResponseToolkit) {
    try {
      const { id } = request.params;
      const album = await this._service.getAlbumById({ id });

      const res = h.response({
        status: "success",
        data: {
          album,
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
  async updateAlbumByIdHandler(request: Request, h: ResponseToolkit) {
    try {
      this._validator.validateAlbumPayload(
        request.payload as CreateAlbumRequest
      );

      const { id } = request.params;
      const { name, year } = request.payload as CreateAlbumRequest;
      await this._service.updateAlbumById({ id, name, year });

      const res = h.response({
        status: "success",
        message: "Album updated",
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

  async deleteAlbumByIdHandler(request: Request, h: ResponseToolkit) {
    try {
      const { id } = request.params;
      await this._service.deleteAlbumById({ id });

      const res = h.response({
        status: "success",
        message: "Album deleted",
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

export default AlbumHandler;

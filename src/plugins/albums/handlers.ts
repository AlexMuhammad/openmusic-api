import { Request, ResponseToolkit } from "hapi";

import AlbumService from "../../services/album";
import { CreateAlbumRequest } from "./types";
import ClientError from "../../exceptions/client-error";
import AlbumValidator from "../../validator/albums/index";
class AlbumHandler {
  private _service: AlbumService;
  private _validator: typeof AlbumValidator;
  constructor(service: any, validator: any) {
    this._service = service;
    this._validator = validator;
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
}

export default AlbumHandler;

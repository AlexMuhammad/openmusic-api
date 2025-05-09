import { Request, ResponseToolkit } from "hapi";
import { ServerRoute } from "@hapi/hapi";

interface AlbumHandler {
  postAlbumHandler: (request: Request, h: ResponseToolkit) => Promise<any>;
  getAlbumDetailHandler: (request: Request, h: ResponseToolkit) => Promise<any>;
  updateAlbumByIdHandler: (
    request: Request,
    h: ResponseToolkit
  ) => Promise<any>;
  deleteAlbumByIdHandler: (
    request: Request,
    h: ResponseToolkit
  ) => Promise<any>;
}

const routes = (handler: AlbumHandler): ServerRoute[] => [
  {
    method: "POST",
    path: "/albums",
    handler: handler.postAlbumHandler,
  },
  {
    method: "GET",
    path: "/albums/{id}",
    handler: handler.getAlbumDetailHandler,
  },
  {
    method: "PUT",
    path: "/albums/{id}",
    handler: handler.updateAlbumByIdHandler,
  },
  {
    method: "DELETE",
    path: "/albums/{id}",
    handler: handler.deleteAlbumByIdHandler,
  },
];

export default routes;

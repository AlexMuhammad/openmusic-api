import { ServerRoute } from "@hapi/hapi";
import AlbumHandler from "./handlers";

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

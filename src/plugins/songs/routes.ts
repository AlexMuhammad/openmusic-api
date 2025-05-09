import { ServerRoute } from "@hapi/hapi";
import SongHandler from "./handlers";

const routes = (handler: SongHandler): ServerRoute[] => [
  {
    method: "POST",
    path: "/songs",
    handler: handler.postSongHandler,
  },
  {
    method: "GET",
    path: "/songs",
    handler: handler.getAllSongsHandler,
  },
  {
    method: "GET",
    path: "/songs/{id}",
    handler: handler.getSongByIdHandler,
  },
  {
    method: "PUT",
    path: "/songs/{id}",
    handler: handler.updateSongByIdHandler,
  },
  {
    method: "DELETE",
    path: "/songs/{id}",
    handler: handler.deleteSongByIdHandler,
  },
];

export default routes;

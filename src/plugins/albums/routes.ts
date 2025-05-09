import { Request, ResponseToolkit } from "hapi";
import { ServerRoute } from "@hapi/hapi";

interface AlbumHandler {
  postAlbumHandler: (request: Request, h: ResponseToolkit) => Promise<any>;
}

const routes = (handler: AlbumHandler): ServerRoute[] => [
  {
    method: "POST",
    path: "/albums",
    handler: handler.postAlbumHandler,
  },
];

export default routes;

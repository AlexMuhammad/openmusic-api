import { Plugin, Server } from "@hapi/hapi";
import AlbumHandler from "./handlers";
import routes from "./routes";
import AlbumService from "../../services/album";
import AlbumValidator from "../../validator/albums";

const albumPlugin: Plugin<{
  service: AlbumService;
  validator: typeof AlbumValidator;
}> = {
  name: "albums",
  version: "1.0.0",
  register: async (server: Server, { service, validator }) => {
    const albumHandler = new AlbumHandler(service, validator);

    server.route(routes(albumHandler));
  },
};

export default albumPlugin;

import { Plugin, Server } from "@hapi/hapi";
import AlbumHandler from "./handlers";
import routes from "./routes";

const albumPlugin: Plugin<{ service: any; validator: any }> = {
  name: "albums",
  version: "1.0.0",
  register: async (server: Server, { service, validator }) => {
    const albumHandler = new AlbumHandler(service, validator);

    server.route(routes(albumHandler));
  },
};

export default albumPlugin;

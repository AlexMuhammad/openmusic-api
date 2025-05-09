import { Plugin, Server } from "@hapi/hapi";
import SongService from "../../services/song";
import SongValidator from "../../validator/songs/index";
import SongHandler from "./handlers";
import routes from "./routes";

const songPLugin: Plugin<{
  service: SongService;
  validator: typeof SongValidator;
}> = {
  name: "songs",
  version: "1.0.0",
  register: async (server: Server, { service, validator }) => {
    const songHandler = new SongHandler(service, validator);

    server.route(routes(songHandler));
  },
};

export default songPLugin;

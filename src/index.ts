import Hapi from "@hapi/hapi";
import dotenv from "dotenv";
import AlbumService from "./services/album";
import AlbumValidator from "./validator/albums";

dotenv.config();

const init = async () => {
  const server = new Hapi.Server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  //register plugin
  await registerPlugins(server);

  await server.start();
  console.log(`Server start on ${server.info.uri}`);
};

async function registerPlugins(server: Hapi.Server) {
  //services
  const albumService = new AlbumService();

  //plugins
  const albumPlugin = await import("./plugins/albums");

  await server.register([
    {
      plugin: albumPlugin.default,
      options: {
        service: albumService,
        validator: AlbumValidator,
      },
    },
  ]);
}

init();

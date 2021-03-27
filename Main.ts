import { Client } from "@typeit/discord";

import { Database } from "./database/Main";
import { Pixabay } from "./Pixabay";
import { format } from "./Utils";

export class Main {
  private static _client: Client;

  static get Client(): Client {
    return this._client;
  }

  static start() {
    if(!process.env.BOT_TOKEN) {
      console.error(format("start.no_BOT_TOKEN"));
      process.exit(1);
    }

    if(!process.env.BOT_DBURL) {
      console.warn(format("start.no_BOT_DBURL"));
      new Database;
    } else {
      new Database(process.env.BOT_DBURL);
    }

    if(!process.env.BOT_PIXAKEY) {
      console.warn(format("start.no_BOT_PIXAKEY"));
      new Pixabay;
    } else {
      new Pixabay(process.env.BOT_PIXAKEY);
    }

    this._client = new Client();

    this._client.login(
      process.env.BOT_TOKEN,
      `${__dirname}/AppDiscord.ts`,
      `${__dirname}/AppDiscord.js`
    );

    console.log(format("start.totalCommands",
      Client.getCommands().length));
  }
}

process.on("uncaughtException", (e) => {
  console.error(e);
})

Main.start();

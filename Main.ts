import { Client } from "@typeit/discord";

import { Database } from "./database/Main";
import { Pixabay } from "./Pixabay";

export class Main {
  private static _client: Client;

  static get Client(): Client {
    return this._client;
  }

  static start() {
    if(!process.env.BOT_TOKEN) {
      console.error("Укажите токен в BOT_TOKEN перед запуском.");
      process.exit(1);
    }

    if(!process.env.BOT_DBURL) {
      console.warn("Желательно - Для работы с БД необходимо указать URL на MongoDB в BOT_DBURL");
      new Database;
    } else {
      new Database(process.env.BOT_DBURL);
    }

    if(!process.env.BOT_PIXAKEY) {
      console.warn("Желательно - Для работы с Pixabay необходимо указать его ключ в BOT_PIXAKEY");
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

    console.log("Всего команд: " + Client.getCommands().length);
  }
}

process.on("uncaughtException", (e) => {
  console.error(e);
})

Main.start();

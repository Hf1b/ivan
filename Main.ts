import { Client } from "@typeit/discord";

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

    this._client = new Client();

    this._client.login(
      process.env.BOT_TOKEN,
      `${__dirname}/AppDiscord.ts`,
    );

    console.log("Всего команд: " + Client.getCommands().length);
  }
}

Main.start();
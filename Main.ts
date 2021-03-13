import { Client } from "@typeit/discord";

export class Main {
  private static _client: Client;

  static get Client(): Client {
    return this._client;
  }

  static start() {
    this._client = new Client();

    this._client.login(
      process.env.BOT_TOKEN,
      `${__dirname}/discords/*.ts`,
      `${__dirname}/discords/*.js`
    );

    console.log(Client.getCommands());
  }
}

Main.start();
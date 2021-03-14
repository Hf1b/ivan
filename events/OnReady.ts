import {
  Client,
  Once
} from "@typeit/discord";

export abstract class OnReady {
  @Once("ready")
  async ready(_, client: Client) {
    console.log("Бот загрузился.\n" +
      `Тег: ${client.user.tag}\n` +
      `ID: ${client.user.id}`);
  }
}

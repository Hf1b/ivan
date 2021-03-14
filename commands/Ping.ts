import {
  Command,
  CommandMessage
} from "@typeit/discord";

export abstract class Ping {
  @Command("ping")
  async bye(command: CommandMessage) {
    let ping = command.client.ws.ping;
    command.reply(`Пинг: ${ping}мс`);
  }
}
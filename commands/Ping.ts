import {
  Command,
  CommandMessage,
  Description
} from "@typeit/discord";

export abstract class Ping {
  @Command("ping")
  @Description("Показывает пинг бота")
  async PingCommand(command: CommandMessage) {
    let ping = command.client.ws.ping;
    command.reply(`Пинг: ${ping}мс`);
  }
}

import {
  Client,
  Command,
  CommandMessage,
  Description,
  Guard
} from "@typeit/discord";
import { IsBotAdmin } from "../guards/IsBotAdmin";

export abstract class Essential {
  @Command("eval")
  @Description("Выполнение кода.")
  @Guard(IsBotAdmin)
  async EvalCommand(command: CommandMessage) {
    let toexec = command.commandContent.split(" ").slice(1).join(" ");
    let result: string, error: string;

    let start = Date.now();

    try {
      result = eval(toexec);
    } catch(err) {
      error = err;
    }

    let output = (error ? ":-1:" : ":+1:") +
      " Выполнено за " + (Date.now() - start) +
      "мс\n" + "```js\n" + (result ? result : error) + "\n```"; 

    command.reply(output);
  }

  @Command("help")
  @Description("Помощь по командам бота")
  async HelpCommand(command: CommandMessage) {
    let out = "Команды:";

    const commands = Client.getCommands()
    for(let cmd of commands) {
      out += `\n${cmd.commandName}: ${cmd.description || "Нету описания"}`;
    }

    command.reply(out);
  }

  @Command("ping")
  @Description("Показывает пинг бота")
  async PingCommand(command: CommandMessage) {
    let ping = command.client.ws.ping;
    command.reply(`Пинг: ${ping}мс`);
  }
}

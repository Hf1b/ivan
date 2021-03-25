import {
  Client,
  Command,
  CommandMessage,
  Description,
  Guard,
  Infos
} from "@typeit/discord";
import { TextChannel } from "discord.js";
import { Database } from "../database/Main";
import { IsBotAdmin } from "../guards/IsBotAdmin";
import { RequireRole } from "../guards/RequireRole";

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

  @Command("say")
  @Description("Писанина от имени бота")
  @Infos({ requireRole: "SAY" })
  @Guard(RequireRole)
  async SayCommand(command: CommandMessage) {
    let tosay = command.commandContent.split(" ").slice(1).join(" ");
    if(!tosay) {
      command.reply("Хоть бы написал что-то.");
      return;
    }

    let channelID = await Database.instance.Settings.get("sayChannel");
    let channel;
    try {
      channel = await command.client.channels.fetch(channelID);
    } catch {}

    if(channel instanceof TextChannel) {
      channel.send(tosay);
    } else {
      command.reply("Канал для записи не найден.");
    }
  }
}

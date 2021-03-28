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
import { format } from "../Utils";

export abstract class Essential {
  @Command("eval")
  @Description(format("eval.description"))
  @Guard(IsBotAdmin)
  async EvalCommand(command: CommandMessage) {
    let toexec = command.commandContent.split(" ").slice(1).join(" ");
    let result: string, error: string;

    let time = Date.now();

    try {
      result = eval(toexec);
    } catch(err) {
      error = err;
    }

    time = Date.now() - time;
    command.reply(format("eval.content",
      (error ? ":-1:" : ":+1:"),
      time,
      (result ? result : error)
    ));
  }

  @Command("help")
  @Description(format("help.description"))
  async HelpCommand(command: CommandMessage) {
    let out = format("help.start");

    const commands = Client.getCommands()
    for(let cmd of commands) {
      out += `\n${cmd.commandName}: ${cmd.description || format("help.noDescription")}`;
    }

    command.reply(out);
  }

  @Command("ping")
  @Description(format("ping.description"))
  async PingCommand(command: CommandMessage) {
    let ping = command.client.ws.ping;
    command.reply(format("ping.content", ping));
  }

  @Command("say")
  @Infos({ description: format("say.description"), requireRole: "SAY" })
  @Guard(RequireRole)
  async SayCommand(command: CommandMessage) {
    let tosay = command.commandContent.split(" ").slice(1).join(" ");
    if(!tosay) {
      command.reply(format("say.blank"));
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
      command.reply(format("say.channelNotFound"));
    }
  }
}

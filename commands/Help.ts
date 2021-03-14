import {
  Client,
  Command,
  CommandMessage,
  Description
} from "@typeit/discord";

export abstract class Help {
  @Command("help")
  @Description("Помощь по командам бота")
  async HelpCommand(command: CommandMessage) {
    let out = "Команды:";

    const commands = Client.getCommands()
    for(let cmd of commands) {
      out += `\n${cmd.commandName}: ${cmd.description || "Нету описания"}`
    }

    command.reply(out);
  }
}

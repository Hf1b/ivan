import * as Path from "path";
import {
  Discord,
  CommandNotFound,
  CommandMessage,
  Command,
  Description
} from "@typeit/discord";

console.log(__dirname);

@Discord("!", {
  import: [
    Path.join(__dirname,  "commands", "*.ts"),
    Path.join(__dirname,  "events", "*.ts")
  ]
})
export abstract class AppDiscord {
  @CommandNotFound()
  NotFound(command: CommandMessage) {
    command.reply("Команда не найдена");
  }

  @Command("test")
  @Description("Тестовая команда")
  TestCommand(command: CommandMessage) {
    command.reply("proggers");
  }
}

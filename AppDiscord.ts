import * as Path from "path";
import {
  Discord,
  CommandNotFound,
  CommandMessage,
  Command
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
  notFound(command: CommandMessage) {
    command.reply("Команда не найдена");
  }

  @Command("test")
  test(command: CommandMessage<null>) {
    command.reply("proggers");
  }
}
import * as Path from "path";
import {
  Discord,
  CommandNotFound,
  CommandMessage,
  Command,
  Description
} from "@typeit/discord";
import { format } from "./Utils";

@Discord("!", {
  import: [
    Path.join(__dirname,  "commands", "*.ts"),
    Path.join(__dirname,  "commands", "*.js"),
    Path.join(__dirname,  "events", "*.ts"),
    Path.join(__dirname,  "events", "*.js")
  ]
})
export abstract class AppDiscord {
  @CommandNotFound()
  NotFound(command: CommandMessage) {
    command.reply(format("commandNotFound"));
  }

  @Command("test")
  @Description("Тестовая команда")
  TestCommand(command: CommandMessage) {
    command.reply("proggers");
  }
}

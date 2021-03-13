import {
  Discord,
  CommandMessage,
  Command,
  Description,
  Infos
} from "@typeit/discord";

@Discord("!")
@Description("My super app")
export abstract class AppDiscord {
  @Command("test")
  hello(command: CommandMessage<null>) {
    command.channel.send("proggers")
  }
}
import {
  Command,
  CommandMessage,
  Description,
  Guard
} from "@typeit/discord";
import { IsAdmin } from "../guards/IsAdmin";

export abstract class Ping {
  @Command("eval")
  @Description("Выполнение кода.")
  @Guard(IsAdmin)
  async PingCommand(command: CommandMessage) {
    let toexec = command.commandContent.split(" ").slice(1).join(" ");
    let result, error: string;

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
}

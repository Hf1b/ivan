import { GuardFunction } from "@typeit/discord";
import { Database } from "../database/Main";
import { format } from "../Utils";

let IsBotAdmin: GuardFunction<"commandMessage"> = async ([command], _, next) => {
  if(!Database.instance.ready) {
    command.reply(format("deadDB"));
    return;
  }

  let admins = (await Database.instance.Settings.get("admins")).split(",");

  if(admins.includes(command.author.id)) {
    await next();
  }
  else {
    command.reply(format("IsBotAdmin.blocked"));
  }
}

export { IsBotAdmin };

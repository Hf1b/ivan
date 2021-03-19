import { GuardFunction } from "@typeit/discord";
import { Database } from "../database/Main";

let IsAdmin: GuardFunction<"commandMessage"> = async ([command], _, next) => {
  if(!Database.ready) {
    command.reply("Команда недоступна в связи с проблемами с БД.");
  }

  let admins = (await Database.Settings.get("admins")).split(",");

  if(admins.includes(command.author.id)) {
    await next();
  }
  else {
    command.reply("Данная команда доступна только администраторам бота.");
  }
}

export { IsAdmin };

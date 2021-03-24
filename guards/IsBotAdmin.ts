import { GuardFunction } from "@typeit/discord";
import { Database } from "../database/Main";

let IsBotAdmin: GuardFunction<"commandMessage"> = async ([command], _, next) => {
  if(!Database.instance.ready) {
    command.reply("Команда недоступна в связи с проблемами с БД.");
  }

  let admins = (await Database.instance.Settings.get("admins")).split(",");

  if(admins.includes(command.author.id)) {
    await next();
  }
  else {
    command.reply("Данная команда доступна только администраторам бота.");
  }
}

export { IsBotAdmin };

import { GuardFunction } from "@typeit/discord";
import { Database, RoleFindBy } from "../database/Main";

const RequireRole: GuardFunction<"commandMessage"> = async ([command], _, next) => {
  if(!command.guild) return;
  if(!Database.instance.ready) {
    command.reply("Команда недоступна в связи с проблемами с БД.");
    return;
  }

  if(!command.infos.requireRole) {
    command.reply("Разраб забыл запилить requireRole...");
    return;
  }

  let role = await Database.instance.RoleMap.get(RoleFindBy.Name, command.infos.requireRole)
  if(role) {
    let guildRole = await command.guild.roles.fetch(role.id);
    if(!guildRole) {
      command.reply("Роль, необходимая для команды не найдена в маппингах или заполнена неверно.");
      return;
    }

    if(command.member.roles.cache.has(role.id)) {
      await next();
    } else {
      command.reply("У вас нету роли " + guildRole.name);
    }
  }
}

export { RequireRole };

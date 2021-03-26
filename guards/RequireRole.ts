import { GuardFunction } from "@typeit/discord";
import { Database, RoleFindBy } from "../database/Main";
import { format } from "../Utils";

const RequireRole: GuardFunction<"commandMessage"> = async ([command], _, next) => {
  if(!command.guild) return;
  if(!Database.instance.ready) {
    command.reply(format("deadDB"));
    return;
  }

  if(!command.infos.requireRole) {
    command.reply(format("RequireRole.missing"));
    return;
  }

  let role = await Database.instance.RoleMap.get(RoleFindBy.Name, command.infos.requireRole)
  if(role) {
    let guildRole = await command.guild.roles.fetch(role.id);
    if(!guildRole) {
      command.reply(format("RequireRole.wrong"));
      return;
    }

    if(command.member.roles.cache.has(role.id)) {
      await next();
    } else {
      command.reply(format("RequireRole.blocked", guildRole.name));
    }
  }
}

export { RequireRole };

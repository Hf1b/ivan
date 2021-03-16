import {
  ArgsOf,
  Client,
  On
} from "@typeit/discord";

const MAX_COUNT = 1;

let cooldown = {};

setInterval(() => {
  for(let channel in cooldown) {
    for(let user in cooldown[channel]) {
      let count = cooldown[channel][user];
      if(count > 0) cooldown[channel][user] = --count;
    }
  }
}, 2000);

export abstract class OnReady {
  @On("message")
  async message([m]: ArgsOf<"message">, client: Client) {
    if(m.author.bot) return;

    if(!cooldown[m.channel.id]) {
      cooldown[m.channel.id] = {};
      cooldown[m.channel.id][m.author.id] = 0;
    }

    let count = cooldown[m.channel.id][m.author.id] || 0;

    if(count > MAX_COUNT) {
      try {
        await m.delete();
      } catch {}
    }

    cooldown[m.channel.id][m.author.id] = ++count;
  }
}
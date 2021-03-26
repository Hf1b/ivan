import {
  Client,
  Once
} from "@typeit/discord";
import { format } from "../Utils";

export abstract class OnReady {
  @Once("ready")
  async ready(_, client: Client) {
    console.log(format(
      "ready", client.user.tag, client.user.id
    ));
  }
}

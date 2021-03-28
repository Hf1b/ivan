import { connect, connection } from "mongoose";
import { format } from "../Utils";
import RoleMapModel from "./models/RoleMap.model";
import SettingModel from "./models/Setting.model";

const DEFAULT_PREFIX = "-";

enum RoleFindBy {
  Name = "name",
  HumanName = "humanName",
  ID = "id"
}

class Settings {
  async get(key: string) {
    let result = await SettingModel.find({ key });
    if(result && result[0]) return result[0].value;
  }

  async set(key: string, value: any) {
    await SettingModel.updateOne({ key }, { key, value }, { upsert: true });
  }

  async getPrefix() {
    if(!Database.instance.ready) return DEFAULT_PREFIX;
    let result = await Database.instance.Settings.get("prefix");
    return result || DEFAULT_PREFIX;
  }
}

class RoleMap {
  async get(findBy: RoleFindBy, value: string) {
    let query = {};
    query[findBy] = value;

    let result = await RoleMapModel.find(query);
    if(result && result[0]) return result[0];
  }

  // Может быть потом будет реализован метод создания маппинга для роли
}

/* Thanks to zziger for good advices
 * 
 * Oh shit, I'm sorry.
 * Sorry for what? Our daddy taught us not to be ashamed of our classes.
 *   Especially since they're using great patterns and all.
 * Yeah, i see that. Your daddy gave you good advice.
 */

class Database {
  private static _instance: Database;
  private _ready = false;

  db = connection;
  Settings: Settings;
  RoleMap: RoleMap;

  constructor(url?: string) {
    if(Database._instance) return Database._instance;
    Database._instance = this;

    if(!url) {
      return Database._instance;
    }

    connect(url, {
      useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
    });

    this.Settings = new Settings();
    this.RoleMap = new RoleMap();

    this.db.on("error", e => {
      console.log(format("db.connectOk"));
      console.error(e);
    })

    this.db.once("open", async () => {
      console.log(format("db.connectFail"));
      this._ready = true;
    });
  }

  get ready() {
    return this._ready;
  }

  static get instance() {
    return this._instance;
  }
}

export { Database, RoleFindBy };

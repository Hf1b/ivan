import * as mongoose from "mongoose";
import SettingModel from "./models/Setting.model";

class Settings {
  async get(key: string) {
    let result = await SettingModel.find({ key });
    if(result[0]) return result[0].value;
  }

  async set(key: string, value: any) {
    await SettingModel.updateOne({ key }, { value }, { upsert: true });
  }
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

  db = mongoose.connection;
  Settings: Settings;

  constructor(url?: string) {
    if(Database._instance) return Database._instance;
    Database._instance = this;

    if(!url) {
      return Database._instance;
    }

    mongoose.connect(url, {
      useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
    });

    this.Settings = new Settings();

    this.db.on("error", e => {
      console.log("Ошибка при подключении к БД.");
      console.error(e);
    })

    this.db.once("open", async () => {
      console.log("Успешное подключение к БД.")
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

export { Database };

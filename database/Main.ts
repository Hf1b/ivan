import * as mongoose from "mongoose";
import SettingModel from "./models/Setting.model";

let curr: number = 0;

class _Settings {
  data = {};

  async get(key: string) {
    let result = await SettingModel.find({ key });
    if(result[0]) return result[0].value;
  }

  async set(key: string, value: any) {
    await SettingModel.updateOne({ key }, { value }, { upsert: true });
  }
  
}

class _Database {
  ready = false;

  db = mongoose.connection;
  Settings: _Settings;

  constructor(url: string) {
    mongoose.connect(url, {
      useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
    });
    this.Settings = new _Settings();

    this.db.on("error", e => {
      console.log("Ошибка при подключении к БД.");
      console.error(e);
    })

    this.db.once("open", async () => {
      console.log("Успешное подключение к БД.")
      this.ready = true;
    });
  }
}

let Database: _Database;

const setup_db = url => {
  Database = new _Database(url);
}

export { Database, setup_db };

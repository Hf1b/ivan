import axios from "axios";

class Pixabay {
  private static _instance;
  private _ready = false;

  private Endpoint = "https://pixabay.com/api/";
  private Key: string;

  constructor(key?: string) {
    if(Pixabay._instance) return Pixabay._instance;
    Pixabay._instance = this;

    if(!key) {
      return Pixabay._instance
    }
    this.Key = key;

    this._ready = true;
  }

  async getImages(query?: string) {
    let response = await axios.get(this.Endpoint, { params: {
      key: this.Key,
      q: query,
      per_page: 100
    } });

    return response.data;
  }

  get ready() {
    return this._ready;
  }

  static get instance(): Pixabay {
    return this._instance;
  }
}

export { Pixabay };

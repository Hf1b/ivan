import axios from "axios";

const ENDPOINT = "https://pixabay.com/api/";

let PIXA_KEY: string;

let get_images = async (query: string) => {
  if(!PIXA_KEY) return;

  let response = await axios.get(ENDPOINT, { params: {
    key: PIXA_KEY,
    q: query,
    per_page: 100
  } });

  return response.data;
}

let setup_pixabay = (key: string) => {
  PIXA_KEY = key;
}

let ready_pixabay = () => {
  return !!PIXA_KEY;
}

export { get_images, setup_pixabay, ready_pixabay };

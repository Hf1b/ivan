import * as Strings from "./strings.json";

const formatRegex = /{(\d+)}/g;

const random_item = (arr) => {
  return arr[Math.floor((Math.random() * arr.length))];
}

const noop = () => {};

const format = (str: string, ...args: any) => {
  if(Strings[str]) str = Strings[str];

  return str.replace(formatRegex, (_, id) => {
    return (args[id] != undefined) ? args[id] : "???";
  })
}

export { random_item, noop, format };

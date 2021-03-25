const random_item = (arr) => {
  return arr[Math.floor((Math.random() * arr.length))];
}

const noop = () => {};

export { random_item, noop };

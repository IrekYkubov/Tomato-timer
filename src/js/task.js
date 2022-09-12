export class Task {
  #name;
  #count;
  #id;
  constructor(name, count = 0) {
    this.#name = name;
    this.#count = count;
    this.#id = Math.floor(Math.random() * 10e5);
  }

  plusCounter() {
    return this.#count += 1;
  }

  newName(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
  get count() {
    return this.#count;
  }
  get id() {
    return this.#id;
  }
}
export class Task {
  #name;
  #count;
  #id;
  #important;
  constructor(name, count = 0, importance) {
    this.#name = name;
    this.#count = count;
    this.#important = importance;
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
  get important() {
    return this.#important;
  }
  get id() {
    return this.#id;
  }
}

class importantTask extends Task {
  constructor (importance) {
    this.importance = importance;
  }
}

class standartTask extends Task {
  constructor (importance) {
    this.importance = importance;
  }
}

class simpleTask extends Task {
  constructor (importance) {
    this.importance = importance;
  }
}
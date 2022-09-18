import { Task } from './task';
let instance;
export class Timer {
  #taskItem = [];
  #activeTask = [];
  constructor(param) {
    if (instance) return instance;
    instance = this;
    this.param = param;
  }
  get taskItem() {
    return this.#taskItem;
  }
  get activeTask() {
    return this.#activeTask;
  }
  init() {
    console.log(this.param);
    this.startGenerate();
    console.log(this.#taskItem);
  }

  startGenerate() {
    for (const optionTask of this.param) {
      optionTask.time ? optionTask.time : optionTask.time = 25;
      optionTask.pause ? optionTask.pause : optionTask.pause = 5;
      optionTask.bigPause ? optionTask.bigPause : optionTask.bigPause = 15;
      for (let i = 0; i < optionTask.task.length; i++) {
        this.#taskItem.push(new Task(optionTask.task[i], optionTask.time, optionTask.importance));
      }
    }
  }

  addTask(time = 25, pause = 5, bigPause = 15, arrTask = []) {
    for (let index = 0; index < arrTask.length; index++) {
      this.#taskItem.push(new Task(arrTask[index], time));
    }
  }
  addActive(id) {
    const task = this.#taskItem.find(item => item.id === id);
    this.#activeTask.push(task);
  }
  startTime() {
    const timerid = setInterval(() => {
      if (this.#activeTask.length !== 0) {
        this.#activeTask.time -= 1;
        if (this.#activeTask.time <= 0) {
          clearInterval(timerid);
          const timerPause = setInterval(() => {
            if (this.#activeTask.pause !== 0) {
              this.#activeTask.pause -= 1;
              if (this.#activeTask.time <= 0) {
                clearInterval(timerPause);
              }
            }
          },1000);
        }
      }}, 1000);
  }

}

import { Tomato } from './tomato.js';
import { ImportantTask } from './task.js';
import { DefaultTask } from './task.js';
import { SosoTask } from './task.js';

export class ConrollerTomato {
    statusTimer = false;
    constructor() {

    }

    static setEventListenerToStart(btnStart) {
        btnStart.addEventListener('click', () => {
            if(this.statusTimer != true) {
                const tomato = new Tomato();
                tomato.runTimer();
            }
            this.statusTimer = true;
        });
    }

    static setEventListenerToStop(btnStop) {
        btnStop.addEventListener('click', () => {
            if(this.statusTimer != false) {
                const tomato = new Tomato();
                tomato.stopTimer();
            }
            this.statusTimer = false;
        });
    }

    static switchImportance(importance) {
        if (importance === 'default')
            return 'important';
        if (importance === 'important')
            return 'so-so';
        if (importance === 'so-so')
            return 'default';
    }

    static setEventListenerToChooseImportance(chooseImportance) {
        chooseImportance.addEventListener('click', ({ target }) => {
            const importance = target.classList[2];
            target.classList.remove(importance);

            const swichedImportance = this.switchImportance(importance);
            target.classList.add(swichedImportance);
            window.importance = swichedImportance;
        });
    }

    static setEventListenerToAddTaskForm(addTaskForm) {
        addTaskForm.addEventListener('submit', e => {
            e.preventDefault();
            const formData = Object.fromEntries(new FormData(e.target));
            const tomato = new Tomato();
            let task;
            switch (window.importance) {
                case 'important': task = new ImportantTask(formData.taskName); break;
                case 'default': task = new DefaultTask(formData.taskName); break;
                case 'so-so': task = new SosoTask(formData.taskName); break;
            }

            console.log(task);
            tomato.addTask(task);
            addTaskForm.reset();
        });
    }

    static setEventListenerToTaskList(taskList) {
        taskList.addEventListener('click', ({ target }) => {

            if (target.classList.contains('burger-popup__edit-button')) {
                console.log('Редактировать')
            }

            if (target.classList.contains('pomodoro-tasks__task-button')) {
                const burgerBtn = target.parentElement.querySelector('.burger-popup');
                burgerBtn.classList.add('burger-popup_active');
            }

            if (target.classList.contains('burger-popup__delete-button')) {
                const modalOverlay = target.parentElement;
                modalOverlay.style.display = 'none';
                modalOverlay.parentElement.remove();
            }

            if (target.classList.contains('pomodoro-tasks__task-text')) {
                this.clearChoosenTasks();

                target.classList.add('pomodoro-tasks__task-text_active');
                const windowPanelTitle = document.querySelector('.window__panel-title');
                windowPanelTitle.textContent = target.textContent;

                const tomato = new Tomato();
                tomato.activateTask(target.getAttribute('id'));
            }
        });
    }

    static clearChoosenTasks() {
        const taskTexts = document.querySelectorAll('.pomodoro-tasks__task-text');
        taskTexts.forEach(item => {
            item.classList.remove('pomodoro-tasks__task-text_active');
        });
    }
}
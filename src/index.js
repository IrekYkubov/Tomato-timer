import './scss/index.scss';
import main from './js/main';
import { Timer } from './js/timer'


const timer = new Timer([{time: 20, pause: 5, bigPause: 15, task : ['Решить задачу', 'Отправить на платформу']}]);
timer.init();
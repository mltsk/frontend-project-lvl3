import 'bootstrap';
import './css/style.css';
import i18next from 'i18next';
import validate from './validator.js';
import initView from './view.js';
import timer from './timer.js';
import resources from './locales/index.js';

const init = () => document.addEventListener('DOMContentLoaded', () => {
  const state = {
    urls: [],
    form: {
      status: null,
      input: {
        feedback: null,
        isValid: null,
      },
    },
    feeds: [],
    posts: [],
  };

  i18next.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru: {
        translation: resources(),
      },
    },
  });

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('.form-control'),
    feedback: document.querySelector('.feedback'),
    posts: document.querySelector('.posts'),
    feeds: document.querySelector('.feeds'),
    button: document.querySelector("[aria-label='add']"),
    previewBtn: document.querySelectorAll("[data-bs-target='#modal']"),
    modalTitle: document.querySelector('.modal-title'),
    modalBody: document.querySelector('.modal-body'),
  };

  const watched = initView(state, elements);

  timer(watched);

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    watched.form.input.feedback = null;
    const formData = new FormData(event.target);
    const url = formData.get('url');
    validate(url, watched);
  });
});

init();

export default init;

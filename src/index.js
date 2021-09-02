import 'bootstrap';
import './style.css';
import validate from './validator.js';
import initView from './view.js';
import timer from './timer.js';

const state = {
  urls: [],
  form: {
    status: 'filling',
    input: {
      error: null,
    },
  },
  feeds: [],
  posts: [],
};

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
  watched.form.input.error = null;
  const formData = new FormData(event.target);
  const url = formData.get('url');
  validate(url, watched);
});

// @ts-check

import 'bootstrap';
import './style.css';
import validate from './validator.js';
import initView from './view.js';
import parse from './parser.js';

const state = {
  urls: [],
  form: {
    status: 'filling',
    url: {
      valid: true,
      error: null,
    },
  },
};

const elements = {
  form: document.querySelector('.rss-form'),
  input: document.querySelector('.form-control'),
  feedback: document.querySelector('.feedback'),
  posts: document.querySelector('.posts'),
  feeds: document.querySelector('.feeds'),
};

parse();

const watched = initView(state, elements);

elements.form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const url = formData.get('url');
  validate(url, watched);
});

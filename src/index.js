// @ts-check

import 'bootstrap';
import './style.css';
import validate from './validator.js';
import initView from './view.js';

const state = {
  url: '',
  isUrlValid: true,
  isRssUniq: true,
  isRssValid: true,
  urls: [],
};

const elements = {
  form: document.querySelector('.rss-form'),
  input: document.querySelector('.form-control'),
  feedback: document.querySelector('.feedback'),
};

const watched = initView(state, elements);

elements.form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const url = formData.get('url');
  validate(url, watched);
});

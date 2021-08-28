// @ts-check

import 'bootstrap';
import './style.css';
import validate from './validator.js';
import initView from './view.js';
import _ from 'lodash';

const state = {
  urls: [],
  form: {
    status: 'filling',
    input: {
      url: null,
      valid: true,
      error: null,
    },
  },
};

const feed = [];
const posts = [];

const elements = {
  form: document.querySelector('.rss-form'),
  input: document.querySelector('.form-control'),
  feedback: document.querySelector('.feedback'),
  posts: document.querySelector('.posts'),
  feeds: document.querySelector('.feeds'),
};

const watched = initView(state, elements, feed, posts);

elements.form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const url = formData.get('url');
  validate(url, watched);
//   console.log('state.form.url.link: ', state.form.url.link);
});


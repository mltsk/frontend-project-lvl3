import 'bootstrap';
import validate from './validator.js';
import initView from './view.js';

const runApp = () => {
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

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('.form-control'),
    feedback: document.querySelector('.feedback'),
    posts: document.querySelector('.posts'),
    feeds: document.querySelector('.feeds'),
    button: document.querySelector("[aria-label='add']"),
    modalTitle: document.querySelector('.modal-title'),
    modalBody: document.querySelector('.modal-body'),
    fullArticleButton: document.querySelector('.full-article'),
  };

  const watched = initView(state, elements);

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    watched.form.input.feedback = null;
    const formData = new FormData(event.target);
    const url = formData.get('url');
    validate(url, watched);
  });
};

export default runApp;

import 'bootstrap';
import i18n from 'i18next';
import validate from './validator.js';
import initView from './view.js';
import getRss from './getRss.js';
import ru from './locales/ru.js';

const runApp = () => {
  const state = {
    urls: [],
    feeds: [],
    posts: [],
    networkStatus: null,
    readIds: new Set(),
    modalId: null,
    form: {
      status: 'filling',
      input: {
        feedback: null,
        isValid: null,
      },
    },
  };

  const i18next = i18n.createInstance();
  i18next.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru: {
        translation: ru,
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
    modalTitle: document.querySelector('.modal-title'),
    modalBody: document.querySelector('.modal-body'),
    fullArticleButton: document.querySelector('.full-article'),
  };

  const watched = initView(state, elements, i18next);

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    watched.form.input.feedback = null;
    const formData = new FormData(event.target);
    const url = formData.get('url');
    const urlsList = state.urls;
    validate(url, urlsList)
      .then((error) => {
        const isValid = error === null;
        watched.form.input.isValid = isValid;
        watched.form.input.feedback = error;
        if (isValid) getRss(watched, url);
      });
  });

  elements.posts.addEventListener('click', (event) => {
    const idTarget = event.target.dataset.id;
    watched.readIds.add(idTarget);
    if (idTarget) {
      watched.modalId = idTarget;
    }
  });
};

export default runApp;

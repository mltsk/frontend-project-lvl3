import onChange from 'on-change';
import i18next from 'i18next';
import i18nInit from './i18n.js';
import getRss from './getRss.js';

i18nInit();

const renderError = (state, elements) => {
  if (state.form.input.valid === false) {
    elements.input.classList.add('is-invalid');
    elements.feedback.classList.add('text-danger');
    elements.feedback.classList.remove('text-success');
    elements.feedback.textContent = i18next.t(state.form.input.error);
  }
};

const renderSuccess = (state, elements) => {
  elements.input.classList.remove('is-invalid');
  elements.feedback.classList.remove('text-danger');
  elements.feedback.classList.add('text-success');
  elements.feedback.textContent = i18next.t('rssIsValid');
  elements.form.reset();
  elements.input.focus();
  state.form.input.url = null;
};

const renderFeed = (feed, elements) => {
  elements.feeds.innerHTML = '';
  const divCard = document.createElement('div');
  divCard.classList.add('card', 'border-0');
  const divCardBody = document.createElement('div');
  divCardBody.classList.add('card-body');
  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = 'Фиды';
  divCard.append(divCardBody);
  divCardBody.append(h2);

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  feed.forEach((el) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = el.title;
    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = el.description;
    li.append(h3, p);
    ul.append(li);
  });

  divCard.append(ul);
  elements.feeds.append(divCard);
};

const renderPost = (posts, elements) => {
  elements.posts.innerHTML = '';
  const divCard = document.createElement('div');
  divCard.classList.add('card', 'border-0');
  const divCardBody = document.createElement('div');
  divCardBody.classList.add('card-body');
  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = 'Посты';
  divCard.append(divCardBody);
  divCardBody.append(h2);

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  posts.forEach((el) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const a = document.createElement('a');
    a.classList.add('fw-bold');
    a.textContent = el.title;
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    a.dataset.id = el.id;
    a.href = el.link;

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.textContent = 'Просмотр';
    button.setAttribute('type', 'button');
    button.dataset.bsTarget = '#modal';
    button.dataset.bsToggle = 'modal';
    button.dataset.id = el.id;
    button.href = el.link;

    li.append(a, button);
    ul.append(li);
  });

  divCard.append(ul);
  elements.posts.append(divCard);
};

const initView = (state, elements, feed, posts) => {
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'form.input.url':
        if (value !== null && state.form.input.valid === true) {
          getRss(watchedState, feed, posts);
        }
        break;
      case 'form.input.error':
        renderError(state, elements);
        break;
      case 'form.status':
        if (value === 'loading') {
          elements.button.setAttribute('disabled', true);
        }
        if (value === 'failed') {
          elements.button.removeAttribute('disabled');
        }
        if (state.form.status === 'success') {
          elements.button.removeAttribute('disabled');
          renderSuccess(state, elements);
          renderFeed(feed, elements);
          renderPost(posts, elements);
        }
        break;
      // default:
      //   throw Error(`Unknown path: ${path}`);
    }
  });

  return watchedState;
};

export default initView;

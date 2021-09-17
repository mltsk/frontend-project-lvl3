import onChange from 'on-change';
import _ from 'lodash';

const renderFeedback = (feedback, elements, i18next) => {
  elements.feedback.textContent = i18next.t(feedback);
};

const renderFeedbackValidation = (isValid, elements) => {
  if (isValid) {
    elements.input.classList.remove('is-invalid');
    elements.feedback.classList.remove('text-danger');
    elements.feedback.classList.add('text-success');
  } else {
    elements.input.classList.add('is-invalid');
    elements.feedback.classList.add('text-danger');
    elements.feedback.classList.remove('text-success');
  }
};

const renderFeed = (feeds, elements, i18next) => {
  elements.feeds.innerHTML = '';
  const divCard = document.createElement('div');
  divCard.classList.add('card', 'border-0');
  const divCardBody = document.createElement('div');
  divCardBody.classList.add('card-body');
  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = i18next.t('Feeds');
  divCard.append(divCardBody);
  divCardBody.append(h2);

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  feeds.forEach((feed) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = feed.title;
    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = feed.description;
    li.append(h3, p);
    ul.append(li);
  });

  divCard.append(ul);
  elements.feeds.append(divCard);
};

const renderPost = (state, elements, i18next) => {
  const { posts } = state;
  elements.posts.innerHTML = '';
  const divCard = document.createElement('div');
  divCard.classList.add('card', 'border-0');
  const divCardBody = document.createElement('div');
  divCardBody.classList.add('card-body');
  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = i18next.t('Posts');
  divCard.append(divCardBody);
  divCardBody.append(h2);

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  posts.forEach((post) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const a = document.createElement('a');
    a.textContent = post.title;
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener', 'noreferrer');
    a.dataset.id = post.id;
    a.href = post.link;
    if (_.includes(state.readIds, post.id.toString())) {
      a.classList.add('fw-normal');
    } else {
      a.classList.add('fw-bold');
    }

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.textContent = 'Просмотр';
    button.setAttribute('type', 'button');
    button.dataset.bsTarget = '#modal';
    button.dataset.bsToggle = 'modal';
    button.dataset.id = post.id;
    button.href = post.link;

    li.append(a, button);
    ul.append(li);
  });

  divCard.append(ul);
  elements.posts.append(divCard);
};

const renderNetworkStatus = (networkStatus, elements) => {
  if (networkStatus === 'success') {
    elements.form.reset();
    elements.input.focus();
  }
};

const renderFormStatus = (formStatus, elements) => {
  switch (formStatus) {
    case 'readOnly':
      elements.button.setAttribute('disabled', true);
      elements.input.setAttribute('readOnly', true);
      break;
    case 'filling':
      elements.button.removeAttribute('disabled');
      elements.input.removeAttribute('readOnly');
      break;
    default:
      throw Error(`Unknown status: ${formStatus}`);
  }
};

const renderModal = (modal, elements) => {
  elements.modalTitle.textContent = modal.title;
  elements.modalBody.textContent = modal.description;
  elements.fullArticleButton.href = modal.link;
};

const initView = (state, elements, i18next) => {
  const mapping = {
    feeds: () => renderFeed(state.feeds, elements, i18next),
    posts: () => renderPost(state, elements, i18next),
    'form.input.feedback': () => renderFeedback(state.form.input.feedback, elements, i18next),
    'form.input.isValid': () => renderFeedbackValidation(state.form.input.isValid, elements),
    networkStatus: () => renderNetworkStatus(state.networkStatus, elements),
    'form.status': () => renderFormStatus(state.form.status, elements),
    readIds: () => renderPost(state, elements),
    modal: () => renderModal(state.modal, elements),
  };

  const watchedState = onChange(state, (path) => {
    if (mapping[path]) {
      mapping[path]();
    }
  });

  return watchedState;
};

export default initView;

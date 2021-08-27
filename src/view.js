import onChange from 'on-change';
import i18next from 'i18next';
import i18nInit from './i18n.js';

i18nInit();

const render = (state, elements) => {
  if (state.form.url.valid === false) {
    elements.input.classList.add('is-invalid');
    elements.feedback.classList.add('text-danger');
    elements.feedback.classList.remove('text-success');
    elements.feedback.textContent = i18next.t(state.form.url.error);
  } else {
    elements.input.classList.remove('is-invalid');
    elements.feedback.classList.remove('text-danger');
    elements.feedback.classList.add('text-success');
    elements.feedback.textContent = i18next.t('rssIsValid');
    elements.form.reset();
    elements.input.focus();
  }
};

const initView = (state, elements) => {
  const watchedState = onChange(state, () => {
    render(state, elements);
  });

  return watchedState;
};

export default initView;

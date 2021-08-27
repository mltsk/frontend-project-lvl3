import onChange from 'on-change';

const render = (state, elements) => {
  if (state.isUrlValid === false || state.isRssUniq === false || state.isRssValid === false) {
    elements.input.classList.add('is-invalid');
  } else {
    elements.input.classList.remove('is-invalid');
  }

  if (state.isUrlValid === false) {
    elements.feedback.classList.add('text-danger');
    elements.feedback.classList.remove('text-success');
    elements.feedback.textContent = 'Ссылка должна быть валидным URL';
  } else if (state.isRssUniq === false) {
    elements.feedback.classList.add('text-danger');
    elements.feedback.classList.remove('text-success');
    elements.feedback.textContent = 'RSS уже существует';
  } else if (state.isRssValid === false) {
    elements.feedback.classList.add('text-danger');
    elements.feedback.classList.remove('text-success');
    elements.feedback.textContent = 'Ресурс не содержит валидный RSS';
  } else {
    elements.feedback.classList.remove('text-danger');
    elements.feedback.classList.add('text-success');
    elements.feedback.textContent = 'RSS успешно загружен';
    elements.form.reset();
    elements.input.focus();
  }
};

const initView = (state, elements) => {
  const watchedState = onChange(state, () => {
    render(state, elements);

    if (state.isUrlValid && state.isRssUniq && state.isRssValid) {
      state.urls.push(state.url);
    }
  });

  return watchedState;
};

export default initView;

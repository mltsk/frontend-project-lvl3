import onChange from 'on-change';
import i18next from 'i18next';
import i18nInit from './i18n.js';
import getRss from './getRss.js';

i18nInit();

const render = (state, elements) => {
  if (state.form.input.valid === false) {
    elements.input.classList.add('is-invalid');
    elements.feedback.classList.add('text-danger');
    elements.feedback.classList.remove('text-success');
    elements.feedback.textContent = i18next.t(state.form.input.error);
  } 
//   else {
//     elements.input.classList.remove('is-invalid');
//     elements.feedback.classList.remove('text-danger');
//     elements.feedback.classList.add('text-success');
//     elements.feedback.textContent = i18next.t('rssIsValid');
//     elements.form.reset();
//     elements.input.focus();
//   }
};

const initView = (state, elements, feed, posts) => {
  const watchedState = onChange(state, (path, value) => {
    //   console.log('path: ', path);
      switch(path) {
        case 'form.input.error':
            render(state, elements);
            break;
        case 'form.input.url':
            if (value !== null) {
                console.log(123);
                if(state.form.input.valid === true) {
                    getRss(watchedState, feed, posts);
                }
            }
            break;
        case 'urls':
            
            break;
        case 'form.status':
            if(state.form.status === 'success') {
                elements.input.classList.remove('is-invalid');
                elements.feedback.classList.remove('text-danger');
                elements.feedback.classList.add('text-success');
                elements.feedback.textContent = i18next.t('rssIsValid');
                elements.form.reset();
                elements.input.focus();
            } else if(state.form.status === 'failed') {
                state.form.input.error = 'rssIsNotValid';
                elements.input.classList.add('is-invalid');
                elements.feedback.classList.add('text-danger');
                elements.feedback.classList.remove('text-success');
                elements.feedback.textContent = i18next.t('rssIsNotValid');
            }
            console.log('value: ', value);
            break;
      }
    
  });

  return watchedState;
};

export default initView;

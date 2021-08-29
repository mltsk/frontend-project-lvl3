import * as yup from 'yup';
import getRss from './getRss.js';

yup.setLocale({
  mixed: {
    default: 'field_invalid',
    notOneOf: 'rssAlreadyExists',
  },
  string: {
    url: 'urlIsNotValid',
  },
});

const validate = (url, state) => {
  const schema = yup.object().shape({
    url: yup.string().url().notOneOf(state.urls),
  });
  schema.validate({ url })
    .then(() => {
      state.form.input.error = null;
      getRss(state, url);
    })
    .catch((err) => {
      const error = err.errors[0];
      state.form.input.error = error;
    });
};

export default validate;

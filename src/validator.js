import * as yup from 'yup';
import getRss from './getRss.js';

yup.setLocale({
  mixed: {
    default: 'field_invalid',
    notOneOf: 'RSS already exists',
  },
  string: {
    url: 'URL is not valid',
    min: 'Should not be empty'
  },
});

const validate = (url, state) => {
  const schema = yup.object().shape({
    url: yup.string().url().min(1).notOneOf(state.urls),
  });
  schema.validate({ url })
    .then(() => {
      state.form.input.feedback = null;
      state.form.input.isValid = true;
      getRss(state, url);
    })
    .catch((err) => {
      const error = err.errors[0];
      state.form.input.feedback = error;
      state.form.input.isValid = false;
    });
};

export default validate;

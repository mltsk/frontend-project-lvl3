import * as yup from 'yup';

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
      state.form.input.valid = true;
      state.form.input.error = null;
    })
    .catch((err) => {
      const error = err.errors[0];
      state.form.input.valid = false;
      state.form.input.error = error;
    })
    .then(() => {
      state.form.input.url = url;
    });
};

export default validate;

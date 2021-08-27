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
      state.urls.push(url);
      state.form.url.valid = true;
      state.form.url.error = null;
    })
    .catch((err) => {
      const error = err.errors[0];
      state.form.url.valid = false;
      state.form.url.error = error;
    });
};

export default validate;

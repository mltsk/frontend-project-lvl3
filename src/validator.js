import * as yup from 'yup';

yup.setLocale({
  mixed: {
    default: 'field_invalid',
    notOneOf: 'RSS already exists',
  },
  string: {
    url: 'URL is not valid',
    min: 'Should not be empty',
  },
});

const validate = (url, urlsList) => {
  const schema = yup.object().shape({
    url: yup.string().url().min(1).notOneOf(urlsList),
  });
  return schema.validate({ url })
    .then(() => null)
    .catch((err) => {
      const error = err.errors[0];
      return error;
    });
};

export default validate;

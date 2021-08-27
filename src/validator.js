import * as yup from 'yup';

const schema = yup.object().shape({
  url: yup.string().url(),
});

// check validity
const validate = (url, state) => {
  schema
    .isValid({
      url,
    })
    .then((valid) => {
      state.isUrlValid = valid;
    })
    .then(() => {
      state.isRssUniq = !state.urls.includes(url);
    })
    .then(() => {
      state.url = url;
    });
};

export default validate;

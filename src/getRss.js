import axios from 'axios';
import _ from 'lodash';
import onChange from 'on-change';
import parse from './parser.js';

const addIds = (obj) => {
  [obj].flat().forEach((item) => {
    item.id = _.uniqueId();
  });
  return obj;
};

const getData = (url) => {
  const proxy = 'https://hexlet-allorigins.herokuapp.com/get?disableCache=true';
  return axios.get(`${proxy}&url=${encodeURIComponent(url)}`)
    .then((response) => response.data);
};

const updatePosts = (state) => {
  setTimeout(() => {
    if (state.urls.length) {
      state.urls.forEach((url) => {
        getData(url)
          .then((data) => {
            const { contents } = data;
            const rss = parse(contents);
            const { posts } = rss;
            const oldPosts = onChange.target(state).posts;
            const newPosts = _.xorBy(oldPosts, [...oldPosts, ...posts], 'link');
            if (newPosts.length) {
              state.posts.unshift(addIds(...newPosts));
            }
          })
          .finally(() => {
            updatePosts(state);
          });
      });
    }
  }, 5000);
};

const getRss = (state, url) => {
  state.networkStatus = 'loading';
  state.form.status = 'readOnly';
  getData(url)
    .then((data) => {
      const { contents } = data;
      const rss = parse(contents);
      state.feeds.unshift(addIds(rss.feed));
      state.posts.unshift(...addIds(rss.posts));
      state.urls.push(url);
      state.form.input.feedback = 'RSS is valid';
      state.form.input.isValid = true;
      state.networkStatus = 'success';
      state.form.status = 'filling';
      updatePosts(state);
    })
    .catch((error) => {
      state.networkStatus = 'failed';
      state.form.status = 'filling';
      state.form.input.feedback = error.message;
      state.form.input.isValid = false;
    });
};

export default getRss;

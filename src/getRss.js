import axios from 'axios';
import _ from 'lodash';
import onChange from 'on-change';
import parse from './parser.js';

const addPostsIds = (posts) => {
  posts.forEach((post) => {
    post.id = _.uniqueId();
  });
  return posts;
};

const addFeedId = (feed) => {
  feed.id = _.uniqueId();
  return feed;
};

const getHref = (url) => {
  const newUrl = new URL('https://hexlet-allorigins.herokuapp.com/get');
  newUrl.searchParams.set('disableCache', 'true');
  newUrl.searchParams.set('url', url);
  return (newUrl.href);
};

const getData = (url) => {
  const href = getHref(url);
  return axios.get(href)
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
              state.posts.unshift(...addPostsIds(newPosts));
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
      state.feeds.unshift(addFeedId(rss.feed));
      state.posts.unshift(...addPostsIds(rss.posts));
      state.urls.push(url);
      state.form.input.feedback = 'RSS is valid';
      state.form.input.isValid = true;
      state.networkStatus = 'success';
      state.form.status = 'filling';
      updatePosts(state);
    })
    .catch((error) => {
      if (error.isAxiosError) {
        state.form.input.feedback = 'Network Error';
      } else if (error.isParserError) {
        state.form.input.feedback = 'Error parsing XML';
      }
      state.networkStatus = 'failed';
      state.form.status = 'filling';
      state.form.input.isValid = false;
    });
};

export default getRss;

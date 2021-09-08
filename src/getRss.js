import axios from 'axios';
import _ from 'lodash';
import parse from './parser.js';

const getPosts = (rss, feedId, id) => {
  const rssPosts = [];
  Object.values(rss).forEach((item) => {
    if (item.nodeName === 'item') {
      const post = {};
      post.id = id();
      post.status = 'unread';
      post.feedId = feedId;
      post.title = item.children[0].textContent;
      post.link = item.children[2].textContent;
      post.description = item.children[3].textContent;
      rssPosts.push(post);
    }
  });
  return rssPosts;
};

const getFeed = (rss, feedId, url) => {
  const rssFeed = {};
  Object.values(rss).forEach((item) => {
    if (item.nodeName === 'title') {
      rssFeed.url = url;
      rssFeed.id = feedId;
      rssFeed.title = item.textContent;
    }
    if (item.nodeName === 'description') {
      rssFeed.description = item.textContent;
    }
  });
  return rssFeed;
};

const getData = (url) => {
  const proxy = 'https://hexlet-allorigins.herokuapp.com/get?disableCache=true';
  return axios.get(`${proxy}&url=${encodeURIComponent(url)}`)
    .then((response) => response.data);
};

const updatePosts = (state) => {
  setTimeout(() => {
    if (state.feeds.length) {
      state.feeds.forEach(({ url, id }) => {
        getData(url)
          .then((data) => {
            const { contents } = data;
            const rss = parse(contents);
            const posts = getPosts(rss, id, () => null);
            const newPosts = _.uniqBy([...state.posts, ...posts], 'link')
              .filter((post) => (post.id === null));
            if (newPosts.length) {
              newPosts.map((newPost) => {
                newPost.id = _.uniqueId();
                return newPost;
              });
              state.posts.unshift(...newPosts);
            }
            updatePosts(state);
          })
          .catch(() => {
            updatePosts(state);
          });
      });
    }
  }, 5000);
};

const getRss = (state, url) => {
  state.form.status = 'loading';
  getData(url)
    .then((data) => {
      const { contents } = data;
      const rss = parse(contents);
      const feedId = _.uniqueId();
      state.feeds.unshift(getFeed(rss, feedId, url));
      state.posts.unshift(...getPosts(rss, feedId, _.uniqueId));
      state.urls.push(url);
      state.form.input.feedback = 'RSS is valid';
      state.form.input.isValid = true;
      state.form.status = 'success';
      updatePosts(state);
    })
    .catch((error) => {
      state.form.status = 'failed';
      state.form.input.feedback = error.message;
      state.form.input.isValid = false;
    });
};

export default getRss;

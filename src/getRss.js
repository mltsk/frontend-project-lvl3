import axios from 'axios';
import _ from 'lodash';
import parse from './parser.js';

const getPosts = (rss, feedId, id) => {
  const rssPosts = [];
  Object.values(rss).forEach((item) => {
    if (item.nodeName === 'item') {
      const post = {};
      post.id = id();
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

const getRss = (state, url) => {
  state.form.status = 'loading';
  axios.get(`https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then((response) => {
      const { contents } = response.data;
      return contents;
    })
    .then((contents) => {
      const rss = parse(contents);
      const feedId = _.uniqueId();
      state.feeds.unshift(getFeed(rss, feedId, url));
      state.posts.unshift(...getPosts(rss, feedId, _.uniqueId));
      state.urls.push(url);
      state.form.input.error = false;
      state.form.status = 'success';
    })
    .catch((error) => {
      state.form.status = 'failed';
      state.form.input.error = error.message;
    });
};

export default getRss;

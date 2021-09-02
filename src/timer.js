import axios from 'axios';
import _ from 'lodash';
import parse from './parser.js';

const getData = (url) => axios.get(`https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${encodeURIComponent(url)}`)
  .then((response) => response.data);

const getRss = (data) => parse(data);

const getPosts = (rss, feedId) => {
  const rssPosts = [];
  Object.values(rss).forEach((item) => {
    if (item.nodeName === 'item') {
      const post = {};
      post.feedId = feedId;
      post.status = 'unread';
      post.title = item.children[0].textContent;
      post.link = item.children[2].textContent;
      post.description = item.children[3].textContent;
      rssPosts.push(post);
    }
  });
  return rssPosts;
};

const timer = (state) => {
  setTimeout(() => {
    if (state.feeds.length !== 0) {
      state.feeds.forEach(({ url, id }) => {
        getData(url)
          .then((data) => getRss(data.contents))
          .then((rss) => {
            const posts = getPosts(rss, id);
            const newPosts = _.uniqBy([...state.posts, ...posts], 'link')
              .filter((post) => (post.id === undefined));
            if (newPosts.length !== 0) {
              newPosts.map((newPost) => {
                newPost.id = _.uniqueId();
                return newPost;
              });
              state.posts.unshift(...newPosts);
            }
          });
      });
    }
    timer(state);
  }, 5000);
};

export default timer;

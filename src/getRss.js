import parse from './parser.js';
import axios from 'axios';

const getFeed = (rss, feed, posts, state) => {
    const rssFeed = {};
    const rssPosts = [];
    const feedId = _.uniqueId();
    Object.values(rss).forEach(item => {
        if (item.nodeName === 'title') {
            rssFeed.id = feedId;
            rssFeed.title = item.textContent;
        }
        if (item.nodeName === 'description') {
            rssFeed.description = item.textContent;
        }
        if (item.nodeName === 'item') {
            rssPosts.push(getPosts(item, feedId));
        }

    })
    feed.push(rssFeed);
    posts.push(...rssPosts);
}

const getPosts = (item, feedId) => {
    const post = {};
    post.id = _.uniqueId();
    post.feedId = feedId;
    post.title = item.children[0].textContent;
    post.link = item.children[2].textContent;
    post.description = item.children[3].textContent;
    return post;
}

const getRss = (state, feed, posts) => {
    const url = state.form.input.url;
    state.form.status = 'loading';
    axios.get(`https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${url}`)
        .then((response) => {
        const contents = response.data.contents;
        const rss = parse(contents);
        console.log('rss: ', rss);
        getFeed(rss, feed, posts, state)
        
        console.log('feed: ', feed);
        console.log('posts: ', posts);
        state.urls.push(url);
        state.form.status = 'success';
        state.form.input.url = null;
    })
    .catch((error) => {
        state.form.status = 'failed';
        // state.form.input.error = 'rssIsNotValid';
        console.log('error231', error);
    });
}

export default getRss;
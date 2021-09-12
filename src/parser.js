const parse = (contents) => {
  const rssData = {
    feed: {},
    posts: [],
  };
  const parser = new DOMParser();
  const data = parser.parseFromString(contents, 'application/xml');
  if (data.querySelector('parsererror')) {
    throw new Error('Error parsing XML');
  }
  const rss = data.children[0].children[0].children;
  Object.values(rss).forEach((item) => {
    if (item.nodeName === 'title') {
      rssData.feed.title = item.textContent;
    } else if (item.nodeName === 'description') {
      rssData.feed.description = item.textContent;
    } else if (item.nodeName === 'item') {
      const post = {};
      post.status = 'unread';
      post.title = item.children[0].textContent;
      post.link = item.children[2].textContent;
      post.description = item.children[3].textContent;
      rssData.posts.push(post);
    }
  });
  return rssData;
}

export default parse;

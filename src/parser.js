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
  const title = data.querySelector('channel > title');
  const description = data.querySelector('channel > description');
  const items = data.querySelectorAll('item');

  rssData.feed.title = title.textContent;
  rssData.feed.description = description.textContent;

  Object.values(items).forEach((item) => {
    const post = {};
    post.title = item.querySelector('title').textContent;
    post.link = item.querySelector('link').textContent;
    post.description = item.querySelector('description').textContent;
    rssData.posts.push(post);
  });
  return rssData;
};

export default parse;

import axios from "axios";

const parser = new DOMParser();

const parse = (elements) => {
    axios.get('https://ru.hexlet.io/lessons.rss')
    .then(function (response) {
      console.log(response.data);
      const doc1 = parser.parseFromString(response.data, "application/xml");
    //   elements.posts.innerHTML = doc1;
    //   elements.posts.append(doc1);
    const rss = doc1.children[0].children[0].children
      console.log('rss: ', rss);

      Object.values(rss).forEach(item => {
          console.log(1, item.nodeName);
      })
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}

export default parse;

function parse(contents) {
  const parser = new DOMParser();
  const data = parser.parseFromString(contents, 'application/xml');
  if (data.getElementsByTagName('parsererror').length > 0) {
    throw new Error('Error parsing XML');
  }
  return data.children[0].children[0].children;
}

export default parse;

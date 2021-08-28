// const parse = (contents) => {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(contents, 'application/xml');
//     console.log('doc: ', doc);
//     const rss = doc.children[0].children[0].children;
//     return rss;
// }

function parse(contents) {
    const parser = new DOMParser();
    const parsererrorNS = parser.parseFromString('INVALID', 'application/xml').getElementsByTagName("parsererror")[0].namespaceURI;
    const dom = parser.parseFromString(contents, 'application/xml');
    if(dom.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0) {
        throw new Error('Error parsing XML');
    }
    return dom.children[0].children[0].children;
}

export default parse;
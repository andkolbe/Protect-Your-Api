export default require(`./${process.env.NODE_ENV}`).default;
// NODE_ENV is a very common environment variable that will be filled in as the value development 
// or the value production depending on if you are doing a npm run dev or a npm run start
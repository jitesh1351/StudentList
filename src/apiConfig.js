const app_apis = {
  student: { relativePath: '/posts/1/comments' }
};

const INT_BASE = "https://jsonplaceholder.typicode.com";
/**
   * @desc getAPIBase, This function will create base URL
   * @return {string} apiBase url
   */
function getAPIBase() {

  return INT_BASE;
}
/**
   * @desc getAPIUrl, This function will create base URL
   * @param {string} api base url
   * @return {string} apiBase url
   */
export default function getAPIUrl(api) {
  const apiBase = getAPIBase();
  return apiBase + app_apis[api]['relativePath'];
}

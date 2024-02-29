/**
 * Request method
 * @param  {String} url
 * @param  {String} method='GET'
 */
const request = async (url: string, method = "GET") => {
  try {
    const response = await fetch(url, {
      method,
    });
    if (!response.ok) {
      throw response.status;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { exception: error };
  }
};

export default request;

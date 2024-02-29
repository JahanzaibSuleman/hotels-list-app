import request from "../utils/request";

export const getHotelsFromSource = async () => {
  const { SPACE_ID, ACCESS_TOKEN } = process.env;

  const apiUrl = `https://cdn.contentful.com/spaces/${SPACE_ID}/entries`;

  return await request(`${apiUrl}?access_token=${ACCESS_TOKEN}`);
};

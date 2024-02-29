import request from "../utils/request";

export const getHotels = async (skip: number) => {
  return await request(`http://localhost:3000/api?skip=${skip}&limit=1`);
};

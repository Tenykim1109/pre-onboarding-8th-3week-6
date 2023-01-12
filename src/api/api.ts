import axios from "axios";

export const base = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    cache: "no-store",
  },
});

export const searchAPI = {
  getSearch: (param: string) => base.get(`/sick?q=${param}`),
};

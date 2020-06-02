import axios from "axios";

// const API_URL = "http://server:8000";

export async function getExperiments(host, query) {
  const queryString = new URLSearchParams(query).toString() || "";
  const response = await axios.get(`${host}/experiments/?${queryString}`);
  const data = response.data;
  return data;
}

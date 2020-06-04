import axios from "axios";

export default async function (request) {
  const response = await axios(request || {});
  return response.data;
}

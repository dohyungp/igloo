import axios from "axios";

const API_URL = "http://server:8000";

const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

async function getExperiments(query) {
  let requestURL = `${API_URL}/experiments`;
  if (!isEmptyObject(query)) {
    let queryString = new URLSearchParams(query).toString();
    requestURL = `${API_URL}/experiments/?${queryString}`;
  }

  const response = await axios.get(requestURL);
  const data = response.data;
  return data;
}

export default async (req, res) => {
  let data = {};
  switch (req.method) {
    case "GET":
      data = await getExperiments(req.query);
      res.json(data);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

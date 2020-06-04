import axios from "axios";

const API_URL = "http://server:8000";

async function getExperimentDetail(query) {
  let requestURL = `${API_URL}/experiments/${query.id}`;
  const response = await axios.get(requestURL);
  const data = response.data;
  return data;
}

export default async (req, res) => {
  let data = {};
  switch (req.method) {
    case "GET":
      data = await getExperimentDetail(req.query);
      res.json(data);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

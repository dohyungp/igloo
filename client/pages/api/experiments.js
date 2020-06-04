import axios from "axios";

const API_URL = "http://server:8000";

export default async (req, res) => {
  console.log(req);
  const config = {
    url: `${API_URL}/experiments/`,
    method: req.method,
    params: req.query,
    data: req.body,
    headers: req.headers,
  };
  const response = await axios(config);

  res.json(response.data);
};

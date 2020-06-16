import axios from "axios";

const API_URL = "http://server:8000";

export default async (req, res) => {
  const config = {
    url: `${API_URL}/experiments/`,
    method: req.method,
    params: req.query,
    data: req.body,
  };
  const response = await axios(config);
  res.status(response.status).json(response.data);
};

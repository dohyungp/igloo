import axios from "axios";

const API_URL = "http://server:8000";

export default async (req, res) => {
  const response = await axios({
    url: `${API_URL}/experiment_status/${req.query.sid}/`,
    method: req.method,
    params: req.query,
    data: req.body,
  });
  res.json(response.data);
};

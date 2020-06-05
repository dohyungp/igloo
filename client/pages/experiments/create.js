import { useState } from "react";
import Link from "next/link";
import useRequest from "../../libs/useRequest";
import fetch from "../../libs/fetch";

const ExperimentCreatePage = () => {
  const [formData, updateFormData] = useState({});
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const { data: experimentStatus } = useRequest({
    url: "/api/status",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await fetch({
      method: "POST",
      url: "/api/experiments",
      data: formData,
    });
  };
  return (
    <div>
      <Link href="/">
        <a>홈으로</a>
      </Link>
      <br />
      <div>
        <form id="experiment-create-form" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="code"
              placeholder="code"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="title"
              placeholder="title"
              onChange={handleChange}
            />
          </div>
          <div>
            <select name="status">
              {experimentStatus
                ? experimentStatus?.results?.map((status) => {
                    return (
                      <option value={status.id} key={status.id}>
                        {status.name}
                      </option>
                    );
                  })
                : ""}
            </select>
          </div>
          <div>
            <input
              type="number"
              min="0"
              max="10"
              name="impact"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="number"
              min="0"
              max="10"
              name="confidence"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="number"
              min="0"
              max="10"
              name="ease"
              onChange={handleChange}
            />
          </div>
        </form>
        <textarea
          form="experiment-create-form"
          name="description"
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ExperimentCreatePage;

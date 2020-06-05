import useSWR from "swr";
// import axios from "axios";
import fetch from "./fetch";

export default function useRequest(request, { initialData, ...config } = {}) {
  return useSWR(request && JSON.stringify(request), () => fetch(request), {
    ...config,
    initialData: initialData && {
      status: 200,
      statusText: "InitialData",
      headers: {},
      data: initialData,
    },
  });
}

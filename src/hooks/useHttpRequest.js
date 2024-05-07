import { useState } from "react";

const useHttpRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const sendRequest = async (
    url,
    method = "GET",
    body = null,
    headers = {}
  ) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });

      if (!response.ok) {
        throw new Error("Request failed with status " + response.status);
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      setError(error.message || "Something went wrong!");
    }

    setLoading(false);
  };

  return {
    loading,
    error,
    data,
    sendRequest,
  };
};

export default useHttpRequest;

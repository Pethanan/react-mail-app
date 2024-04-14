import React, { useCallback, useState } from "react";

const useHttpRequest = (task) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendRequest = useCallback(
    async (requestConfig) => {
      setIsLoading(true);
      const responseFromSentMailsBackEnd = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      const responseData = await responseFromSentMailsBackEnd.json();
      if (responseData) {
        task(responseData);
        setIsLoading(false);
      }
    },
    [task]
  );

  return {
    sendRequest,
    isLoading,
    error,
  };
};

export default useHttpRequest;

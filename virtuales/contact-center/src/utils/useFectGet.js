import { useEffect, useState } from "react";

function useFectGet(url) {
  const [data, setData] = useState();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    try {
      getData();
    } catch (error) {
      console.error(error);
    }
    return function cleanup() {
      var es_firefox =
        navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
      if (!es_firefox) abortController.abort();
    };
  }, [!data]);

  const getData = async () => {
    const res = await fetch(url);
    const response = await res.json();
    setData(response);
  };

  return data;
}

export default useFectGet;

import {useState, useEffect} from 'react';
import axios from 'axios';

function useFetch(url, deps=[]) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, satData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      (async () => {
        const response = await axios(url);
        const data = await response.data;
        satData(data);
        setIsLoading(false);
      })();
    } catch (err) {
      setIsLoading(false);
      setError('Oops, something went wrong!');
      console.log(err.message);
    }
  }, deps);

  return {
    isLoading,
    data,
    error,
  };
}

export default useFetch;

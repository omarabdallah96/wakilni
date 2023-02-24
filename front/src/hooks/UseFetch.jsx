import { useEffect, useState } from "react";
import API from "../utils/API";
import { useAuth } from "./useAuth";

export default function   useFetch(url, page, searchText) {
  const [datawithLink, setdatawithLink] = useState(null);
  const [data, setData] = useState(null);

  const { user } = useAuth();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const response = await API.get(url + `?page=${page}${searchText}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setdatawithLink(response.data);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, [url, page, searchText]);

  return { data, loading, error, setData, datawithLink };
}

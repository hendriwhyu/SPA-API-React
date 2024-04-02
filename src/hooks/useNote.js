import React, { useEffect, useState } from "react";

function useNote(defaultFunction) {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  const fetchData = async () => {
    const response = await defaultFunction();
    setNotes(response.data);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
    return () => {
      setLoading(true);
    };
  }, []);

  return [notes, loading];
}

export default useNote;

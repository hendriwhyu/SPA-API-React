import React, { useEffect, useState } from "react";

function useNote(defaultFunction) {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  const fetchData = async () => {
    const response = await defaultFunction();
    setNotes(response.data);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
      setLoading(false);
    }, 2000);
    return () => {
      setLoading(true);
    };
  }, []);

  return [notes, loading];
}

export default useNote;

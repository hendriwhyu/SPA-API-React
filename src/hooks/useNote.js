import React, { useEffect, useState } from "react";

function useNote(defaultFunction) {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  const fetchData = async () => {
    const response = await defaultFunction();
    setNotes(response.data);
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 500);
    return () => {
      setLoading(true);
    };
  }, []);

  return [notes, loading];
}

export default useNote;

"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

type Props = {};

const SearchResultsPage = (props: Props) => {
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );
        if (response.status === 200) {
          const data = await response.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [location, propertyType]);

  return <div>SearchResultsPage</div>;
};

export default SearchResultsPage;
"use client";
import React, { useEffect, useState } from "react";
import properties from "@/properties.json";
import PropertyCard from "@/components/PropertyCard";
import {
  useRouter,
  useParams,
  useSearchParams,
  redirect,
} from "next/navigation";
import { fetchProperty } from "@/utils/requests";

type Props = {};

type ParamType = {
  id: string;
};

// for client component, we cannot just fetch backend api, we have to use useEffect hook

const getPropertyInfo = (properties: any, id_string: any) => {
  var id: number = +id_string; // convert to number
  const property = properties.at(id);
  if (!property) redirect("/not-found");
  return property;
};

const PropertyPage = (props: Props) => {
  const router = useRouter();
  // /properties/132
  const { id }: ParamType = useParams();
  // /properties/132?name=iamtest
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const [property, setProperty] = useState(null);
  const [isNotFound, setIsNotFound] = useState(false);

  // const property = getPropertyInfo(properties, id);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const property = await fetchProperty(id);
        if (!property) {
          console.log("page not found");
          setIsNotFound(true);
        }
        setProperty(property);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  useEffect(() => {
    if (isNotFound) {
      redirect("/not-found");
    }
  }, [isNotFound]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center max-w-xl min-w-64 mx-4 mt-8">
        {property && <PropertyCard property={property} id={id} />}
      </div>
    </div>
  );
};

export default PropertyPage;

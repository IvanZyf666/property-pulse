"use client";
import React from "react";
import properties from "@/properties.json";
import PropertyCard from "@/components/PropertyCard";
import {
  useRouter,
  useParams,
  useSearchParams,
  redirect,
} from "next/navigation";

type Props = {};

const getPropertyInfo = (properties: any, id_string: any) => {
  var id: number = +id_string; // convert to number
  const property = properties.at(id);
  if (!property) redirect("/not-found");
  return property;
};

const PropertyPage = (props: Props) => {
  const router = useRouter();
  // /properties/132
  const { id } = useParams();
  // /properties/132?name=iamtest
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const property = getPropertyInfo(properties, id);

  return (
    <div>
      <button onClick={() => router.push("/")} className="bg-blue-500 p-2">
        Go Home Id:{id} {name && `Name: ${name}`}
      </button>
      <div className="flex flex-wrap justify-center max-w-xl min-w-64 mx-40">
        <PropertyCard property={property} />
      </div>
    </div>
  );
};

export default PropertyPage;

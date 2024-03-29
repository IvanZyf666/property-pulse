import React from "react";
import propertiesOrigin from "@/properties.json"; //hardcoded
import PropertyCard from "@/components/PropertyCard";
import { PropertyInterface } from "@/interfaces/PropertyInterface";
import { fetchProperties } from "@/utils/requests";
import PropertySearchForm from "@/components/PropertySearchForm";

type Props = {};

const PropertiesPage = async (props: Props) => {
  const properties: PropertyInterface[] = await fetchProperties();
  // Sort properties by date
  properties.sort(
    (a: PropertyInterface, b: PropertyInterface) =>
      +new Date(b.createdAt) - +new Date(a.createdAt)
    // to compare two numbers
  );

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          {properties.length === 0 ? (
            <p> No properties found </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property: PropertyInterface) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PropertiesPage;

"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from "react-icons/fa";
import { PropertyInterface } from "@/interfaces/PropertyInterface";
import { useRouter } from "next/navigation";
import "@/style/style.css";

type Props = {
  property: PropertyInterface;
  id?: string;
};

const PropertyCard = ({ property, id }: Props) => {
  const router = useRouter();
  const getRateDisplay = () => {
    const { rates } = property;

    if (rates?.monthly) {
      return `${rates?.monthly.toLocaleString()}/mo`;
    }
    if (rates?.weekly) {
      return `${rates?.weekly.toLocaleString()}/wk`;
    }
  };

  const [select, setSelect] = useState(property?.images[1]);
  return (
    <div className="rounded-xl shadow-md relative">
      <Image
        src={`/images/properties/${property.images[0]}`}
        alt=""
        height={0}
        width={0}
        sizes="100vw"
        className="w-full h-auto rounded-t-xl"
      />

      {id && (
        <div className="flex flex-wrap">
          {property.images
            .filter((id) => id !== property.images[0])
            .map((image) => (
              <Image
                className={`${
                  select === image ? "lg:flex-grow" : "lg:flex-none lg:w-8"
                } max-lg:basis-full lg:rounded-xl max-lg:border-t-2 lg:m-0.5 bg-cover bg-center object-cover transition-all duration-500 ease-in-out h-80`}
                key={image}
                src={`/images/properties/${image}`}
                alt=""
                id={image}
                height={0}
                width={0}
                sizes="100vw"
                onClick={(e) =>
                  setSelect(
                    // @ts-ignore
                    e.target.id
                  )
                }
              />
            ))}
        </div>
      )}

      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6 h-16">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          ${getRateDisplay()}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4 ">
          <p>
            <FaBed className="inline mr-2" /> {property.beds}{" "}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FaBath className="inline mr-2" /> {property.baths}{" "}
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline mr-2" />
            {property.square_feet}{" "}
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {property.rates?.weekly && (
            <p>
              <FaMoneyBill className="inline mr-2" /> Weekly
            </p>
          )}
          {property.rates?.monthly && (
            <p>
              <FaMoneyBill className="inline mr-2" /> Monthly
            </p>
          )}
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className="text-orange-700 mt-1" />
            <span className="text-orange-700">
              {" "}
              {property.location?.city} {property.location?.state}
            </span>
          </div>
          <>
            <Link
              href={`/properties/${property._id}`}
              className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm m-1 lg:ml-auto"
            >
              Details
            </Link>
            {id && (
              <Link
                href={"/"}
                className="h-[36px] bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-center text-sm m-1"
              >
                Go Home
              </Link>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

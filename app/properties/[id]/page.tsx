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
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from "next/link";
import PropertyDetails from "@/components/PropertyDetails";
import Spinner from "@/components/Spinner";
import { FaArrowLeft } from "react-icons/fa";

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

  const [property, setProperty] = useState<any>(null);
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

  // old single page component
  // return (
  //   <div className="flex flex-col items-center">
  //     <div className="flex flex-wrap justify-center max-w-xl min-w-64 mx-4 mt-8">
  //       {property && <PropertyCard property={property} id={id} />}
  //     </div>
  //   </div>
  // );

  if (!property && !loading) {
    return (
      <h1 className="='text-center text-2xl fond-bold mt-10">
        Property Not Found
      </h1>
    );
  }
  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Properties
              </Link>
            </div>
          </section>
          {/* <!-- Property Info --> */}
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <PropertyDetails property={property} />

                <aside className="space-y-4">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                    <i className="fas fa-bookmark mr-2"></i> Bookmark Property
                  </button>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                    <i className="fas fa-share mr-2"></i> Share Property
                  </button>

                  {/* <!-- Contact Form --> */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-6">
                      Contact Property Manager
                    </h3>
                    <form>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="name"
                        >
                          Name:
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          type="text"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="email"
                        >
                          Email:
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="phone"
                        >
                          Phone:
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="phone"
                          type="text"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="message"
                        >
                          Message:
                        </label>
                        <textarea
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                          id="message"
                          placeholder="Enter your message"
                        ></textarea>
                      </div>
                      <div>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                          type="submit"
                        >
                          <i className="fas fa-paper-plane mr-2"></i> Send
                          Message
                        </button>
                      </div>
                    </form>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default PropertyPage;

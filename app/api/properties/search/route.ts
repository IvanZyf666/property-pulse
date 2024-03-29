import connectDB from "@/config/database";
import { PropertyInterface } from "@/interfaces/PropertyInterface";
import Property from "@/models/Property";
import { fetchProperties } from "@/utils/requests";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest | Request) => {
  try {
    // await connectDB();
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location") ?? "";
    const propertyType = searchParams.get("propertyType") ?? "All";

    const locationPattern = new RegExp(location, "i");

    // Match location
    let query = {
      $or: [
        { name: { $regex: locationPattern } },
        { description: { $regex: locationPattern } },
        { "location.street": { $regex: locationPattern } },
        { "location.city": { $regex: locationPattern } },
        { "location.city": { $regex: locationPattern } },
        { "location.state": { $regex: locationPattern } },
        { "location.zipcode": { $regex: locationPattern } },
      ],
    };

    // Only check for property if its not 'All'
    if (propertyType && propertyType != "All") {
      const typePattern = new RegExp(propertyType, "i");
      // ignore lint for the next line
      // @ts-ignore
      query.type = typePattern;
    }
    // const propertiesWithDB = await Property.find(query);
    const properties = await getLegacy(location, propertyType);
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};

const getLegacy = async (matchLocation: string, matchPropertyType: string) => {
  const properties: PropertyInterface[] = await fetchProperties();
  // filter out properties that don't match the search criteria
  const filteredProperties = properties.filter((property) => {
    const { name, description, location } = property;
    const { street, city, state, zipcode } = location;
    const type = property.type.toLowerCase();
    const locationMatch =
      name.toLowerCase().includes(matchLocation.toLowerCase()) ||
      description.toLowerCase().includes(matchLocation.toLowerCase()) ||
      street.toLowerCase().includes(matchLocation.toLowerCase()) ||
      city.toLowerCase().includes(matchLocation.toLowerCase()) ||
      state.toLowerCase().includes(matchLocation.toLowerCase()) ||
      zipcode.toLowerCase().includes(matchLocation.toLowerCase());
    const typeMatch =
      matchPropertyType.toLowerCase() === "all" ||
      type.toLowerCase().includes(matchPropertyType.toLowerCase());
    return locationMatch && typeMatch;
  });
  return filteredProperties;
};

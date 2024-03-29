import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest | Request) => {
  try {
    await connectDB();
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
    const properties = await Property.find(query);
    console.log(query, properties.length);
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};

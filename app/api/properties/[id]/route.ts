import connectDB from "@/config/database";
import Property from "@/models/Property";

type ParamType = {
  id: string;
};

// GET /api/properties/:id
export const GET = async (request: any, { params }: any) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id); // get by id

    console.log(params.id, property);

    if (!property) {
      return new Response("Property not found", { status: 404 });
    }

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};

import propertiesOrigin from "@/properties.json";
const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch all properties
async function fetchProperties() {
  try {
    if (!apiDomain) {
      return propertiesOrigin;
    }

    const res = await fetch(`${apiDomain}/properties`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return propertiesOrigin;
  }
}

// Fetch single property
async function fetchProperty(id: string) {
  try {
    if (!apiDomain) {
      return getDefaultPropertyInfo(propertiesOrigin, id);
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return getDefaultPropertyInfo(propertiesOrigin, id);
  }
}

const getDefaultPropertyInfo = (properties: any, id_string: any) => {
  var id: number = +id_string; // convert to number
  if (typeof id !== "number" || !(id > 0 && id < 11)) {
    return null;
  }
  const property = properties.at(id - 1);
  return property;
};

export { fetchProperties, fetchProperty };

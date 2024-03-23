import React, { useState } from "react";
import Image from "next/image";

type Props = {
  property: any;
  id: string;
};

const MorePhoto = ({ property, id }: Props) => {
  const [select, setSelect] = useState(property?.images[1]);
  return (
    <div className="mb-4 mx-1">
      {id && (
        <div className="flex flex-wrap">
          {property.images
            .filter((id: any) => id !== property.images[0])
            .map((image: any) => (
              <Image
                className={`${
                  select === image ? "lg:flex-grow" : "lg:flex-none lg:w-8"
                } max-lg:basis-full lg:rounded-xl max-lg:border-t-2 lg:m-0.5 bg-cover bg-center object-cover transition-all duration-500 ease-in-out h-80 rounded-sm`}
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
    </div>
  );
};

export default MorePhoto;

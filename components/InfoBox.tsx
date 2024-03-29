import React from "react";

type buttonType = {
  text: string;
  link: string;
  backgroundColor: string;
  id: string;
};

type Props = {
  heading: string;
  backgroundColor?: string;
  textColor?: string;
  buttonInfo: buttonType;
  children: string;
};

const InfoBox = ({
  heading,
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
  buttonInfo,
  children,
}: Props) => {
  return (
    <div>
      <div className={`${backgroundColor} h-full p-6 rounded-lg shadow-md`}>
        <h2 className={`${textColor} text-2xl font-bold`}> {heading} </h2>
        <p className={`${textColor} mt-2 mb-4`}>{children}</p>
        <a
          href={buttonInfo.link}
          className={`${buttonInfo.id} inline-block ${buttonInfo.backgroundColor} text-white rounded-lg px-4 py-2 hover:opacity-80`}
        >
          {buttonInfo.text}
        </a>
      </div>
    </div>
  );
};

export default InfoBox;

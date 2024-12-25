import Amenities from "@/app/components/Amenities/Amenities";
import NearBy from "@/app/components/NearBy/NearBy";
import React from "react";

const NearBySection: React.FC = () => {
  return (
    <>
      <Amenities />
      <NearBy />
    </>
  );
};

export default NearBySection;

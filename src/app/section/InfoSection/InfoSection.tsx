import EnquireProperty from "@/app/components/EnquireProperty/EnquireProperty";
import PaymentPlans from "@/app/components/PaymentPlans/PaymentPlans";
import SimiliarProject from "@/app/components/SimiliarProject/SimiliarProject";
import React from "react";

const InfoSection: React.FC = () => {
  return <>
  <PaymentPlans/>
  <EnquireProperty/>
  <SimiliarProject/>
  </>;
};

export default InfoSection;

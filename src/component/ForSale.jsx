import React from "react";
import GridItems from "../feature/item/GridItems";

const ForSale = () => {
  return <GridItems category={"forSale"} />;
};

export default React.memo(ForSale);

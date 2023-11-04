import React from "react";

import GridItems from "../feature/item/GridItems";

const HousingAll = () => {
  return <GridItems category={"housing"} />;
};

export default React.memo(HousingAll);

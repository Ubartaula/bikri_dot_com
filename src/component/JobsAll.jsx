import React from "react";

import GridItems from "../feature/item/GridItems";

const JobsAll = () => {
  return <GridItems category={"jobs"} />;
};

export default React.memo(JobsAll);

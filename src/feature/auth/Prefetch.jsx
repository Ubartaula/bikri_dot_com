import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { store } from "../../app/store";
import { itemApiSlice } from "../item/itemApiSlice";
import { userApiSlice } from "../user/userApiSlice";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      itemApiSlice.util.prefetch("getItems", "listItems", { force: true })
    );
    store.dispatch(
      userApiSlice.util.prefetch("getUsers", "listUsers", { force: true })
    );
  }, []);

  return <Outlet />;
};

export default Prefetch;

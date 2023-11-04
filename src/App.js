import { Routes, Route } from "react-router-dom";
import HomePage from "./component/HomePage";
import AddItem from "./feature/item/AddItem";
import IndividualItem from "./feature/item/IndividualItem";
import Login from "./feature/auth/Login";
import PersistLogin from "./feature/auth/PersistLogin";
import Logout from "./feature/auth/Logout";
import ListUser from "./feature/user/ListUser";
import Prefetch from "./feature/auth/Prefetch";
import NotFound from "./component/NotFound";
import RootLayout from "./component/RootLayout";
import ServiceAll from "./component/ServiceAll";
import HousingAll from "./component/HousingAll";
import ForSale from "./component/ForSale";
import Jobs from "./component/JobsAll";
import AddUser from "./feature/user/AddUser";
import EditUser from "./feature/user/EditUser";
import RequireAuth from "./feature/auth/RequireAuth";
import { ROLE } from "./config/ROLE";
import ResetPassword from "./feature/auth/ResetPassword";
import Test from "./component/Test";
import SubCategoryWise from "./feature/item/SubCategoryWise";
import ListComment from "./feature/comment/ListComment";
import EditItem from "./feature/item/EditItem";
import GridItems from "./feature/item/GridItems";
import UserItemsGridList from "./feature/item/UserItemsGridList";
import UserSetting from "./feature/user/UserSetting";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="test" element={<Test />} />
        <Route path="login" element={<Login />} />
        <Route path="reset" element={<ResetPassword />} />

        <Route path="housing">
          <Route index element={<HousingAll />} />
          <Route path=":id" element={<SubCategoryWise />} />
        </Route>
        <Route path="services">
          <Route index element={<ServiceAll />} />
          <Route path=":id" element={<SubCategoryWise />} />
        </Route>
        <Route path="forSale">
          <Route index element={<ForSale />} />
          <Route path=":id" element={<SubCategoryWise />} />
        </Route>
        <Route path="jobs">
          <Route index element={<Jobs />} />
          <Route path=":id" element={<SubCategoryWise />} />
        </Route>
        <Route path="items">
          <Route index element={<GridItems />} />
          <Route path="new" element={<AddItem />} />
          <Route path=":id/single" element={<IndividualItem />} />
        </Route>
        <Route path="comments">
          <Route index element={<ListComment />} />
        </Route>

        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route element={<RequireAuth authRole={Object.values(ROLE)} />}>
              <Route path="dash">
                <Route index element={<HomePage />} />

                <Route path="logout" element={<Logout />} />

                <Route path="housing">
                  <Route index element={<HousingAll />} />
                  <Route path=":id" element={<SubCategoryWise />} />
                </Route>

                <Route path="services">
                  <Route index element={<ServiceAll />} />
                  <Route path=":id" element={<SubCategoryWise />} />
                </Route>
                <Route path="forSale">
                  <Route index element={<ForSale />} />
                  <Route path=":id" element={<SubCategoryWise />} />
                </Route>
                <Route path="jobs">
                  <Route index element={<Jobs />} />
                  <Route path=":id" element={<SubCategoryWise />} />
                </Route>

                <Route path="items">
                  <Route index element={<GridItems />} />
                  <Route path="new" element={<AddItem />} />
                  <Route path=":id" element={<EditItem />} />
                  <Route path=":id/single" element={<IndividualItem />} />
                </Route>

                <Route path="profile">
                  <Route index element={<UserItemsGridList />} />
                  <Route path="setting" element={<UserSetting />} />
                </Route>

                <Route
                  element={<RequireAuth authRole={["Manager", "Super"]} />}
                >
                  <Route path="users">
                    <Route index element={<ListUser />} />
                    <Route path="new" element={<AddUser />} />

                    <Route path=":id" element={<EditUser />} />
                  </Route>
                </Route>
                {/*  */}
              </Route>
            </Route>
          </Route>
        </Route>
        {/* everything would go above it */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

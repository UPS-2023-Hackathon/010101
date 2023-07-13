import Login from "./src/Login";
import Search from "../";
import ROUTE_PATHS from "./routePath";
import * as types from "../Hackathon";


const routes: types.route[] = [
  {
    path: ROUTE_PATHS.LOGIN,
    component: <Login />,
    exact: true,
  },
  {
    path: ROUTE_PATHS.SEARCH,
    component: <Search />,
    exact: true,
  },
  ];

export default routes;

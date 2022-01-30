// import React from "react";
// import { Route, Navigate  } from "react-router-dom";
// import { isAuthenticated } from "./index";

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   return (
//     <>
//     <Route
//       {...rest}
//       render={props =>
//         isAuthenticated() ? (
//           <Component {...props} />
//         ) : (
//           <Navigate 
//             to={{
//               pathname: "/signin",
//               state: { from: props.location }
//             }}
//           />
//         )
//       }
//     />
//     </>
//   );
// };

// export default PrivateRoute;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from "./index";

const PrivateRoute = () => {
  const auth = isAuthenticated(); // determine if authorized, from context or however you're doing it
  
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to="/signin" />;
}
export default PrivateRoute;
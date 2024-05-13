import { NavLink } from "react-router-dom";

const HeaderRoutes = () => {
  return (
    <div className="d-flex flex-row justify-content-center align-items-center gap-3 flex-wrap">
      <NavLink
        to={"/photoGraphers"}
        className="btn btn-primary "
        style={({ isActive }) => {
          return {
            color: isActive ? "tomato" : "white",
          };
        }}
      >
        PhotoGraphers 📸
      </NavLink>
      <NavLink
        to={"/react_gallery"}
        className="btn btn-primary"
        style={({ isActive }) => {
          return {
            color: isActive ? "tomato" : "white",
          };
        }}
      >
        Home 🏠
      </NavLink>
    </div>
  );
};
export default HeaderRoutes;

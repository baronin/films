import { memo } from "react";
import { NavLink } from "react-router-dom";

const TopNavigation = ({ isAuth, logout, isAdmin }) => {
  return (
    <div className="ui secondary pointing menu">
      <NavLink exact to="/" className="item">
        <i className="icon home" /> Home
      </NavLink>

      <NavLink exact to="/films" className="item">
        <i className="icon film" /> Films
      </NavLink>
      {isAdmin && (
        <NavLink exact to="/films/new" className="item">
          <i className="icon plus" /> Add new film
        </NavLink>
      )}

      <div className="right menu">
        {isAuth ? (
          <span onClick={logout} className="item">
            <i className="icon sign-out" /> Logout
          </span>
        ) : (
          <>
            <NavLink to="/signup" className="item">
              <i className="icon sign-in" /> Signup
            </NavLink>
            <NavLink to="/login" className="item">
              <i className="icon user" /> Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(TopNavigation);

import { string } from "prop-types";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function TabHome({ icon }) {
  const navigate = useNavigate();

  const setToHomePage = useCallback(() => {
    navigate("/");
  }, []);
  return (
    <div
      style={{
        marginLeft: 0,
        width:60
      }}
      className="window-controls"
    >
      <button
      style={{
        width:60
      }}
        aria-label="icon"
        className="window-control"
        tabIndex={-1}
        onClick={() => setToHomePage()}
      >
        <img className="icon" src={icon} alt="" />
      </button>
    </div>
  );
}

TabHome.propTypes = {
  icon: string,
};

export default TabHome;
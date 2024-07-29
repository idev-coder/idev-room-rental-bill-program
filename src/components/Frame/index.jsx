import * as React from "react";
import { Outlet } from "react-router-dom";
import { arrayOf, node, oneOfType } from "prop-types";
import WindowControls from "./WindowControls";
import TabHome from "./TabHome";
import isElectron from "../../lib/isElectron";

export function Frame({
  children,
  icon,
  disableMinimize,
  disableMaximize,
  className,
  browserWindowId,
}) {


  return (
    <React.Fragment>
      {isElectron() && ( <div id="title-bar" className={`title-bar ${className || ""}`}>
        <div className="resize-handle resize-handle-top" />
        <div className="resize-handle resize-handle-left" />
        {!!icon && <TabHome icon={icon}></TabHome>}
        {children}
        <WindowControls
          disableMinimize={disableMinimize}
          disableMaximize={disableMaximize}
          browserWindowId={browserWindowId}
        ></WindowControls>
      </div>)}
     
      <div
        style={{
          height: "100vh",
        }}
      >
        <Outlet />
      </div>
      <div style={{
        position: 'fixed',
        bottom: '4px',
        right: '8px',
        color: '#00000036',
      }}>idevcoder.com</div>
    </React.Fragment>
  );
}

Frame.propTypes = {
  children: oneOfType([arrayOf(node), node]),
};

export default Frame;

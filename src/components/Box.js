import React ,{memo} from "react";
import BoxClass from "./Box.module.css";

function Box({ onClickHandler, id, top, left, active, color }) {
  let newClasses = [BoxClass.Box];
  if (active) {
    newClasses = [BoxClass.Box, BoxClass.active];
  }
  return (
    <div
      className={newClasses.join(" ")}
      onClick={() => onClickHandler(id)}
      style={{
        top: top,
        left: left,
        zValue: id,
        backgroundColor: active ? null : color,
      }}
    >
      {active ? 'Active' :''}
    </div>
  );
}

export default memo(Box);

import { useState } from "react";
import Button from "./Button";

// eslint-disable-next-line react/prop-types
const StyleInput = ({ setStyle }) => {
  const [style, setStyles] = useState({
    stroke: true,
    color: "#3388ff",
    weight: 3,
    opacity: 1.0,
    lineCap: "round",
    lineJoin: "round",
    dashArray: null,
    dashOffset: null,
    fill: true,
    fillColor: "#3388ff",
    fillOpacity: 0.2,
    fillRule: "evenodd",
  });

  const handleSubmitStyle = (e) => {
    e.preventDefault();
    setStyle(style);
  };

  const handleChangeInput = (e) => {
    const currentType = e.target.name;

    if (currentType === "stroke" || currentType === "fill") {
      const checked = e.target.checked;
      e.target.value = checked;
    }
    const currentValue = e.target.value;
    setStyles((prev) => ({ ...prev, [currentType]: currentValue }));
  };

  return (
    <form onSubmit={handleSubmitStyle}>
      <label>
        <input
          type="checkbox"
          name="stroke"
          onClick={handleChangeInput}
          checked={style.stroke}
          value={style.stroke}
        />{" "}
        stroke
      </label>
      <label>
        <input
          type="number"
          name="weight"
          onChange={handleChangeInput}
          disabled={!style.stroke}
          value={style.weight}
        />{" "}
        weight
      </label>
      <label>
        <input
          type="number"
          name="opacity"
          onChange={handleChangeInput}
          disabled={!style.stroke}
          value={style.opacity}
        />{" "}
        opacity
      </label>
      <label>
        <input
          type="text"
          name="lineCap"
          onChange={handleChangeInput}
          disabled={!style.stroke}
          value={style.lineCap}
        />{" "}
        lineCap
      </label>
      <label>
        <input
          type="text"
          name="lineJoin"
          onChange={handleChangeInput}
          disabled={!style.stroke}
          value={style.lineJoin}
        />{" "}
        lineJoin
      </label>
      <label>
        <input
          type="text"
          name="color"
          onChange={handleChangeInput}
          disabled={!style.stroke}
          value={style.color}
        />{" "}
        color
      </label>
      <label>
        <input
          type="checkbox"
          name="fill"
          onClick={handleChangeInput}
          checked={style.fill}
          value={style.fill}
        />{" "}
        fill
      </label>
      <label>
        <input
          type="text"
          name="fillColor"
          onChange={handleChangeInput}
          disabled={!style.fill}
          value={style.fillColor}
        />{" "}
        fillColor
      </label>
      <label>
        <input
          type="number"
          name="fillOpacity"
          onChange={handleChangeInput}
          disabled={!style.fill}
          value={style.fillOpacity}
        />{" "}
        fillOpacity
      </label>
      <Button type="submit">스타일 적용하기</Button>
    </form>
  );
};

export default StyleInput;

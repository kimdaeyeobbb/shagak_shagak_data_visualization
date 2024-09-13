import { useEffect, useState } from "react";
import useVectorMap from "../../hooks/useVectorMap";
import useMapEvent from "../../hooks/useMapEvent";

// eslint-disable-next-line react/prop-types
const VectorLayer = ({ shape, pathStyle }) => {
  const {
    createVector,
    updateVector,
    drawVector,
    removeVector,
    useVectorEvent,
    zoomCurrentVector,
  } = useVectorMap();
  const [vector, setVector] = useState({
    id: null,
    shape,
    vector: null,
  });
  const [position, setPosition] = useState([]);
  useMapEvent(
    "click",
    (e) => {
      setPosition((prev) => [...prev, e.latlng]);
    },
    []
  );
  useVectorEvent("", () => {}, []);

  useEffect(() => {
    if (!shape || position.length === 0) return;
    if (vector) vector.vector.setStyle(pathStyle);
  }, [pathStyle]);

  useEffect(() => {
    if (!shape || position.length === 0) return;
    if (vector.shape != shape) initVector(vector);
  }, [shape]);

  useEffect(() => {
    if (!shape || position.length === 0) return;
    const currentVector = createVector(shape, position);
    setVector(currentVector);
    if (position.length) drawVector(currentVector);

    return () => {
      if (vector) removeVector(vector); // 이전 벡터 제거
    };
  }, [position]);

  // ESC 키 이벤트 처리 및 벡터 그리기 취소

  const handleKeyDown = (e) => {
    if (e.key === "Escape") initVector(vector);
  };

  const initVector = (vector) => {
    if (!vector?.vector) return;
    updateVector(vector);
    zoomCurrentVector(vector);

    // 그리기 취소 (좌표 초기화) -> 기존 벡터는 그대로 유지
    setVector({
      id: null,
      shape,
      vector: null,
    });
    setPosition([]);

    // updateVector(vector);
  };
  useEffect(() => {
    // 키다운 이벤트 등록
    window.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [vector, position]);

  return <></>;
};

export default VectorLayer;

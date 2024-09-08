import { useEffect, useState } from "react";
import useVectorMap from "../../hooks/useVectorMap";
import useMapEvent from "../../hooks/useMapEvent";
const VectorLayer = ({ shape }) => {
  const {
    createVector,
    updateVector,
    drawVector,
    removeVector,
    isIncludeVector,
    useVectorEvent,
    zoomCurrentVector,
  } = useVectorMap();
  const [vectors, setVectors] = useState([]);
  const [vector, setVector] = useState({});
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
    const currentVector = createVector(shape, position);
    setVector(currentVector);
    setVectors((prev) => [...prev, currentVector]);

    if (position.length) {
      drawVector(currentVector);
    }

    return () => {
      if (vector) removeVector(vector); // 이전 벡터 제거
    };
  }, [shape, position]);

  // ESC 키 이벤트 처리 및 벡터 그리기 취소
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (vectors.length > 0) {
          zoomCurrentVector(vectors);
        }

        // 그리기 취소 (좌표 초기화) -> 기존 벡터는 그대로 유지
        setVector(null);
        setPosition([]);

        updateVector(vector);
      }
    };

    // 키다운 이벤트 등록
    window.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [vectors]);

  return <></>;
};

export default VectorLayer;

import { useEffect, useState } from "react";
import useVectorMap from "../../hooks/useVectorMap";
import useMapEvent from "../../hooks/useMapEvent";
import Popup from "./Popup";
import Button from "./Button";
import "../../../../styles/map.css";

// eslint-disable-next-line react/prop-types
const VectorLayer = ({ shape, pathStyle, children }) => {
  const {
    createVector,
    updateVector,
    drawVector,
    zoomCurrentVector,
    useVectorEvent,
    removeVector,
    isIncludeVector,
  } = useVectorMap();
  const [vector, setVector] = useState({
    shape,
    vector: null,
  });
  const [position, setPosition] = useState([]);

  const [selectedVector, setSelectedVector] = useState({
    vector: null,
    position: null,
  });
  const [selected, setSelected] = useState(false);
  const [popup, setPopup] = useState(!!selectedVector);
  const [open, setOpen] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") initVector(vector);
  };

  const handleClickClose = () => {
    removeVector(selectedVector);
    setSelected(false);
  };

  const initVector = (vector) => {
    if (!vector?.vector) return;
    zoomCurrentVector(vector);

    // 그리기 취소 (좌표 초기화) -> 기존 벡터는 그대로 유지
    setVector({
      shape,
      vector: null,
    });
    setPosition([]);
  };

  // 벡터 스타일 업데이트
  useEffect(() => {
    if (vector.vector) {
      vector.vector.setStyle(pathStyle);
    }
  }, [pathStyle]);

  // 벡터가 변경될 때 초기화
  useEffect(() => {
    if (vector.shape !== shape) {
      initVector(vector);
    }
  }, [shape]);

  // 위치 변경 시 벡터 업데이트 또는 생성
  useEffect(() => {
    if (!shape || position.length === 0) return;
    const currentVector = isIncludeVector(vector?.vector?.options.id)
      ? updateVector(vector, position)
      : createVector(shape, position);

    setVector(currentVector);
    drawVector(currentVector);
  }, [position]);

  // ESC 키 이벤트 처리 및 벡터 그리기 취소

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [vector, position]);

  useVectorEvent(
    "click",
    (e) => {
      const { target, latlng } = e;
      setSelectedVector((prev) => ({
        ...prev,
        vector: target,
        position: latlng,
      }));
      setSelected(true);
      setOpen(true);
      setPopup(true);
      zoomCurrentVector({ vector: target });
      setPosition([]);
    },
    [shape]
  );

  useMapEvent(
    "click",
    (e) => {
      if (!shape || selected) return;
      setPosition([e.latlng]);
    },
    [shape, selected]
  );

  useMapEvent(
    "popupclose",
    () => {
      setOpen(false);
      setPopup(false);
      setPosition([]);
    },
    [vector]
  );
  return (
    <>
      <div onClickCapture={handleClickClose}>
        {selectedVector?.vector && (
          <Popup
            id={selectedVector.vector.options.id}
            latlng={selectedVector.position}
            open={popup}
            popupoptions={{
              closeOnEscapeKey: false,
            }}
          >
            <Button type="button">x</Button>
          </Popup>
        )}
      </div>
      {children && (
        <Popup
          id={vector.vector.options.id}
          latlng={vector.vector.getCenter()}
          open={open}
        >
          {children}
        </Popup>
      )}
    </>
  );
};

export default VectorLayer;

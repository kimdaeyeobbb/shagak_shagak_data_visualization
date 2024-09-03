import * as L from "leaflet";
import { useEffect, useState } from "react";
import useMap from "./useMap";
const usePopup = () => {
  const { value, dispatch } = useMap();
  const currentPopups = [...value.popup];
  const [popups, setPopups] = useState(currentPopups);

  useEffect(() => {
    dispatch({
      type: "update",
      value: { ...value, popup: popups },
    });
  }, [value, popups]);

  const isIncludePopup = (popupId) =>
    !popups.every((popup) => popup.id != popupId);
  const findPopup = (popupId) =>
    popups.filter((popup) => popup.id == popupId)[0];
  const exceptPopups = (popupId) =>
    popups.filter((popup) => popup.id !== popupId);

  const createPopup = (
    popupId,
    latlng,
    content = "",
    popupoptions = {},
    open = false
  ) => {
    if (isIncludePopup(popupId)) {
      console.log("이미 존재하는 popup 입니다.");
      return findPopup(popupId);
    }
    const popup = L.popup(latlng, {
      content,
      ...popupoptions,
    });

    const newPopup = { id: popupId, popup };
    setPopups((prev) => [...prev, newPopup]);

    if (open) popup.openOn(value.map);
    return { id: popupId, popup, open };
  };

  const updatePopup = (
    popupId,
    latlng,
    content = "",
    popupoptions = {},
    open = false
  ) => {
    const targetPopup = findPopup(popupId);
    if (!targetPopup) return;
    const { popup, ...rest } = targetPopup;

    const newPopup = L.popup(latlng, {
      content,
      ...popupoptions,
    });

    if (open) newPopup.openOn(value.map);

    const copyPopup = { ...rest, open, popup: newPopup };
    const otherPopups = exceptPopups(popupId);
    setPopups([...otherPopups, copyPopup]);

    return copyPopup;
  };

  const deletePopup = (popupId) => {
    const targetPopup = findPopup(popupId);
    const otherPopups = exceptPopups(popupId);
    targetPopup && targetPopup.popup.remove();
    setPopups([...otherPopups]);
    return otherPopups;
  };

  return {
    createPopup,
    updatePopup,
    deletePopup,
    isIncludePopup,
    findPopup,
    exceptPopups,
  };
};

export default usePopup;

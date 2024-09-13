import * as L from "leaflet";
import { useEffect, useState } from "react";
import useMap from "./useMap";
const usePopup = () => {
  const { value, dispatch } = useMap();
  const currentPopups = [...value.popup];
  const [popups, setPopups] = useState(currentPopups);
  const [popup, setPopup] = useState(null);

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

  const usePopupEvent = (event, callback, array = []) => {
    useEffect(() => {
      if (!popup) return;
      popup.on(event, callback);

      return () => {
        popup.off(event);
      };
    }, [value, popup, ...array]);
  };

  //popup crud

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
    const newPopup = {
      id: popupId,
      popup: L.popup(popupoptions).setLatLng(latlng).setContent(content),
      open,
    };
    setPopup(newPopup.popup);
    setPopups((prev) => [...prev, newPopup]);
    if (open) newPopup.popup.openOn(value.map);
    return newPopup;
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
    // eslint-disable-next-line no-unused-vars
    const { popup, ...rest } = targetPopup;

    const copyPopup = {
      ...rest,
      open,
      popup: L.popup(popupoptions).setLatLng(latlng).setContent(content),
    };
    const otherPopups = exceptPopups(popupId);

    setPopup(copyPopup.popup);
    setPopups([...otherPopups, copyPopup]);

    if (open) copyPopup.popup.openOn(value.map);
    return copyPopup;
  };

  const deletePopup = (popupId) => {
    const targetPopup = findPopup(popupId);
    const otherPopups = exceptPopups(popupId);
    targetPopup && targetPopup.popup.remove();
    setPopup(null);
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
    usePopupEvent,
  };
};

export default usePopup;

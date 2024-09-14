import useMap from "./useMap";

const useBinding = () => {
  const { value } = useMap();
  const { map } = value;
  const addBind = (where, what, how) => {
    let result = "success";
    if (!where.bindPoup) return (result = "cannot bind");
    switch (how) {
      case "popup": {
        where.bindPopup(what).addTo(map);
        break;
      }
      case "tooltip": {
        where.bindTooltip(what).addTo(map);
        break;
      }
      default: {
        result = "not ready";
      }
    }

    return result;
  };

  const removeBind = (where, what, how) => {
    let result = "success";
    if (!where.unbindPopup) return (result = "cannot unbind");
    switch (how) {
      case "popup": {
        where.unbindPopup(what);
        break;
      }
      case "tooltip": {
        where.unbindTooltip(what);
        break;
      }
      default: {
        result = "not ready";
      }
    }

    return result;
  };

  return {
    addBind,
    removeBind,
  };
};

export default useBinding;

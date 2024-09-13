import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const Map0103 = () => {
  const codeUseMap = `
import { createContext, useContext } from "react";

export const LeafletContext = createContext(null);

const useMap = () => {
  const value = useContext(LeafletContext);

  return value;
};

export default useMap;

    `;

  const codeUseGeoLocation = `
import { useEffect, useState } from "react";

const useGeoLocation = () => {
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState([]);

  const onSuccess = (position) => {
    const currentPosition = position.coords;
    setPosition([currentPosition.latitude, currentPosition.longitude]);
    setLoading(false);
  };

  const onError = (error) => {
    console.log(\`ERROR(\${error.code}): \${error.message}\`);
    setLoading(true);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return { position, loading };
};

export default useGeoLocation;

    `;

  const codeUseMapEvent = `import { useEffect } from "react";
import useMap from "./useMap";

const useMapEvent = (event, callback, array) => {
const { value } = useMap();

const { map } = value;

useEffect(() => {
  map.on(event, callback);
  return () => {
    map.off(event);
  };
}, [value, ...array]);

return map;
};

export default useMapEvent;
`;
  return (
    <main>
      <hgroup>
        <h2>01-3 Custom hooks</h2>
        <p>지도 라이브러리와 같이 사용하는 훅들을 모아놓았습니다.</p>
      </hgroup>
      <section>
        <h3>useMap.js</h3>
        <p>
          React Context API를 사용하고 유지보수를 좋게 하기 위해 훅으로
          분리하였습니다.
        </p>
        <SyntaxHighlighter language="jsx">{codeUseMap}</SyntaxHighlighter>
      </section>
      <section>
        <h3>useMapEvent.js</h3>
        <p>지도 이벤트를 사용하기 위한 훅입니다. </p>
        <SyntaxHighlighter language="jsx">{codeUseMapEvent}</SyntaxHighlighter>
      </section>
      <section>
        <h3>useGeoLocation.js</h3>
        <p>사용자의 현재위치를 알려주는 Javascript 기반 훅입니다.</p>
        <SyntaxHighlighter language="jsx">
          {codeUseGeoLocation}
        </SyntaxHighlighter>
      </section>
    </main>
  );
};

export default Map0103;

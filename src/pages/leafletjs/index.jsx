//지도 기본 페이지
//leaflet 라이브러리 사용
//예제 목차 및 예제 연결 링크
//깃허브 코드 바로가기
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import "../../styles/map.css";
import { Outlet, useLocation } from "react-router-dom";
const Map = () => {
  const location = useLocation();
  const path = location.pathname.split("/");

  const code = `npm i react-dom leaflet`;
  const css = ` <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      crossorigin=""
    />`;

  return (
    <>
      {path[2] ? (
        <Outlet />
      ) : (
        <main>
          <hgroup>
            <h3>지도 데이터 시각화</h3>
            <p>
              Leaflet 라이브러리를 이용하여 지도 데이터 시각화를 구현합니다.
            </p>
          </hgroup>
          <section>
            <h4>필수 라이브러리 설치하기</h4>
            <p>
              React와 Leaflet을 같이 사용하기 위해서 ReactDom 라이브러리를
              추가해야 합니다.
            </p>
            <SyntaxHighlighter language="bash">{code}</SyntaxHighlighter>
            <a href="https://leafletjs.com/" className="link">
              <span>leaflet 공식문서 바로가기 {">"} </span>
              https://leafletjs.com/
            </a>
            <span className="block"></span>
            <a
              href="https://react.dev/reference/react#react-dom"
              className="link"
            >
              <span>
                ReactDom{"(React)"} 공식문서 바로가기 {">"}{" "}
              </span>
              https://react.dev/reference/react#react-dom
            </a>
          </section>

          <section>
            <h4>필수 스타일시트 연결하기</h4>
            <p>Leaflet에서 제공해주는 타일 맵을 위한 CSS를 연결합니다.</p>
            <SyntaxHighlighter language="html">{css}</SyntaxHighlighter>
            <p>
              해당 CSS로 타일 맵이 잘 정렬될 수 있도록 합니다. <br /> ‼️간혹
              해당 스타일시트를 연결하지 않아 지도가 이상하게 보이는 경우가
              발생합니다.
            </p>
          </section>
        </main>
      )}
    </>
  );
};

export default Map;

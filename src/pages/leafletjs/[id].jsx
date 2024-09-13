import { useParams } from "react-router-dom";

const MapIndexPage = () => {
  let { id } = useParams();
  return <div>Map- {id}번 페이지 입니다.</div>;
};

export default MapIndexPage;

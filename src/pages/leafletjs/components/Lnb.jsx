/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState } from "react";

const LnbItem = ({ route, parentPath = "", isOpen, onToggle }) => {
  const hasChildren = route.children && route.children.length > 0;
  const fullPath = `${parentPath}/${route.path}`;

  return (
    <li className={`gnb-item ${isOpen ? "open" : ""}`}>
      <Link to={fullPath} onClick={hasChildren ? onToggle : undefined}>
        {route.path}
      </Link>
      {hasChildren && (
        <ul className={`subRoutes ${isOpen ? "expanded" : ""}`}>
          {route.children.map((child, index) => (
            <LnbItem key={index} route={child} parentPath={fullPath} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Lnb = ({ routes }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <aside>
      <h2>
        <Link to="/">
          사각사각 데이터 시각화
          <sub>
            with <span>React</span>
          </sub>
        </Link>
      </h2>
      <ul>
        {routes.map((route, index) => (
          <LnbItem
            key={index}
            route={route}
            isOpen={openIndex === index}
            onToggle={() => toggleOpen(index)}
          />
        ))}
      </ul>
    </aside>
  );
};

export default Lnb;

import { useState } from "react";
const DEFAULT_SIZE = 24;
// eslint-disable-next-line react/prop-types
const IconInput = ({ onInput }) => {
  const [icon, setIcon] = useState({
    size: [DEFAULT_SIZE, DEFAULT_SIZE],
    file: "",
  });

  const handleChangeSize = (e) => {
    setIcon((prev) => ({ ...prev, size: [e.target.value, e.target.value] }));
  };
  const handleInputIcon = (e) => {
    const target = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setIcon((prev) => ({ ...prev, file: e.target.result }));
    };

    if (target) {
      reader.readAsDataURL(target);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!icon.size || !icon.file) {
      alert("아이콘 이름과 파일을 모두 입력해주세요.");
      return;
    }
    const id = Date.now();

    const newIcon = {
      id,
      ...icon,
    };

    onInput(newIcon);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        file:{" "}
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/svg"
          onInput={handleInputIcon}
        />
      </label>
      <label>
        size:{" "}
        <input type="number" value={icon.size} onChange={handleChangeSize} />
      </label>
      <button type="submit">새로운 아이콘 추가하기</button>
    </form>
  );
};

export default IconInput;

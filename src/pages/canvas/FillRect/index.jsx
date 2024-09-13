import { useRef, useEffect } from 'react';

const FillRect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // 캔버스의 크기 설정
    canvas.width = 500;
    canvas.height = 300;

    // 파란색 배경의 직사각형 그리기
    context.fillStyle = '#0000FF';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default FillRect;

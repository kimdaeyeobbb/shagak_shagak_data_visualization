import { useRef, useEffect } from 'react';

const BeginPath = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // 캔버스의 크기 설정
    canvas.width = 500;
    canvas.height = 300;

    // 파란색 배경의 직사각형 그리기
    context.fillStyle = 'blue';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    // 첫 번째 사각형 그리기
    context.beginPath(); // 새 경로 시작
    context.fillStyle = 'red';
    context.fillRect(10, 10, 100, 50);

    // 두 번째 사각형 그리기
    context.beginPath(); // 새 경로 시작
    context.fillStyle = 'white';
    context.fillRect(150, 10, 100, 50);

    // 원 그리기
    context.beginPath(); // 새 경로 시작
    context.fillStyle = 'green';
    context.arc(150, 150, 50, 0, Math.PI * 2);
    context.fill();
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};

export default BeginPath;

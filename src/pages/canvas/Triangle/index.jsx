import { useRef, useEffect } from 'react';

const Triangle = () => {
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

    // 선의 색상과 두께 설정
    context.strokeStyle = '#FFFFFF'; // 흰색 선
    context.lineWidth = 5;

    // 새로운 경로 시작
    context.beginPath();

    // 삼각형 그리기
    context.moveTo(100, 100); // 시작점 (100, 100)
    context.lineTo(200, 50); // (200, 50)까지 선 그리기
    context.lineTo(300, 100); // (300, 100)까지 선 그리기
    context.lineTo(100, 100); // 시작점으로 다시 선 그리기

    // 경로를 화면에 그리기
    context.stroke();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Triangle;

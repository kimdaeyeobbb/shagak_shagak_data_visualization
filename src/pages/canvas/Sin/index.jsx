import { useRef, useEffect } from 'react';

const Sin = () => {
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

    // 파란색 사인파 그리기
    context.beginPath();
    for (let x = 0; x < context.canvas.width; x++) {
      const y = 100 + Math.sin(x * 0.05) * 50; // 사인파 생성
      if (x === 0) {
        context.moveTo(x, y); // 시작점 설정
      } else {
        context.lineTo(x, y); // 선 그리기
      }
    }
    context.strokeStyle = 'rgba(255, 255, 255, 1)'; // 하얀색 선
    context.stroke();

    // 녹색 사각형 그리기
    context.fillStyle = 'rgba(0, 255, 0, 0.5)'; // 반투명한 녹색
    context.fillRect(50, 150, 100, 100); // (x, y, width, height)

    // 빨간색 원 그리기
    context.beginPath();
    context.arc(300, 200, 50, 0, 2 * Math.PI); // (x, y, radius, startAngle, endAngle)
    context.fillStyle = 'rgba(255, 0, 0, 0.7)'; // 반투명한 빨간색
    context.fill();

    // 노란색 선 그리기
    context.beginPath();
    context.moveTo(50, 250); // 시작점 설정
    context.lineTo(350, 250); // 끝점 설정
    context.strokeStyle = 'rgba(255, 255, 0, 1)'; // 노란색 선
    context.lineWidth = 5; // 선 두께 설정
    context.stroke();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Sin;

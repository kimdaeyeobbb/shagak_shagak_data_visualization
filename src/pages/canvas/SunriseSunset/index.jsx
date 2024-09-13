import { useRef, useEffect, useState } from 'react';

const SunriseSunset = () => {
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(window.innerWidth);
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // window.innerWidth -> 800으로 변경
    canvas.width = 800;
    canvas.height = 400;

    const midHeight = canvas.height / 2;

    const phaseShift = (sliderValue * 8 * Math.PI) / 100;
    const startX = canvas.width * 0.3;
    const startY =
      midHeight -
      100 * Math.sin((startX / canvas.width) * 2 * Math.PI + phaseShift);

    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.width, midHeight);

    if (startY < midHeight) {
      context.fillStyle = '#FFFFFF';
      context.fillRect(0, midHeight, canvas.width, midHeight);
    } else {
      context.fillStyle = '#171717';
      context.fillRect(0, midHeight, canvas.width, midHeight);
    }

    context.strokeStyle = '#FFFFFF';
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(0, midHeight);
    context.lineTo(canvas.width, midHeight);
    context.stroke();

    context.strokeStyle = '#FFD700';
    context.lineWidth = 3;
    context.beginPath();

    let intersectionPoints = [];

    for (let x = 0; x < canvas.width; x++) {
      const y =
        midHeight -
        100 * Math.sin((x / canvas.width) * 2 * Math.PI + phaseShift);
      if (Math.abs(y - midHeight) < 1) {
        intersectionPoints.push(x);
      }

      if (y < midHeight) {
        context.strokeStyle = '#FEC62B';
      } else {
        context.strokeStyle = '#888888';
      }
      context.lineTo(x, y);
      context.stroke();
      context.beginPath();
      context.moveTo(x, y);
    }
    context.stroke();

    intersectionPoints.forEach((x) => {
      context.strokeStyle = '#888888';
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(x, midHeight - 15);
      context.lineTo(x, midHeight + 15);
      context.stroke();
    });

    context.fillStyle = 'rgba(254, 198, 43, 0.5)';
    context.beginPath();
    context.arc(startX, startY, 12, 0, 2 * Math.PI);
    context.fill();

    context.fillStyle = '#FEC62B';
    context.beginPath();
    context.arc(startX, startY, 8, 0, 2 * Math.PI);
    context.fill();
  }, [canvasWidth, sliderValue]);

  return (
    <div>
      <canvas ref={canvasRef} />
      {/* 슬라이더 가로 길이 `${canvasWidth}px` -> 800px로 변경 */}
      <input
        type="range"
        style={{ width: '800px', marginTop: '20px' }}
        min="0"
        max="100"
        value={sliderValue}
        onChange={(e) => setSliderValue(e.target.value)}
      />
    </div>
  );
};

export default SunriseSunset;

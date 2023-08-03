import React, { useEffect, useRef } from 'react';

const LoadingAnimation = ({ progress, duration }) => {
  const barRef = useRef(null);

  useEffect(() => {
    if (barRef.current) {
      const bar = barRef.current;
      bar.style.width = `${progress}%`;
    }
  }, [progress]);

  return (
    <div className="loading-container">
      <div
        ref={barRef}
        className="loading-bar"
        style={{ transitionDuration: `${duration}ms` }}
      ></div>
    </div>
  );
};

export default LoadingAnimation;

import React, { useContext, useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { CalendarContext } from '../App';

const AnimatedBox = animated.mesh;

const CalendarCube = ({ position, date, events }) => {
  const [hovered, setHovered] = useState(false);
  const props = useSpring({
    scale: hovered ? [1.1, 1.1, 1.1] : [1, 1, 1],
  });

  return (
    <AnimatedBox
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={props.scale}
    >
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <meshStandardMaterial color={events.length > 0 ? "#ff9999" : "#f0f0f0"} />
      <Text position={[0, 0, 0.5]} fontSize={0.3} color="#000">
        {date}
      </Text>
    </AnimatedBox>
  );
};

const CalendarScene = () => {
  const { events } = useContext(CalendarContext);

  const generateCalendar = () => {
    const calendar = [];
    for (let week = 0; week < 4; week++) {
      for (let day = 0; day < 7; day++) {
        const date = week * 7 + day + 1;
        const position = [(day - 3) * 1.1, (1.5 - week) * 1.1, 0];
        const dayEvents = events.filter(event => new Date(event.date).getDate() === date);
        calendar.push(<CalendarCube key={date} position={position} date={date} events={dayEvents} />);
      }
    }
    return calendar;
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {generateCalendar()}
      <OrbitControls />
    </>
  );
};

const Calendar3D = () => {
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    if (!gl) {
      setErrorMsg('WebGL is not supported in your browser.');
    }
  }, []);

  if (errorMsg) {
    return <div>{errorMsg}</div>;
  }

  return (
    <div style={{ height: '600px' }}>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <Canvas camera={{ position: [0, 0, 10] }}>
            <CalendarScene />
          </Canvas>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong with the 3D rendering.</div>;
    }

    return this.props.children;
  }
}

export default Calendar3D;
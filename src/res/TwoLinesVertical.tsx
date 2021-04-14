import React from 'react';

type Props = {
  color?: string;
  width?: number;
  height?: number;
  horizontal?: boolean;
};

const TwoLinesVertical = ({
  width = 16,
  height = 16,
  horizontal = false,
  color = '#000'
}: Props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      fill={color}
      className='bi bi-three-dots-vertical'
      viewBox={`0 0 ${width} ${height}`}
      transform={horizontal ? 'rotate(90)' : undefined}
    >
      <line x1='0' y1='0' x2='0' y2={height} stroke={color} />
      <line x1={width} y1='0' x2={width} y2={height} stroke={color} />
    </svg>
  );
};

export default TwoLinesVertical;

import React from 'react';

type Props = {
  size?: number;
  horizontal?: boolean;
};

const ThreeDotsVertical = ({ size = 16, horizontal = false }: Props) => {
  return (
    <div draggable={false}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        fill='currentColor'
        className='bi bi-three-dots-vertical'
        viewBox={`0 0 ${size} ${size}`}
        transform={horizontal ? 'rotate(90)' : undefined}
      >
        <path d='M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z' />
      </svg>
    </div>
  );
};

export default ThreeDotsVertical;

import React, { useEffect, useState } from 'react';

import { Orientation } from './Orientation';
import ThreeDotsVertical from './res/ThreeDotsVertical';

type Props = {
  orientation?: Orientation;
  children: React.ReactElement;
  second?: boolean;
  secondChildren: React.ReactElement;
  secondSize?: number;
  transformChildren?: (children: React.ReactElement) => React.ReactElement;
};

const DIVIDER_WIDTH = 10;

const Divider = ({
  orientation = Orientation.VERTICAL,
  second = false,
  secondChildren,
  children,
  transformChildren
}: Props) => {
  const [size, setSize] = useState(0);

  const [dragging, setDragging] = useState(false);

  const onMouseDown = () => {
    setDragging(true);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (dragging) {
        setSize((size) =>
          Math.max(
            size +
              (second ? 1 : -1) *
                (orientation === Orientation.VERTICAL
                  ? e.movementX
                  : e.movementY),
            0
          )
        );
      }
    };

    const onMouseUp = () => {
      setDragging(false);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging]);

  const firstChildrenWrapper = (
    <div
      className='first'
      style={{
        display: 'flex',
        flexDirection: orientation === Orientation.VERTICAL ? 'row' : 'column',
        flex: 1,
        width: orientation === Orientation.HORIZONTAL ? '100%' : undefined,
        height: orientation === Orientation.VERTICAL ? '100%' : undefined
      }}
    >
      {size > 0 ? (transformChildren ? children : children) : children}
    </div>
  );

  const secondChildrenWrapper =
    size > 0 ? (
      <div
        style={{
          position: 'relative',
          width: orientation === Orientation.VERTICAL ? size : undefined,
          height: orientation === Orientation.HORIZONTAL ? size : undefined
        }}
      >
        {secondChildren}
      </div>
    ) : null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: orientation === Orientation.VERTICAL ? 'row' : 'column',
        flex: 1,
        width: orientation === Orientation.VERTICAL ? '100%' : undefined,
        height: orientation === Orientation.HORIZONTAL ? '100%' : undefined
      }}
    >
      {!second ? firstChildrenWrapper : secondChildrenWrapper}
      <div
        className='divisor'
        style={{
          width: orientation === Orientation.VERTICAL ? DIVIDER_WIDTH : '100%',
          height:
            orientation === Orientation.HORIZONTAL ? DIVIDER_WIDTH : '100%',
          cursor:
            orientation === Orientation.VERTICAL ? 'col-resize' : 'row-resize',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseDown={onMouseDown}
      >
        <ThreeDotsVertical
          horizontal={orientation === Orientation.HORIZONTAL}
        />
      </div>
      {second ? firstChildrenWrapper : secondChildrenWrapper}
    </div>
  );
};

export default Divider;

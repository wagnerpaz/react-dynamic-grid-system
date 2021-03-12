import React, { useEffect, useState } from 'react';
import { Direction } from './Direction';
import { State } from './State';
import useSizeObserver from './hooks/useSizeObserver';

import ThreeDotsVertical from './res/ThreeDotsVertical';

type Props = {
  direction: Direction;
  children: React.ReactElement;
  secondChildren: React.ReactElement;
  ratio?: number;
  onOpen?: (state?: State) => void;
  transformChildren?: (children: React.ReactElement) => React.ReactElement;
};

const DIVIDER_WIDTH = 10;

const Divider = ({
  direction,
  secondChildren,
  ratio = 0,
  children,
  onOpen,
  transformChildren
}: Props) => {
  console.log('ratio', ratio);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  const [containerSize] = useSizeObserver(container);
  const [size, setSize] = useState(0);
  const [ratioState, setRatioState] = useState(ratio);
  const [dragging, setDragging] = useState(false);
  const [open, setOpen] = useState(size !== 0);

  const top = direction === Direction.TOP;
  const right = direction === Direction.RIGHT;
  const bottom = direction === Direction.BOTTOM;
  const left = direction === Direction.LEFT;

  const vertical = right || left;
  const horizontal = top || bottom;
  const containerSizeValue = vertical
    ? containerSize.width
    : containerSize.height;

  const second = top || left;

  useEffect(() => {
    if (containerSize.width === 0 && containerSize.height === 0) return;
    setRatioState(size / containerSizeValue);
  }, [size]);

  useEffect(() => {
    setSize(containerSizeValue * ratioState);
  }, [containerSize, ratioState]);

  useEffect(() => {
    if (!open && size > 0) {
      onOpen && onOpen();
      setOpen(true);
    } else if (open && size === 0) {
      setOpen(false);
    }
  }, [size]);

  const onMouseDown = () => {
    setDragging(true);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (dragging) {
        setSize((size) =>
          Math.max(
            size + (second ? 1 : -1) * (vertical ? e.movementX : e.movementY),
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
        flexDirection: vertical ? 'row' : 'column',
        width: horizontal ? '100%' : containerSize.width - size - DIVIDER_WIDTH,
        height: vertical ? '100%' : containerSize.height - size - DIVIDER_WIDTH,
        overflow: 'hidden'
      }}
    >
      {size > 0
        ? transformChildren
          ? transformChildren(children)
          : children
        : children}
    </div>
  );

  const secondChildrenWrapper =
    size > 0 ? (
      <div
        style={{
          position: 'relative',
          width: vertical ? size : undefined,
          height: horizontal ? size : undefined
        }}
      >
        {secondChildren}
      </div>
    ) : null;

  return (
    <div
      ref={(ref) => setContainer(ref)}
      style={{
        display: 'flex',
        flexDirection: vertical ? 'row' : 'column',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      {!second ? firstChildrenWrapper : secondChildrenWrapper}
      <div
        className='divisor'
        style={{
          width: vertical ? DIVIDER_WIDTH : '100%',
          height: horizontal ? DIVIDER_WIDTH : '100%',
          cursor: vertical ? 'col-resize' : 'row-resize',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseDown={onMouseDown}
      >
        <ThreeDotsVertical horizontal={horizontal} />
      </div>
      {second ? firstChildrenWrapper : secondChildrenWrapper}
    </div>
  );
};

export default Divider;

import React, { useEffect, useState } from 'react';
import { Direction4 } from './Direction4';
// eslint-disable-next-line no-unused-vars
import { State } from './State';
import useSizeObserver from './hooks/useSizeObserver';

import ThreeDotsVertical from './res/ThreeDotsVertical';

type Props = {
  color?: string;
  hideDivider?: boolean;
  direction: Direction4;
  children: React.ReactElement;
  secondChildren: React.ReactElement;
  ratio?: number;
  onRatioChanged?: (ratio: number) => void;
  onOpen?: (state?: State) => void;
  onClose?: (state?: State) => void;
  transformChildren?: (children: React.ReactElement) => React.ReactElement;
};

const DIVIDER_WIDTH = 10;

const Divider = ({
  color,
  hideDivider = false,
  direction,
  secondChildren,
  ratio = 0,
  children,
  onRatioChanged,
  onOpen,
  onClose,
  transformChildren
}: Props) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  const [containerSize] = useSizeObserver(container);
  const [size, setSize] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [open, setOpen] = useState(ratio !== 0);

  const top = direction === Direction4.TOP;
  const right = direction === Direction4.RIGHT;
  const bottom = direction === Direction4.BOTTOM;
  const left = direction === Direction4.LEFT;

  const vertical = right || left;
  const horizontal = top || bottom;
  const containerSizeValue = vertical
    ? containerSize.width
    : containerSize.height;

  const second = top || left;

  useEffect(() => {
    if (containerSize.width === 0 && containerSize.height === 0) return;
    const newRatio = containerSizeValue > 0 ? size / containerSizeValue : 0;
    if (newRatio !== ratio) {
      onRatioChanged && onRatioChanged(newRatio);
    }
  }, [size]);

  useEffect(() => {
    const newSize = containerSizeValue * ratio;
    if (size !== newSize) {
      setSize(newSize);
    }
  }, [containerSize, ratio]);

  useEffect(() => {
    if (!open && size > 10) {
      onOpen && onOpen();
      setOpen(true);
    } else if (size <= 10) {
      onRatioChanged && onRatioChanged(0);
      setOpen(false);
      onClose && onClose();
    }
  }, [size]);

  const onMouseDown = () => {
    setDragging(true);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (dragging) {
        setSize((size) => {
          const newSize = Math.max(
            size + (second ? 1 : -1) * (vertical ? e.movementX : e.movementY),
            0
          );

          setOpen((open) => {
            if (open && newSize <= 10) {
              setDragging(false);
            }
            return open;
          });

          return newSize;
        });
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
        width: horizontal
          ? '100%'
          : containerSize.width - size - (!hideDivider ? DIVIDER_WIDTH : 0),
        height: vertical
          ? '100%'
          : containerSize.height - size - (!hideDivider ? DIVIDER_WIDTH : 0),
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
        draggable={false}
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
      draggable={false}
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
        draggable={false}
        style={{
          width: vertical ? DIVIDER_WIDTH : '100%',
          height: horizontal ? DIVIDER_WIDTH : '100%',
          cursor: !hideDivider
            ? vertical
              ? 'col-resize'
              : 'row-resize'
            : undefined,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseDown={!hideDivider ? onMouseDown : undefined}
      >
        {!hideDivider ? (
          <ThreeDotsVertical horizontal={horizontal} color={color} />
        ) : null}
      </div>
      {second ? firstChildrenWrapper : secondChildrenWrapper}
    </div>
  );
};

export default Divider;

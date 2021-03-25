import React, { Fragment, useEffect, useState } from 'react';
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
  secondChildren: React.ReactElement | boolean;
  ratio?: number;
  onOpenState?: State;
  onRatioChanged?: (ratio: number) => void;
  onOpen?: (state?: State) => void;
  onClose?: (state?: State) => void;
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
  onOpenState
}: Props) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  const [containerSize] = useSizeObserver(container);
  const [size, setSize] = useState<number>(0);
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

  const [, setOldContainerSize] = useState(0);
  const [, setOldRatio] = useState(0);
  useEffect(() => {
    if (containerSizeValue === 0) return;
    setOldContainerSize((oldContainerSize) => {
      setOldRatio((oldRatio) => {
        if (oldContainerSize !== containerSizeValue || ratio !== oldRatio) {
          setSize(containerSizeValue * ratio);
        }
        return ratio;
      });
      return containerSizeValue;
    });
  }, [containerSizeValue, ratio]);

  useEffect(() => {
    if (size === 0) return;

    if (size < 10) {
      onRatioChanged && onRatioChanged(0);
    } else if (size > 10) {
      if (!open) {
        onOpen && onOpen(onOpenState);
        setOpen(true);
      }
    }
  }, [size, open]);

  useEffect(() => {
    if (containerSizeValue === 0 || size === 0) return;
    const newRatio = size / containerSizeValue;
    if (newRatio !== ratio) {
      onRatioChanged && onRatioChanged(newRatio);
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
            (size || 0) +
              (second ? 1 : -1) * (vertical ? e.movementX : e.movementY),
            0
          );

          // setOpen((open) => {
          //   if (open && newSize <= 10) {
          //     setDragging(false);
          //   }
          //   return open;
          // });

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
          : containerSize.width -
            (size || 0) -
            (!hideDivider ? DIVIDER_WIDTH : 0),
        height: vertical
          ? '100%'
          : containerSize.height -
            (size || 0) -
            (!hideDivider ? DIVIDER_WIDTH : 0),
        overflow: 'hidden'
      }}
    >
      {children}
    </div>
  );

  const secondChildrenWrapper =
    size !== null && size > 10 ? (
      <div
        draggable={false}
        style={{
          position: 'relative',
          width: vertical && size ? size : undefined,
          height: horizontal && size ? size : undefined
        }}
      >
        {secondChildren}
      </div>
    ) : null;

  return (
    <div
      ref={(ref) => setContainer(ref)}
      draggable={false}
      onDragStart={() => false}
      onDrop={() => false}
      style={{
        display: 'flex',
        flexDirection: vertical ? 'row' : 'column',
        flex: 1,
        width: '100%',
        height: '100%',
        userSelect: 'none'
      }}
    >
      {!second ? firstChildrenWrapper : secondChildrenWrapper}

      <div
        className='divisor'
        style={{
          width: vertical ? DIVIDER_WIDTH : '100%',
          height: horizontal ? DIVIDER_WIDTH : '100%',
          cursor: !hideDivider
            ? vertical
              ? 'col-resize'
              : 'row-resize'
            : undefined,
          flexDirection: vertical ? 'column' : 'row',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseDown={!hideDivider ? onMouseDown : undefined}
      >
        {!hideDivider ? (
          <Fragment>
            <ThreeDotsVertical horizontal={horizontal} color={color} />
          </Fragment>
        ) : null}
      </div>
      {second ? firstChildrenWrapper : secondChildrenWrapper}
    </div>
  );
};

export default Divider;

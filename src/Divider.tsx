import React, { Fragment, useEffect, useState } from 'react';
import { Direction4 } from './Direction4';
// eslint-disable-next-line no-unused-vars
import { State } from './State';
import useSizeObserver from './hooks/useSizeObserver';

import ThreeDotsVertical from './res/ThreeDotsVertical';

type Props = {
  id: string;
  color?: string;
  hideDivider?: boolean;
  dividerWidth?: number;
  closeWidth?: number;
  direction: Direction4;
  children: React.ReactElement;
  secondChildren: React.ReactElement | boolean;
  ratio?: number;
  onOpenState?: State;
  onRatioChanged?: (ratio: number) => void;
  onOpen?: (id: string, state?: State) => void;
  onClose?: (id: string, state?: State) => void;
  onCloseSecond?: (id: string, state?: State) => void;
  onInteracting?: (id: string, interacting: boolean) => void;
};

let lastClientX: number;
let lastClientY: number;

const Divider = ({
  id,
  color,
  hideDivider = false,
  dividerWidth = 6,
  closeWidth = 6,
  direction,
  secondChildren,
  ratio = 0,
  children,
  onRatioChanged,
  onOpen,
  onClose,
  onCloseSecond,
  onInteracting
}: Props) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  const [containerSize] = useSizeObserver(container);
  const [size, setSize] = useState<number>(-99999);
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
    if (dragging) {
      onInteracting && onInteracting(id, dragging);
    } else {
      setTimeout(() => {
        onInteracting && onInteracting(id, dragging);
      }, 200);
    }
  }, [dragging]);

  useEffect(() => {
    if (containerSizeValue === 0) return;

    setSize(containerSizeValue * ratio);
  }, [containerSizeValue, ratio]);

  const [, setOldRatio] = useState(-1);
  useEffect(() => {
    if (size === -99999 && !dragging) return;

    if (size < closeWidth) {
      if (open) {
        setDragging(false);
        onRatioChanged && onRatioChanged(0);
        onClose && onClose(id);
        setOpen(false);
        return;
      }
    } else if (size > dividerWidth) {
      if (!open) {
        onOpen && onOpen(id);
        setOpen(true);
        onRatioChanged && onRatioChanged(ratio);
      } else {
        if (size > containerSizeValue - dividerWidth - closeWidth) {
          if (dragging) {
            onCloseSecond && onCloseSecond(id);
            setDragging(false);
          }
          return;
        }
      }
    }

    if (containerSizeValue === 0 || size === 0 || !open) return;
    const newRatio = size / containerSizeValue;
    setOldRatio((oldRatio) => {
      if (newRatio !== oldRatio) {
        onRatioChanged && onRatioChanged(newRatio);
      }
      return newRatio;
    });
  }, [dragging, size, open, onRatioChanged, onOpen, onClose, onCloseSecond]);

  const onMouseDown = () => {
    setDragging(true);
    lastClientX = 0;
    lastClientY = 0;
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (dragging) {
        console.log(e.clientX, lastClientX);
        const movementX = lastClientX ? e.clientX - lastClientX : 0;
        const movementY = lastClientY ? e.clientY - lastClientY : 0;
        setSize((size) => {
          const newSize = Math.min(
            Math.max(
              (size || 0) +
                (second ? 1 : -1) * (vertical ? movementX : movementY),
              0
            ),
            containerSizeValue - dividerWidth
          );

          return newSize;
        });
        lastClientX = e.clientX;
        lastClientY = e.clientY;
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
            (!hideDivider ? dividerWidth : 0),
        height: vertical
          ? '100%'
          : containerSize.height -
            (size || 0) -
            (!hideDivider ? dividerWidth : 0),
        overflow: 'hidden'
      }}
    >
      {children}
    </div>
  );

  const secondChildrenWrapper =
    size !== null && size > dividerWidth ? (
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
          width: vertical ? dividerWidth : '100%',
          height: horizontal ? dividerWidth : '100%',
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
        {...(!hideDivider ? { onMouseDown } : null)}
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

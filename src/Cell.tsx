import React, { useState } from 'react';
import MultiDivider from './MultiDivider';
import { Direction9 } from './Direction9';

type Props = {
  direction: Direction9;
  children: React.ReactElement;
};

const Cell = ({ children, direction }: Props) => {
  const [top, setTop] = useState<React.ReactElement>(<div />);
  const [right, setRight] = useState<React.ReactElement>(<div />);
  const [bottom, setBottom] = useState<React.ReactElement>(<div />);
  const [left, setLeft] = useState<React.ReactElement>(<div />);
  const [childrenS, setChildrenS] = useState<React.ReactElement>(children);

  const ph = (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue'
      }}
    >
      APP
    </div>
  );

  const openLeft = () => {
    setLeft(<Cell direction={Direction9.LEFT}>{ph}</Cell>);
  };

  const openTopLeft = () => {
    setTop(<Cell direction={Direction9.TOP_LEFT}>{ph}</Cell>);
    setChildrenS(ph);
  };

  const openBottomLeft = () => {
    setBottom(<Cell direction={Direction9.BOTTOM_LEFT}>{ph}</Cell>);
    setChildrenS(ph);
  };

  const openRight = () => {
    setRight(<Cell direction={Direction9.RIGHT}>{ph}</Cell>);
  };

  const openTopRight = () => {
    setTop(<Cell direction={Direction9.TOP_RIGHT}>{ph}</Cell>);
    setChildrenS(ph);
  };

  const openBottomRight = () => {
    setBottom(<Cell direction={Direction9.BOTTOM_RIGHT}>{ph}</Cell>);
    setChildrenS(ph);
  };

  switch (direction) {
    case Direction9.CENTER:
      return (
        <MultiDivider
          right={right}
          rightOnOpen={openRight}
          left={left}
          leftOnOpen={openLeft}
        >
          {childrenS}
        </MultiDivider>
      );

    case Direction9.LEFT:
      return (
        <MultiDivider
          top={top}
          topOnOpen={openTopLeft}
          bottom={bottom}
          bottomOnOpen={openBottomLeft}
          left={left}
          leftOnOpen={openLeft}
        >
          {childrenS}
        </MultiDivider>
      );

    case Direction9.TOP_LEFT:
      return (
        <MultiDivider top={top} topOnOpen={openTopLeft}>
          {childrenS}
        </MultiDivider>
      );

    case Direction9.BOTTOM_LEFT:
      return (
        <MultiDivider bottom={bottom} bottomOnOpen={openBottomLeft}>
          {childrenS}
        </MultiDivider>
      );

    case Direction9.RIGHT:
      return (
        <MultiDivider
          top={top}
          topOnOpen={openTopRight}
          bottom={bottom}
          bottomOnOpen={openBottomRight}
          right={right}
          rightOnOpen={openRight}
        >
          {childrenS}
        </MultiDivider>
      );

    case Direction9.TOP_RIGHT:
      return (
        <MultiDivider top={top} topOnOpen={openTopRight}>
          {childrenS}
        </MultiDivider>
      );

    case Direction9.BOTTOM_RIGHT:
      return (
        <MultiDivider bottom={bottom} bottomOnOpen={openBottomRight}>
          {childrenS}
        </MultiDivider>
      );
  }
  return null;
};

export default Cell;

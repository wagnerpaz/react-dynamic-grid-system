import React, { useState } from 'react';
import MultiDivider from './MultiDivider';
import { Direction9 } from './Direction9';

type Props = {
  direction: Direction9;
  children: React.ReactElement;
};

const Cell = ({ children, direction }: Props) => {
  const [top, setTop] = useState<React.ReactElement>(<div />);
  const [right] = useState<React.ReactElement>(<div />);
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

  switch (direction) {
    case Direction9.CENTER:
      return (
        <MultiDivider
          top={top}
          right={right}
          bottom={bottom}
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
        <MultiDivider bottom={bottom} topOnOpen={openBottomLeft}>
          {childrenS}
        </MultiDivider>
      );

    case Direction9.ONLY_LEFT:
      return <MultiDivider left={left}>{childrenS}</MultiDivider>;

    case Direction9.ONLY_TOP:
      return <MultiDivider top={top}>{childrenS}</MultiDivider>;
  }
  return null;
};

export default Cell;

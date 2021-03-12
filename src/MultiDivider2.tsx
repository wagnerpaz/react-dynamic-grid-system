import React from 'react';
import { Direction } from './Direction';
import Divider from './Divider';

type DirectionProps = {
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
};

type Props = {
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
  children: React.ReactElement;
  secondChildren: React.ReactElement;
};

const MultiDivider2 = ({
  top,
  right,
  bottom,
  left,
  children,
  secondChildren
}: Props) => {
  const secondChildrenWrapper = ({
    top,
    right,
    bottom,
    left
  }: DirectionProps) => (
    <MultiDivider2
      secondChildren={secondChildren}
      top={!bottom}
      right={!left}
      bottom={!top}
      left={!right}
    >
      {secondChildren}
    </MultiDivider2>
  );

  const topWrapper = (children: React.ReactElement): React.ReactElement => (
    <Divider
      direction={Direction.TOP}
      secondChildren={secondChildrenWrapper({ top: true })}
      transformChildren={(children: React.ReactElement) => {
        return (
          <MultiDivider2
            left={!left}
            right={!right}
            secondChildren={secondChildrenWrapper({ left: true, right: true })}
          >
            {children}
          </MultiDivider2>
        );
      }}
    >
      {children}
    </Divider>
  );

  const rightWrapper = (children: React.ReactElement): React.ReactElement => (
    <Divider
      direction={Direction.RIGHT}
      secondChildren={secondChildrenWrapper({ right: true })}
      transformChildren={(children: React.ReactElement) => {
        return (
          <MultiDivider2
            top={!top}
            bottom={!bottom}
            secondChildren={secondChildrenWrapper({ top: true, bottom: true })}
          >
            {children}
          </MultiDivider2>
        );
      }}
    >
      {children}
    </Divider>
  );

  const bottomWrapper = (children: React.ReactElement): React.ReactElement => (
    <Divider
      direction={Direction.BOTTOM}
      secondChildren={secondChildrenWrapper({ bottom: true })}
      transformChildren={(children: React.ReactElement) => {
        console.log('bottom transform');
        return (
          <MultiDivider2
            left={!left}
            right={!right}
            secondChildren={secondChildrenWrapper({ left: true, right: true })}
          >
            {children}
          </MultiDivider2>
        );
      }}
    >
      {children}
    </Divider>
  );

  const leftWrapper = (children: React.ReactElement): React.ReactElement => (
    <Divider
      direction={Direction.LEFT}
      secondChildren={secondChildrenWrapper({ left: true })}
      transformChildren={(children: React.ReactElement) => {
        return (
          <MultiDivider2
            top={!top}
            bottom={!bottom}
            secondChildren={secondChildrenWrapper({ top: true, bottom: true })}
          >
            {children}
          </MultiDivider2>
        );
      }}
    >
      {children}
    </Divider>
  );

  let child: React.ReactElement = children;
  if (right) {
    child = rightWrapper(child);
  }
  if (left) {
    child = leftWrapper(child);
  }
  if (bottom) {
    child = bottomWrapper(child);
  }
  if (top) {
    child = topWrapper(child);
  }

  return child;
};

export default MultiDivider2;

import React from 'react';
import Divider from './Divider';
import { Orientation } from './Orientation';

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

const MultiDivider = ({
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
    <MultiDivider
      secondChildren={secondChildren}
      top={!bottom}
      right={!left}
      bottom={!top}
      left={!right}
    >
      {secondChildren}
    </MultiDivider>
  );

  const topWrapper = (children: React.ReactElement): React.ReactElement => (
    <Divider
      orientation={Orientation.HORIZONTAL}
      second
      secondChildren={secondChildrenWrapper({ top: true })}
      transformChildren={(children: React.ReactElement) => {
        return (
          <MultiDivider
            left={!left}
            right={!right}
            secondChildren={secondChildrenWrapper({ left: true, right: true })}
          >
            {children}
          </MultiDivider>
        );
      }}
    >
      {children}
    </Divider>
  );

  const rightWrapper = (children: React.ReactElement): React.ReactElement => (
    <Divider
      orientation={Orientation.VERTICAL}
      second
      secondChildren={secondChildrenWrapper({ right: true })}
      transformChildren={(children: React.ReactElement) => {
        return (
          <MultiDivider
            top={!top}
            bottom={!bottom}
            secondChildren={secondChildrenWrapper({ top: true, bottom: true })}
          >
            {children}
          </MultiDivider>
        );
      }}
    >
      {children}
    </Divider>
  );

  const bottomWrapper = (children: React.ReactElement): React.ReactElement => (
    <Divider
      orientation={Orientation.HORIZONTAL}
      secondChildren={secondChildrenWrapper({ bottom: true })}
      transformChildren={(children: React.ReactElement) => {
        console.log('bottom transform');
        return (
          <MultiDivider
            left={!left}
            right={!right}
            secondChildren={secondChildrenWrapper({ left: true, right: true })}
          >
            {children}
          </MultiDivider>
        );
      }}
    >
      {children}
    </Divider>
  );

  const leftWrapper = (children: React.ReactElement): React.ReactElement => (
    <Divider
      orientation={Orientation.VERTICAL}
      secondChildren={secondChildrenWrapper({ left: true })}
      transformChildren={(children: React.ReactElement) => {
        return (
          <MultiDivider
            top={!top}
            bottom={!bottom}
            secondChildren={secondChildrenWrapper({ top: true, bottom: true })}
          >
            {children}
          </MultiDivider>
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

export default MultiDivider;

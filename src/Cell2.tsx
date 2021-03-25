import get from 'lodash.get';
import set from 'lodash.set';
import React, { useEffect, useState } from 'react';
import { Direction9 } from '.';
import MultiDivider from './MultiDivider';
// eslint-disable-next-line no-unused-vars
import { State } from './State';

type Props = {
  color?: string;
  hideDivider?: boolean;
  state: State;
  onStateChanged?: (state: State) => void;
  Component: React.FunctionComponent<any>;
  children: React.ReactElement;
};

const Cell2 = ({
  color,
  hideDivider,
  state,
  Component,
  onStateChanged,
  children
}: Props) => {
  const [render, setRender] = useState<React.ReactElement | null>(null);
  useEffect(() => {
    console.log('render');
    const renderState = (
      direction: Direction9,
      id?: string
    ): React.ReactElement => {
      const newId = `${
        direction !== Direction9.CENTER
          ? (id !== '' ? id + '.' : '') +
            `${
              direction === Direction9.TOP_LEFT ||
              direction === Direction9.TOP_RIGHT
                ? Direction9.TOP
                : direction === Direction9.BOTTOM_LEFT ||
                  direction === Direction9.BOTTOM_RIGHT
                ? Direction9.BOTTOM
                : direction
            }`
          : ''
      }`;
      const cellState = newId ? get(state, newId) : state;

      const onRatioChanged = (direction: Direction9) => (ratio: number) => {
        let newState;
        if (ratio > 0) {
          newState = {
            ...set(
              state,
              `${newId ? newId + '.' : ''}${direction}.ratio`,
              ratio
            )
          };
        } else {
          newState = {
            ...set(state, `${newId ? newId + '.' : ''}${direction}`, undefined)
          };
        }
        onStateChanged && onStateChanged(newState);
      };

      const onPropsChanged = (props: any) => {
        const newState = {
          ...set(state, `${newId ? newId + '.' : ''}props`, props)
        };
        onStateChanged && onStateChanged(newState);
      };

      if (direction === Direction9.CENTER) {
        return (
          <MultiDivider
            color={color}
            hideDividers={hideDivider}
            right={
              cellState.right ? renderState(Direction9.RIGHT, newId) : true
            }
            rightRatio={cellState?.right?.ratio}
            rightOnRatioChanged={onRatioChanged(Direction9.RIGHT)}
            left={cellState.left ? renderState(Direction9.LEFT, newId) : true}
            leftRatio={cellState?.left?.ratio}
            leftOnRatioChanged={onRatioChanged(Direction9.LEFT)}
          >
            {children}
          </MultiDivider>
        );
      }

      if (direction === Direction9.LEFT) {
        return (
          <MultiDivider
            color={color}
            hideDividers={hideDivider}
            top={cellState.top ? renderState(Direction9.TOP_LEFT, newId) : true}
            topRatio={cellState.top?.ratio}
            topOnRatioChanged={onRatioChanged(Direction9.TOP)}
            left={cellState.left ? renderState(Direction9.LEFT, newId) : true}
            leftRatio={cellState.left?.ratio}
            leftOnRatioChanged={onRatioChanged(Direction9.LEFT)}
            bottom={
              cellState.bottom
                ? renderState(Direction9.BOTTOM_LEFT, newId)
                : true
            }
            bottomRatio={cellState.bottom?.ratio}
            bottomOnRatioChanged={onRatioChanged(Direction9.BOTTOM)}
          >
            <Component
              {...cellState.props}
              id={newId}
              onPropsChanged={onPropsChanged}
            />
          </MultiDivider>
        );
      }

      if (direction === Direction9.TOP_LEFT) {
        return (
          <MultiDivider
            color={color}
            hideDividers={hideDivider}
            top={cellState.top ? renderState(Direction9.TOP_LEFT, newId) : true}
            topRatio={cellState?.top?.ratio}
            topOnRatioChanged={onRatioChanged(Direction9.TOP)}
          >
            <Component
              {...cellState.props}
              id={newId}
              onPropsChanged={onPropsChanged}
            />
          </MultiDivider>
        );
      }

      if (direction === Direction9.BOTTOM_LEFT) {
        return (
          <MultiDivider
            color={color}
            hideDividers={hideDivider}
            bottom={
              cellState.bottom
                ? renderState(Direction9.BOTTOM_LEFT, newId)
                : true
            }
            bottomRatio={cellState?.bottom?.ratio}
            bottomOnRatioChanged={onRatioChanged(Direction9.BOTTOM)}
          >
            <Component
              {...cellState.props}
              id={newId}
              onPropsChanged={onPropsChanged}
            />
          </MultiDivider>
        );
      }

      if (direction === Direction9.RIGHT) {
        return (
          <MultiDivider
            color={color}
            hideDividers={hideDivider}
            top={
              cellState.top ? renderState(Direction9.TOP_RIGHT, newId) : true
            }
            topRatio={cellState.top?.ratio}
            topOnRatioChanged={onRatioChanged(Direction9.TOP)}
            right={
              cellState.right ? renderState(Direction9.RIGHT, newId) : true
            }
            rightRatio={cellState.right?.ratio}
            rightOnRatioChanged={onRatioChanged(Direction9.RIGHT)}
            bottom={
              cellState.bottom
                ? renderState(Direction9.BOTTOM_RIGHT, newId)
                : true
            }
            bottomRatio={cellState.bottom?.ratio}
            bottomOnRatioChanged={onRatioChanged(Direction9.BOTTOM)}
          >
            <Component
              {...cellState.props}
              id={newId}
              onPropsChanged={onPropsChanged}
            />
          </MultiDivider>
        );
      }

      if (direction === Direction9.TOP_RIGHT) {
        return (
          <MultiDivider
            color={color}
            hideDividers={hideDivider}
            top={
              cellState.top ? renderState(Direction9.TOP_RIGHT, newId) : true
            }
            topRatio={cellState?.top?.ratio}
            topOnRatioChanged={onRatioChanged(Direction9.TOP)}
          >
            <Component
              {...cellState.props}
              id={newId}
              onPropsChanged={onPropsChanged}
            />
          </MultiDivider>
        );
      }

      if (direction === Direction9.BOTTOM_RIGHT) {
        return (
          <MultiDivider
            color={color}
            hideDividers={hideDivider}
            bottom={
              cellState.bottom
                ? renderState(Direction9.BOTTOM_RIGHT, newId)
                : true
            }
            bottomRatio={cellState?.bottom?.ratio}
            bottomOnRatioChanged={onRatioChanged(Direction9.BOTTOM)}
          >
            <Component
              {...cellState.props}
              id={newId}
              onPropsChanged={onPropsChanged}
            />
          </MultiDivider>
        );
      }

      return <div />;
    };

    setRender(renderState(Direction9.CENTER));
  }, [state, color, hideDivider]);

  return render;
};

export default Cell2;

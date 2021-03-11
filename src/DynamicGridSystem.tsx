import React from 'react';

type Props = {
  children: React.ReactElement;
};

const DynamicGridSystem = ({ children }: Props) => {
  const main = (
    <div
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}
    >
      {children}
    </div>
  );

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'red'
      }}
    >
      {main}
    </div>
  );
};

export default DynamicGridSystem;

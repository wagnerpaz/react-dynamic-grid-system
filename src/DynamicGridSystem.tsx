import React from 'react';

type Props = {
  backgroundColor?: string;
  children: React.ReactElement;
};

const DynamicGridSystem = ({ children, backgroundColor }: Props) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor
      }}
    >
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
    </div>
  );
};

export default DynamicGridSystem;

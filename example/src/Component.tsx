import React, { useState } from 'react';

type Props = {
  count: number;
  onPropsChanged: (props: any) => void;
};

const Component = ({ count = 0, onPropsChanged }: Props) => {
  const [countS, setCountS] = useState(count);
  return (
    <>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'blue'
        }}
      >
        {count}
      </div>
      <button
        onClick={() => {
          setCountS((countS) => countS + 1);
          onPropsChanged && onPropsChanged({ count: countS + 1 });
        }}
      >
        +1
      </button>
    </>
  );
};

export default Component;

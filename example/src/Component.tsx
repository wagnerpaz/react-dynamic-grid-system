import React, { useEffect, useState } from 'react';

type Props = {
  id: string;
  count: number;
  onPropsChanged: (props: any) => void;
  onCloseListener: (listener: () => void) => void;
};

const Component = ({ id, count = 0, onPropsChanged }: Props) => {
  const [countS, setCountS] = useState(count);

  useEffect(() => {
    setCountS(count);
  }, [count]);

  useEffect(() => {
    return () => {
      console.log('destroied');
    };
  }, []);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'blue'
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'blue',
          textAlign: 'center'
        }}
      >
        {id}
        <br />
        {countS}
      </div>
      <button
        onClick={() => {
          setCountS((countS) => countS + 1);
          onPropsChanged && onPropsChanged({ count: countS + 1 });
        }}
      >
        +1
      </button>
    </div>
  );
};

export default Component;

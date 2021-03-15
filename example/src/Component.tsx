import React, { useEffect, useState } from 'react';

type Props = {
  count: number;
  onPropsChanged: (props: any) => void;
  onCloseListener: (listener: () => void) => void;
};

const Component = ({ count = 0, onPropsChanged, onCloseListener }: Props) => {
  const [countS, setCountS] = useState(count);

  useEffect(() => {
    onCloseListener(() => {
      console.log('closed', count);
    });
  }, [onCloseListener, count]);

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

import * as React from 'react';
import { LineWave } from 'react-loader-spinner';
import './loader.css';

const Loader = (props: any) => {
  return (
    <div className={`popup`} style={{ ...props.containerStyle }}>
      <LineWave color={props.color || 'skyblue'} />
    </div>
  );
};

export default Loader;

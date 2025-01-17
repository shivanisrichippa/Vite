import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className="title-container">
      <h1>{text1}</h1>
      <h2>{text2}</h2>
    </div>
  );
}

export default Title;

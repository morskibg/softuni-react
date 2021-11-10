import React from "react";

const Test = ({ clickButton }) => {
  return (
    <div>
      <button className='btn btn-light btn-block' onClick={clickButton}>
        Test
      </button>
    </div>
  );
};

export default Test;

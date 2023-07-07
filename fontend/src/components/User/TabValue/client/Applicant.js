import React, { useState } from "react";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";

const Applicant = ({ val, setMailData, mailData, ind }) => {
  const [checked, setChecked] = useState(true);
  const handleClick = () => {
    if (checked === true) {
      setChecked(false);
      setMailData([...mailData, val]);
    } else {
      const updateData = mailData.slice(0, ind);
      setChecked(true);
      setMailData(updateData);
    }
  };
  return (
    <div className="applied-developer" key={ind}>
      <div onClick={handleClick}>
        {checked ? <GrCheckbox /> : <GrCheckboxSelected />}
        <img src={val.user.avatar.url} alt="developer image" />
        <p>{val.user.name}</p>
      </div>
      <button>
        <a href={val.cv} download={val.cv}>
          Download CV
        </a>
      </button>
    </div>
  );
};

export default Applicant;

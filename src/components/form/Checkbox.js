import React from "react";
import './FormInput.css'

const Checkbox = ({label,onChangeRadio,...inputProps}) => {
  return (
    <div className="check-com"  >
      <div className="check-radio" >
        <input className="check-input"{...inputProps} onChange={onChangeRadio} required/><label className="label3">{label}</label>
      </div>
    </div>
  )
}

export default Checkbox;
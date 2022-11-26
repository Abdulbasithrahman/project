import React from 'react'
import './FormInput.css'
const FormInput = (props) => {

    //states

    const [focus, setFocus] = React.useState(false)

    const { label, errorMessage, id, onChange, ...inputProps } = props;

    //functions

    const handleFocus = (e) => {
        setFocus(true);
    }

    return (
        <div className='form-input'>
            <label className='label'>{label}</label>

            <input {...inputProps}
                onChange={onChange}
                focus={focus.toString()}
                onFocus={() =>
                    inputProps.name === "confirmpassword" && setFocus(true)
                }
                onBlur={handleFocus} />
            <span>{errorMessage}</span>
        </div>
    )
}

export default FormInput;
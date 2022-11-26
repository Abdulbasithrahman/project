import React from 'react'
import FormInput from '../../components/form/FormInput';
import Checkbox from '../../components/form/Checkbox'
import { useNavigate, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUp.css'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const SignUp = () => {

  //states

  const [signup, setSignup] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    accountnumber: "",
    password: "",
    confirmpassword: "",
    gender: "",
    department: "manager",
  })

  //initialization

  const navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: "firstname",
      type: "text",
      placeholder: "First Name",
      errorMessage: "First Name should 3-24 characters",
      label: "First Name",
      pattern: "[a-zA-Z ]{3,24}$",
      required: true,
    },
    {
      id: 2,
      name: "lastname",
      type: "text",
      placeholder: "Last Name",
      errorMessage: "Last Name should 3-10 characters",
      pattern: "[a-zA-Z ]{3,24}$",
      label: "Last Name",
      required: true
    }
    , {
      id: 3,
      name: "accountnumber",
      type: "text",
      label: "Account Number",
      placeholder: "Account Number",
      min: "0",
      maxLength: "11",
      pattern: "^[0-9]{11}$",
      errorMessage: "Please enter only 11 digit",
      required: true
    },
    {
      id: 4,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "please enter a valid email id",
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$",
      label: "Email",
      required: true
    },
    {
      id: 5,
      name: "password",
      type: "text",
      placeholder: "Password",
      errorMessage: "password should be 8-20 characters and 1 uppercase character,1 special character,1 number",
      label: "Password",
      pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$",
      required: true
    }, {
      id: 6,
      name: "confirmpassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "password don't match",
      label: "Confirm Password",
      pattern: signup.password,
      required: true
    }
  ]

  const checkInputs = [{
    id: 7,
    name: "gender",
    type: "radio",
    label: "Male",
    value: "Male",
    required: true
  },
  {
    id: 8,
    name: "gender",
    type: "radio",
    label: "Female",
    value: "Female",
    required: true
  }, {
    id: 9,
    name: "gender",
    type: "radio",
    label: "Not prefer to say",
    value: "Not prefer to say",
    required: true
  }
  ]

  //functions

  const onChange = (e) => {
    setSignup({
      ...signup,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.setItem("reload", JSON.stringify(signup));
    localStorage.setItem("user", JSON.stringify(signup));
    toast.success('Account Created Successfully', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
    await sleep(3000)
    navigate("/login");
  }

  const onChangeSelect = (e) => {
    setSignup({
      ...signup,
      department: e.target.value
    });
  };

  return (
    <div className='signup'>
      <div className='header'>
        <img className='icon1' src='icon.png' alt='photo' />
        <h1 className='header-letter'>Sign<h1 className='header-letter-2'>Up</h1></h1>
      </div>
      <form className='form' onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput key={input.id}
            {...input} value={signup[input.name]}
            onChange={onChange} />
        ))}
        <label className='labels'>Department</label>
        <select onChange={onChangeSelect} className="form-select">
          <option defaultValue disabled>
            Select Department
          </option>
          <option value="manager">Manager</option>
          <option value="associate">Associate</option>
          <option value="customer">Customer</option>
        </select>
        <label className='labels1'>Gender</label>
        {checkInputs.map((checkInput) => (
          <Checkbox key={checkInput.id} onChangeRadio={onChange}
            {...checkInput} />
        ))}
        <Button className='signup-submit' type='submit' variant="success">Submit</Button>
        <p className='bottom'>Already have an account
          <Link to="/login" style={{ padding: "4px", color: "black", fontWeight: "bold" }}>
            Login here
          </Link>
        </p>
        <ToastContainer />
      </form>
    </div>
  )
}

export default SignUp

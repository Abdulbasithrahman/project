import React from 'react';
import FormInput from '../../components/form/FormInput';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader.json'
import Lottie from 'lottie-react'
import './SignIn.css'


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function SignIn() {

  //initialization

  const navigate = useNavigate()

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "please enter valid email address",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "password should be 8-20 characters and 1 character,1 special character,1 number",
      label: "Password",
      pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$",
      required: true
    }]

  //states

  const [signin, setSignin] = React.useState({
    email: "",
    password: ""
  })

  const [loading, setLoading] = React.useState(false)

  const onChange = (e) => {
    setSignin({
      ...signin,
      [e.target.name]: e.target.value
    })
  }

  //funcions

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loggeduser = JSON.parse(localStorage.getItem("user"));
    if (signin.email === loggeduser.email && signin.password === loggeduser.password) {
      sessionStorage.setItem("loggedinreload", true)
      localStorage.setItem("loggedin", true)
      toast.success('Account Login Successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      await sleep(3000)
      navigate('/')

    }
    else {
      toast.error('Please Enter correct Password or Mail id!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  //useEffect

  React.useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 4000)
  }, [])

  return (
    <div className='loader'>
      {
        loading ?
          <Lottie animationData={Loader}
            className="animation"
          />

          :
          <div className='signin'>
            <div className='header'>
              <img className='icon' src='icon.png' alt='photo' />
              <h1 className='header-letter'>Sign<h1 className='header-letter-2'>In</h1></h1>
            </div>
            <form className='form' onSubmit={handleSubmit}>


              {inputs.map((input) => (
                <FormInput key={input.id}
                  {...input} value={signin[input.name]}
                  onChange={onChange} />
              ))}
              <Button className='signup-submit' type='submit' variant="success" >Submit</Button>
              <p className='bottom'>Don't have an account
                <Link to="/register" style={{ padding: "4px", color: "black", fontWeight: "bold" }}>
                  <u>Register here</u>
                </Link>
              </p>
              <ToastContainer />
            </form>

          </div>
      }
    </div>
  );
}

export default SignIn;
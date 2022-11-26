import { useNavigate } from 'react-router-dom';
import './Logout.css'
const Logout = () => {
  const navigate = useNavigate()

  const userName = JSON.parse(localStorage.getItem("user"))

  const handleLogout = () => {
    localStorage.removeItem("loggedin")
    sessionStorage.removeItem("loggedinreload")
    navigate("/login")
  }

  return (
    <button className='btn btn-danger logout' onClick={handleLogout}>Logout</button>
  );
}

export default Logout;

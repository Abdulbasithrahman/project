import './App.css';
import Home from './homepage/Home';
import SignIn from './views/signIn/SignIn';
import SignUp from './views/signUp/SignUp';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './protectedRoutes/ProtectedRoutes';


function App() {
  return (
    <div className="App" >
      <Routes>
        <Route path='/register' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/' element={<ProtectedRoutes />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

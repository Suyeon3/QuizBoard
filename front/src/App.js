import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Room from './component/Room';
import { LoginProvider } from './context/LoginContext';
import { RoomNameProvider } from './context/RoomNameContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LoginProvider>
        <RoomNameProvider>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/room' element={<Room />}></Route>
            </Routes>
        </RoomNameProvider>
        </LoginProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

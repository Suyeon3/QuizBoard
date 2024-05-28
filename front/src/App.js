import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Room from './component/Room';
import { LoginProvider } from './context/LoginContext';
import { RoomNameProvider } from './context/RoomNameContext';
import { HostProvider } from './context/HostContext';
import { PlayGameStateProvider } from './context/PlayGameStateContext';
import { CategoryProvider } from './context/CategoryContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HostProvider>
          <LoginProvider>
            <RoomNameProvider>
              <PlayGameStateProvider>
                <CategoryProvider>
                  <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/room' element={<Room />}></Route>
                  </Routes>
                </CategoryProvider>
              </PlayGameStateProvider>
            </RoomNameProvider>
          </LoginProvider>
        </HostProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

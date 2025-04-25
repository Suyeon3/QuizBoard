import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Room from './component/Room';
import { LoginProvider } from './context/LoginContext';
import { RoomNameProvider } from './context/RoomNameContext';
import { HostProvider } from './context/HostContext';
import { PlayGameStateProvider } from './context/PlayGameStateContext';
import { CategoryProvider } from './context/CategoryContext';
import Join from './pages/Join';
import Login from './pages/Login'
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
      <Login />
    </CookiesProvider>
  );
}

export default App;

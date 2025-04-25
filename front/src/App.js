import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Room from './component/Room';
import { LoginProvider } from './context/LoginContext';
import { RoomNameProvider } from './context/RoomNameContext';
import { HostProvider } from './context/HostContext';
import { PlayGameStateProvider } from './context/PlayGameStateContext';
import { CategoryProvider } from './context/CategoryContext';
import Join from './pages/Join';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
      <Join />
    </CookiesProvider>
  );
}

export default App;

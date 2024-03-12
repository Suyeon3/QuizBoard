import socketIo from "./server";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import { useEffect, useState } from 'react';
import { LoginProvider } from "./context/LoginContext";

function App() {
  /*
  const [socket, setSocket] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setSocket(socketIo);
  },[])

  useEffect(() => {

    const askUserName = () => {
      const userName = prompt('당신의 이름을 입력하세요');
      console.log(userName);

      socketIo.emit('login', userName, (res)=>{
        console.log("Res", res);
        if(res?.ok) {
          setUser(res.data);
        }
      });
    }

    if (socket) {
      askUserName();
    }

    return (() => {
      if (socket) {
        socket.disconnect();
      }
    })
  }, [socket])
*/

  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

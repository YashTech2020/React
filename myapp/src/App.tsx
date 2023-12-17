import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [loggedIn, setLoggedIn] = useState(true);

  const onUpdateActivity = () => {
    if (loggedIn) {
      const session = Date.now() + 5000;
      localStorage.setItem("exTime", session.toString());
    }
  }

  const onCheckInActivity = () => {
    const exTime = localStorage.getItem('exTime');
    if (Number(exTime) < Date.now())
      setLoggedIn(false)
  }


  useEffect(() => {
    const interval = setInterval(() => { onCheckInActivity(); }, 1000)

    return () => {
      clearInterval(interval);
    }
  }, [])


  useEffect(() => {
    window.addEventListener('click', onUpdateActivity)
    window.addEventListener('scroll', onUpdateActivity)
    window.addEventListener('keypress', onUpdateActivity)
    window.addEventListener('mousemove', onUpdateActivity)

    return () => {
      window.addEventListener('click', onUpdateActivity)
      window.addEventListener('scroll', onUpdateActivity)
      window.addEventListener('keypress', onUpdateActivity)
      window.addEventListener('mousemove', onUpdateActivity)
    }
  }, [])

  return (
    <div className="App">

      Logged In : {loggedIn.toString()}
    </div>
  );
}

export default App;

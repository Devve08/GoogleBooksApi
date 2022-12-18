
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BookViewer } from "./components/BookViewer";
import Header from "./components/Header";
import Loading from "./components/Loading";
import ErrorScreen from "./screens/ErrorScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userExists = localStorage.getItem("userData");
    if (userExists) {
      setIsLoggedIn(true);
      setIsLoading(false);
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }, []);
  return (
    <BrowserRouter>
      {isLoading ? <Loading /> : isLoggedIn ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<HomeScreen/>} />
            <Route path="/bookviewer/:id" element={<BookViewer/>} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="*" element={<ErrorScreen />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;

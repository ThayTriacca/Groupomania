import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import MainPage from './pages/MainPage';
import SignUp from  './pages/SignUp';
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile';

const AppRouter = () => {
    const [loggedIn, setLoggedIn] = React.useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/create-post" element={<CreatePost/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route
                    path="*"
                    element={
                        loggedIn ? (
                            <Navigate to="/main" />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
};

export default AppRouter;
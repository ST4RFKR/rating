import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Box } from '@mui/material';
import Main from './pages/Main';
import StorePage from './components/StorePage';
import EmployeePage from './components/EmployeePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Box>
          <Link to={'/'}>Main</Link>
          <Link to={'/second'}>Second</Link>
        </Box>

        <Box>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/store/:id" element={<StorePage />} />
            <Route path="/employee/:id" element={<EmployeePage />} />
          </Routes>
        </Box>
      </Router>
    </div>
  );
}

export default App;

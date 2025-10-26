import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Users from './components/User';
import UserDetailsWrapper from './components/UserDetailsWrapper';
import './App.css'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <DataProvider>
      <div className='app'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/user/:id" element={<UserDetailsWrapper />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </div>
    </DataProvider>
  )
}

export default App

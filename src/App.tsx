import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import './services/firebase'
import { AuthContextProvider } from './contexts/AuthContext'

import './styles/global.scss'
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/rooms/new' exact component={NewRoom} />
            <Route path='/rooms/:id' component={Room} />
            <Route path='/admin/rooms/:id' component={AdminRoom} />
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;

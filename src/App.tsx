import {BrowserRouter, Route} from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom'; 

import { AuthContextProvieder } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvieder>
          <Route path="/" exact component={Home}/>
          <Route path="/rooms/new" component={NewRoom}/>
      </AuthContextProvieder>
    </BrowserRouter>
  );
}

export default App;




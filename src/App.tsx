import {BrowserRouter, Route, Switch} from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom'; 
import { Room } from './pages/Room';

import { AuthContextProvieder } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvieder>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/rooms/new" component={NewRoom}/>
            <Route path="/room/:id" component={Room}/>
          </Switch>
      </AuthContextProvieder>
    </BrowserRouter>
  );
}

export default App;




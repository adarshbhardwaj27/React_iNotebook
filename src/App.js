import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';

function App() {
  return (
    <>
    <NoteState>
    <Router>
      <Navbar />
      <Alert message="Hello, to see you" />
      <div className="container">
      <Switch>
        <Route exact path="/about">
          <About/>
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
      </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;

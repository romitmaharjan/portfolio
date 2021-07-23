//import logo from './logo.svg';
import './App.css';
import Routes from './Routes'
import Notifications from 'react-notify-toast'
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

function App() {
  return (
    <div className="App">
      <Notifications />
      <Routes />
    </div>
  );
}

export default App;

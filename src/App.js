// import logo from './logo.svg';
import './App.css';
import LandingPage from './Components/LandingPage';

export const config={endpoint:"https://jsonplaceholder.typicode.com/users"};
function App() {
  return (
    <div className="App">
     <LandingPage/>
    </div>
  );
}

export default App;

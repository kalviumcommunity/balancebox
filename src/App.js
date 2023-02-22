// import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage';
import Calculate from './components/Calculate';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/Calculate' element={<Calculate/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

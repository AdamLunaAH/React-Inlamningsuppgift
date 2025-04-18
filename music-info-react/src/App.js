import logo from './logo.svg';
import './App.css';
// Imports npm bootstrap CSS for usage on the website
import "bootstrap/dist/css/bootstrap.min.css";
// Custom CSS for the website
import "./music-info/css/custom.css";


import { Main } from './app/main';
import { ThemeUtil } from './utils/themeContext';

function App() {
  return (
<>
    <ThemeUtil>
    <Main />
    </ThemeUtil>
</>
  );
}

export default App;

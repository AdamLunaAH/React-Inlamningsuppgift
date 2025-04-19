// Imports npm bootstrap CSS for usage on the website
import "bootstrap/dist/css/bootstrap.min.css";
// Custom CSS for the website
import "./music-info/css/custom.css";

// Main layout component
import { Main } from './app/main';

// ThemeContext functionality for dark/light mode
import { ThemeUtil } from './utils/themeContext';

function App() {
  return (
    <>
      {/* ThemeUtil is used for dark/light mode */}
    <ThemeUtil>
    <Main />
    </ThemeUtil>
</>
  );
}

export default App;

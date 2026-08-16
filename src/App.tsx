import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes/AppRoutes';
import ScrollToTop from './Components/ScrollTop';

function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;

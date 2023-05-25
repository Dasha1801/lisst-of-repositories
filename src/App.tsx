import { HashRouter } from 'react-router-dom';
import { AppRouter } from './core/routes/AppRouter';

function App() {
  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  );
}

export default App;

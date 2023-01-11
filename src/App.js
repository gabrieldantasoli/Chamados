import Rotas from './routes/AppRoutes.js';
import { AuthProvider } from './Contexts/auth';
import './App.css';

function App() {
  return(
    <AuthProvider>
      <Rotas />
    </AuthProvider>
  )
}

export default App;

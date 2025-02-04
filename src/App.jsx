import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      {/* Reste de votre application */}
    </AuthProvider>
  );
}

export default App; 
import './styles/App.css';
import React from 'react';
import AppRouter from './AppRouter';

const App = () => {
  return (
    <div>
      {/* Renderize o componente do roteador */}
      <AppRouter />
    </div>
  );
};

export default App;

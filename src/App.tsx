import React from 'react';
import { MatrixProvider, useMatrix } from '@context/MatrixContext';
import { MatrixForm } from '@components/MatrixForm';
import { MatrixControls } from '@components/MatrixControls';
import { MatrixTable } from '@components/MatrixTable';
import { MatrixDebug } from '@components/MatrixDebug';
import './App.css';

const AppContent: React.FC = () => {
  const { matrix } = useMatrix();
  const hasMatrix = matrix.length > 0;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Matrix Generator</h1>
      </header>
      <main className="app-main">
        {!hasMatrix ? (
          <MatrixForm />
        ) : (
          <>
            <MatrixControls />
            <MatrixTable />
            <MatrixDebug />
          </>
        )}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <MatrixProvider>
      <AppContent />
    </MatrixProvider>
  );
};

export default App;

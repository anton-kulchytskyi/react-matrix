import { MatrixProvider, useMatrix } from '@context/MatrixContext';
import { MatrixForm } from '@components/MatrixForm';
import { MatrixTable } from '@components/MatrixTable';
import './App.css';

const AppContent = () => {
  const { matrix, generateNewMatrix } = useMatrix();
  const hasMatrix = matrix.length > 0;

  const handleGenerateNew = () => {
    // Reset matrix to show form again
    generateNewMatrix(0, 0, 0);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Matrix Generator</h1>
        {hasMatrix && (
          <button
            className="btn-header-new"
            onClick={handleGenerateNew}
          >
            🔄 New Matrix
          </button>
        )}
      </header>
      <main className="app-main">
        {!hasMatrix ? <MatrixForm /> : <MatrixTable />}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <MatrixProvider>
      <AppContent />
    </MatrixProvider>
  );
};

export default App;

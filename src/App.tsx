import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Roadmap from './pages/Roadmap';
import Sprint from './pages/Sprint';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/sprint" element={<Sprint />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
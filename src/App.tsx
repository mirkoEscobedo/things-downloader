import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContex';
import AboutUs from './pages/AboutUs/AboutUs';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import Privacy from './pages/Privacy/Privacy';
import { DownloadHistoryProvider } from './context/DownloadHistoryContext';
import { DownloadProvider } from './context/DownloadContext';

function App() {
  return (
    <>
      <BrowserRouter>
        <LanguageProvider>
          <DownloadHistoryProvider>
            <DownloadProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />

                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="*" element={<div>Go to home page</div>} />
              </Routes>
            </DownloadProvider>
          </DownloadHistoryProvider>
        </LanguageProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

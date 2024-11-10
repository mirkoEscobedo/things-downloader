import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContex";
import AboutUs from "./pages/AboutUs/AboutUs";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Privacy from "./pages/Privacy/Privacy";

function App() {
  return (
    <>
      <BrowserRouter>
        <LanguageProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<div>Go to home page</div>} />
          </Routes>
        </LanguageProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

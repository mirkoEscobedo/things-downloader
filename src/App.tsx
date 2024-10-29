import { LanguageProvider } from "./hooks/LanguageContex";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <LanguageProvider>
        <div className="">
          <Home />
        </div>
      </LanguageProvider>
    </>
  );
}

export default App;

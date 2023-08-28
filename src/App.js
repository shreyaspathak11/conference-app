import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConferenceList from "./Components/ConferenceList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConferenceList />} />
      </Routes>
    </Router>
  );
}

export default App;
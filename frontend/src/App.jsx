import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TopicDetail from "./pages/TopicDetail";
import Login from "./pages/Login";
import SavedTopics from "./pages/SavedTopics";
import Alerts from "./pages/Alerts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/topics/:name" element={<TopicDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/saved-topics" element={<SavedTopics />} />
        <Route path="/alerts" element={<Alerts />} />
      </Routes>
    </Router>
  );
}

export default App;
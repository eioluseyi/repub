import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.scss";
import RepoURL from "./pages/RepoURL";
import RepoInfo from "./pages/RepoInfo";

export default function App() {
  return (
    <div className="App">
      <div className="content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RepoURL />} />
            <Route path="/:owner/:repo" element={<RepoInfo />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

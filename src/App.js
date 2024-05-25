import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import { ChannelDetail, Feed, Navbar, SearchFeed, Sidebar } from "./Components";
import VideoDetail from "./Components/VideoDetail";
import PlanPage from "./Components/PlanPage";
import ConfirmationPage from "./Components/ConfirmationPage";

const App = () => (
  <BrowserRouter>
    <Box sx={{ backgroundColor: "#0F0F0F" }}>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Feed />} />
        <Route path="/channel/:id" element={<ChannelDetail />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
        <Route path="/Video/:id" element={<VideoDetail />} />
        <Route path="/premium-plan" element={<PlanPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </Box>
  </BrowserRouter>
);

export default App;

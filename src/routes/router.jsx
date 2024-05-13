import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "../App";
import GalleryMain from "../components/galleryImages/GalleryMain";
import PhotoGrapher from "../components/photographer/PhotoGrapher";
import PhotoGrapherDetails from "../components/photographer/PhotoGrapherDetails";

export const router = (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/gallery" element={<GalleryMain />} />
      <Route path="/photoGraphers" element={<PhotoGrapher />} />
      <Route
        path="/photoGraphers/PhotoGrapherDetails/:photographer_id"
        element={<PhotoGrapherDetails />}
      />
    </Routes>
  </Router>
);

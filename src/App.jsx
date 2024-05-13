import { Route, Routes } from "react-router-dom";
import GalleryMain from "./components/galleryImages/GalleryMain";
import PhotoGrapher from "./components/photographer/PhotoGrapher";
import PhotoGrapherDetails from "./components/photographer/PhotoGrapherDetails";
import Header from "./components/header/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="" style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<GalleryMain />} />
          <Route path="/photoGraphers" element={<PhotoGrapher />} />
          <Route
            path="/photoGraphers/PhotoGrapherDetails/:photographer_id"
            element={<PhotoGrapherDetails />}
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

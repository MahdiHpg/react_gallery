import { useSelector } from "react-redux";
import Images from "./Images";
import NextPrevButtons from "./NextPrevButtons";
import { selectAllImages } from "../../api/apiSlice";
import Spinner from "../Spinner";
import { useState } from "react";
import { selectAllSearchedImages } from "../../api/searchSlice";

const GalleryMain = () => {
  const [openModals, setOpenModals] = useState({});

  const AllImages = useSelector(selectAllImages);
  const imagesStatus = useSelector((state) => state.images.status);
  const error = useSelector((state) => state.images.error);

  const AllSearchedImages = useSelector(selectAllSearchedImages);
  const searchTotalResults = useSelector(
    (state) => state.imagesSearched.total_results
  );
  const imagesSearchedStatus = useSelector(
    (state) => state.imagesSearched.status
  );
  const errorSearched = useSelector((state) => state.imagesSearched.error);
  const searchQuery = useSelector((state) => state.imagesSearched.searchQuery);
  const isSearchState = useSelector(
    (state) => state.imagesSearched.isSearchState
  );

  const handleOpen = (index) => {
    setOpenModals((prev) => ({ ...prev, [index]: true }));
  };
  const handleClose = (index) => {
    setOpenModals((prev) => ({ ...prev, [index]: false }));
  };

  let content;

  if (imagesStatus === "loading" || imagesSearchedStatus === "loading") {
    content = <Spinner />;
  } else if (imagesStatus === "success" || imagesSearchedStatus === "success") {
    if (
      AllSearchedImages.length > 0 &&
      searchTotalResults !== 0 &&
      searchQuery !== ""
    ) {
      content = AllSearchedImages.map((img, index) => {
        return (
          <Images
            key={index}
            img={img}
            handleClose={() => handleClose(index)}
            open={!!openModals[index]}
            handleOpen={() => handleOpen(index)}
          />
        );
      });
    } else if (
      AllSearchedImages.length === 0 &&
      searchTotalResults === 0 &&
      isSearchState === "yes-search"
    ) {
      content = <div>عکسی یافت نشد!</div>;
    } else if (searchQuery === "" && isSearchState === "not-search") {
      content = AllImages.map((img, index) => {
        return (
          <Images
            key={index}
            img={img}
            handleClose={() => handleClose(index)}
            open={!!openModals[index]}
            handleOpen={() => handleOpen(index)}
          />
        );
      });
    }
  } else if (imagesStatus === "failed" || imagesSearchedStatus === "failed") {
    content = (
      <div>{`error in GalleryMain :  ${
        errorSearched ? errorSearched : error ? error : null
      }`}</div>
    );
  }

  return (
    <section className="gallery">
      <ul className="images">{content}</ul>
      <NextPrevButtons />
    </section>
  );
};
export default GalleryMain;

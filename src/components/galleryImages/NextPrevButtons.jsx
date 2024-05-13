import { useDispatch, useSelector } from "react-redux";
import { fetchImages } from "../../api/apiSlice";
import { useState } from "react";
import { fetchImagesBySearch } from "../../api/searchSlice";

const NextPrevButtons = () => {
  const [prevButton, setPrevButton] = useState(false);
  const [nextButton, setNextButton] = useState(false);

  const dispatch = useDispatch();

  const nextPage = useSelector((state) => state.images.nextPage);
  const prevPage = useSelector((state) => state.images.prevPage);

  const pageNumber = useSelector((state) => state.imagesSearched.pageNumber);
  const searchQuery = useSelector((state) => state.imagesSearched.searchQuery);
  const searchNextPage = useSelector(
    (state) => state.imagesSearched.searchNextPage
  );
  const searchPrevPage = useSelector(
    (state) => state.imagesSearched.searchPrevPage
  );

  const searchState = useSelector(
    (state) => state.imagesSearched.isSearchState
  );

  const getSearchNextPageUrl = (searchQuery, pageNumber) => {
    return `https://api.pexels.com/v1/search/?page=${pageNumber}&per_page=15&query=${searchQuery}`;
  };

  const handleNextPage = () => {
    if (searchState === "not-search") {
      if (nextPage) {
        setNextButton(true);
        setPrevButton(false);
        dispatch(fetchImages(nextPage));
        setNextButton(false);
        setPrevButton(false);
      }
    } else if (searchState === "yes-search") {
      if (searchNextPage) {
        setNextButton(true);
        setPrevButton(false);
        const nextPageUrl = getSearchNextPageUrl(searchQuery, pageNumber + 1);
        dispatch(fetchImagesBySearch(nextPageUrl));
        setNextButton(false);
        setPrevButton(false);
      }
    }
  };

  const handlePrevPage = () => {
    if (searchState === "not-search") {
      if (prevPage) {
        setNextButton(false);
        setPrevButton(true);
        dispatch(fetchImages(prevPage));
        setNextButton(false);
        setPrevButton(false);
      }
    } else if (searchState === "yes-search") {
      if (searchPrevPage) {
        setNextButton(false);
        setPrevButton(true);
        const prevPageUrl = getSearchNextPageUrl(searchQuery, pageNumber - 1);
        dispatch(fetchImagesBySearch(prevPageUrl));
        setNextButton(false);
        setPrevButton(false);
      }
    }
  };

  return (
    <div className="my-5 d-flex flex-row justify-content-center align-items-center gap-4 ">
      <button
        className="btn btn-secondary"
        disabled={!nextPage}
        onClick={handleNextPage}
      >
        {nextButton === true ? "در حال بارگذاری..." : "Next Page"}
      </button>
      <button
        className="btn btn-secondary"
        disabled={!prevPage && !searchPrevPage}
        onClick={handlePrevPage}
      >
        {prevButton === true ? "در حال بارگذاری..." : "Prev Page"}
      </button>
    </div>
  );
};
export default NextPrevButtons;

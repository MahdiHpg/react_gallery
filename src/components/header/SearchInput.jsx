import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchImagesBySearch,
  isSearchAct,
  searchAct,
} from "../../api/searchSlice";
import { fetchImages } from "../../api/apiSlice";
import ImgHeader from "./ImgHeader";
import HeaderRoutes from "./HeaderRoutes";

const SearchInput = () => {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const getSearchNextPageUrl = (searchQuery, pageNumber) => {
    return `https://api.pexels.com/v1/search/?page=${pageNumber}&per_page=15&query=${searchQuery}`;
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (query.length > 0) {
      dispatch(isSearchAct("yes-search"));
      dispatch(searchAct(query));
      const nextPageUrl = getSearchNextPageUrl(query, 1);
      dispatch(fetchImagesBySearch(nextPageUrl));
    } else if (query === null || query === "") {
      dispatch(isSearchAct("not-search"));
      setQuery(query.trim());
      dispatch(searchAct(query));
      dispatch(
        fetchImages("https://api.pexels.com/v1/curated?page=1&per_page=15")
      );
    }
  };

  return (
    <section className="search">
      <ImgHeader />
      <div className="content">
        <h1>Image Galley with ViteJS and PEXELS</h1>
        <p>Search and download any images within a second</p>
        <form
          autoComplete="off"
          onSubmit={handleSubmitSearch}
          className="search-box"
        >
          <button className="btn btnSearch" style={{ cursor: "pointer" }}>
            🔍
          </button>
          <input
            type="search"
            placeholder="Search images"
            value={query}
            name="query"
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        <HeaderRoutes />
      </div>
    </section>
  );
};
export default SearchInput;

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectAllPhotographers,
  selectPhotographerPics,
} from "../../api/photographersSlice";
import Spinner from "../Spinner";
import { useCallback, useEffect, useState } from "react";

const PhotoGrapherDetails = () => {
  const { photographer_id } = useParams();

  const [getPhotosById, setGetPhotosById] = useState([]);
  const [idClicked, setIdClicked] = useState(photographer_id);
  console.log(idClicked);

  const selectAllPhotographerPics = useSelector(selectAllPhotographers);
  console.log(
    "selectAllPhotographerPics data : " +
      JSON.stringify(selectAllPhotographerPics)
  );

  const selectPhotosById = useSelector(selectAllPhotographers);

  // const selectPhotosById = useSelector((state) =>
  //   selectPhotographerPics(state, photographer_id)
  // );

  const imagesStatus = useSelector((state) => state.photographers.status);
  const error = useSelector((state) => state.photographers.error);

  let content;

  if (imagesStatus === "loading") {
    content = <Spinner />;
  } else if (imagesStatus === "success") {
    if (selectPhotosById.length > 0) {
      content = selectPhotosById.map((item, index) => (
        <li
          key={index}
          style={{ width: "400px", height: "400px", display: "block" }}
        >
          <img
            src={item.src.large2x}
            alt={item.alt}
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        </li>
      ));
    } else {
      content = <div>فیلتر شده ها خالی بودند</div>;
    }
  } else if (imagesStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <>
      <div className="my-4">
        <ul className="d-flex flex-row flex-wrap justify-content-center align-items-center gap-5 list-unstyled ">
          {content}
        </ul>
      </div>
    </>
  );
};
export default PhotoGrapherDetails;

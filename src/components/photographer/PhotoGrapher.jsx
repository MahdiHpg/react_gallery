import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllPhotographers } from "../../api/photographersSlice";
import { useState } from "react";

const PhotoGrapher = () => {
  const AllImages = useSelector(selectAllPhotographers);
  const [getPhotosById, setGetPhotosById] = useState([]);
  const [idClicked, setIdClicked] = useState(null);
  console.log("idClicked : " + idClicked);

  const onClickLi = (id) => {
    setIdClicked(id);
    const photosById = AllImages.filter(
      (photo) => photo.photographer_id === id
    );
    setGetPhotosById(photosById);
    console.log("getPhotosById : " + JSON.stringify(photosById));
  };

  return (
    <>
      {getPhotosById.length > 0 && (
        <div className="d-block w-100 my-5">
          <div
            className="my-5"
            style={{
              width: "100%",
              height: "auto",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            {getPhotosById.map((pic, index) => (
              <img
                key={index}
                src={pic.src.large2x}
                style={{
                  width: "200px",
                  height: "200px",
                  display: "block",
                }}
              />
            ))}
          </div>
        </div>
      )}
      <div className="my-4">
        <ul className="d-flex flex-row flex-wrap justify-content-center align-items-center gap-5 list-unstyled ">
          {AllImages &&
            AllImages.map((photoGrapher, index) => (
              <li
                key={index}
                onClick={() => onClickLi(photoGrapher.photographer_id)}
              >
                <Link
                  // to={`/photoGraphers/PhotoGrapherDetails/${photoGrapher.photographer_id}`}
                  className="btn btn-outline-success d-flex flex-column justify-content-center align-items-center gap-4 "
                >
                  <p className="text-dark mb-0">
                    photographer id : {photoGrapher.photographer_id}
                  </p>
                  <p className="text-dark mb-0">
                    photographer name : @{photoGrapher.photographer}
                  </p>
                  <p className="text-dark mb-0">
                    click to see more details from this user
                  </p>
                </Link>
              </li>
            ))}
        </ul>
      </div>
      {/* <NextPrevButtons /> */}
    </>
  );
};
export default PhotoGrapher;

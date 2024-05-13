import ImgModal from "./ImgModal";

const Images = ({ img, handleOpen, handleClose, open }) => {
  return (
    <li className="card">
      <img
        src={img.src.large2x}
        alt={img.alt}
        onClick={() => handleOpen(img.id)}
      />
      <div className="details">
        <div className="photographer">
          <i>📷</i>
          <span>{img.photographer}</span>
        </div>
        <ImgModal handleClose={handleClose} open={open} img={img} />
      </div>
    </li>
  );
};
export default Images;

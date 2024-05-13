const ImgModal = ({ img, handleClose, open }) => {
  const downloadImage = () => {
    fetch(img.src.original)
      .then((res) => res.blob())
      .then((file) => {
        const url = img.src.original;
        const filename = url.substring(url.lastIndexOf("/") + 1);
        const extension = filename.split(".").pop(); // دریافت پسوند فایل

        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = `${filename}-${new Date().getTime()}.${extension}`;
        a.click();
      })
      .catch(() => alert("Failed to download image!"));
  };

  return (
    <div
      id={`#imgModal${img.id}`}
      className={`modal ${open === true ? "d-block" : "d-none"}`}
      open={open}
      onClose={() => handleClose(img.id)}
    >
      <div className="modal-dialog modal-xl modal-fullscreen-sm-down modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content ">
          <div className="modal-header " style={{ direction: "ltr" }}>
            <h5 className="modal-title">
              @photo by :{" "}
              <span className="text-primary ">{img.photographer}</span>
            </h5>
            <div className="d-flex flex-row flex-wrap justify-content-start align-items-center ">
              <button className="btn fs-3 " onClick={downloadImage}>
                🔗
              </button>
              <button
                className="btn fs-3 text-secondary "
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              >
                X
              </button>
            </div>
          </div>
          <div className="modal-body mb-4">
            <div
              className="p-3"
              style={{
                maxWidth: "700px",
                maxHeight: "700px",
                display: "block",
                margin: "auto",
              }}
            >
              <img
                src={img.src.large2x}
                className="d-block "
                alt={img.alt}
                style={{
                  objectFit: "cover",
                  maxWidth: "100%",
                  minWidth: "100px",
                  height: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImgModal;

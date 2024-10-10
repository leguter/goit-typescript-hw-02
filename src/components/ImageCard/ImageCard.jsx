
const ImgCard =  ({
    smallImg,
  description,
  openModal,
    regularImg
}) => {
    return (
      <div>
        <button onClick={()=>openModal(regularImg)}> 
          <img src={smallImg} alt={description} width="300" height="300" />
        </button>
      </div>
    );
}

export default ImgCard
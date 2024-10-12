type ImgCardProps = {
  smallImg: string;
  description: string;
  openModal: (value:string) => void;
  regularImg: string;
}
const ImgCard = ({
  smallImg,
  description,
  openModal,
  regularImg
}: ImgCardProps) => {
    return (
      <div>
        <button onClick={()=>openModal(regularImg)}> 
          <img src={smallImg} alt={description} width="300" height="300" />
        </button>
      </div>
    );
}

export default ImgCard
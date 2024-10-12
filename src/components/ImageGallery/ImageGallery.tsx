import ImgCard from "../ImageCard/ImageCard";
import css from './ImageGallery.module.css'
// type ImgDataType = {
//   id: number;
//   small: string;
//   description: string;
//   regular: string;
// };
// type OpenModalProps = {
//   setUrlModalImg: string;
//   setIsOpen: boolean;
// };
type Props = {
  dataImgs: [
    {
      id: number;
      description: string;
      urls: {
        regular: string;
        small: string;
      };
    }
  ];
  openModal: (value: string) => void;
};
type dataImgProps = {
  id: number;
  description: string;
  urls: {
    regular: string;
    small: string;
  };
};
const ImageGallery = ({ dataImgs, openModal}:Props) => {
  return (
    <ul className={css.list}>
      {dataImgs.map((dataImg: dataImgProps) => {
        return (
          <li key={dataImg.id} className={css.item}>
            <ImgCard
              smallImg={dataImg.urls.small}
              description={dataImg.description}
              openModal={openModal}
              regularImg={dataImg.urls.regular}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ImageGallery
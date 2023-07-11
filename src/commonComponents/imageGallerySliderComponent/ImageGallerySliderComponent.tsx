import * as React from 'react';
import { IImageGallerySliderComponentProps } from './IImageGallerySliderComponentProps';
import ImageGallery from 'react-image-gallery';



const ImageGallerySliderComponent: React.FunctionComponent<IImageGallerySliderComponentProps> = (props) => {
  // const images = [
  //     {
  //       original: require('../../assets/images/png/monitor-1.png'),
  //       thumbnail: require('../../assets/images/png/monitor-1.png'),
  //     },
  //     {
  //         original: require('../../assets/images/png/pc-2.png'),
  //         thumbnail: require('../../assets/images/png/pc-2.png'),
  //     },
  //     {
  //         original: require('../../assets/images/png/computer.png'),
  //         thumbnail: require('../../assets/images/png/computer.png'),
  //     },
  //   ]

  // set path for Image slider
  const images = props.imagesData.map((val: any) => ({ original: val.ServerRelativeUrl, thumbnail: val.ServerRelativeUrl }));

  return (
    <>
      <ImageGallery items={images}
        thumbnailPosition='left'
        autoPlay={false}
        showPlayButton={false}
        showBullets={false}
        infinite={true}
        showNav={false}
      />
    </>

  );
};

export default ImageGallerySliderComponent;

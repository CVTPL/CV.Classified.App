import * as React from 'react';
import { IProductDetailComponentProps } from './IProductDetailComponentProps';
import ClassifiedCardComponent from '../classifiedCardComponent/ClassifiedCardComponent';
import ImageGallerySliderComponent from '../imageGallerySliderComponent/ImageGallerySliderComponent';


const ProductDetailComponent: React.FunctionComponent<IProductDetailComponentProps> = (props) => {
  return(
    <>
<div className='productDetails'>
<div className='detailsPage'>
<div className="ms-Grid">
  <div className="ms-Grid-row">
    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl6">
      <div className='imageGallerySlider'>
        <ImageGallerySliderComponent />
        </div>
    </div>
    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl6">
        <div className='prdCardContainer'>
        <div className='prd-details'>
            <p className='prd-title'>Microsoft Surface Laptop</p>
            <p className='prd-description'>One day old Microsoft Surface Laptop 5 Intel Core i5 12th Gen in mint condition urgent sale.</p>
            <div className='location'>
            <img src={require('../../assets/images/svg/location.svg')} alt='Location Icon' />Iskcon ahmedabad</div>
            <div className='userName'>
            <img src={require('../../assets/images/svg/user-icon.svg')} />Bhavin Patel</div>
            <div className='amt'>
                ₹14,500
            </div>
        </div>
        {/* image-gallery-thumbnails-wrapper  image-gallery-thumbnails-left thumbnails-swipe-vertical */}
        {/* image-gallery-slide-wrapper  image-gallery-thumbnails-left -  */}
        {/* image-gallery-thumbnail-inner & image-gallery-thumbnail active - 160px */}
        {/* image-gallery-thumbnail active - width: 160px;
    min-width: auto;
    max-width: initial; */}
        <div className='social-icons'>
            <ul>
                    <li><a href="https://www.microsoft.com/en-in/microsoft-teams/log-in"><img src={require('../../assets/images/svg/ms-teams.svg')}></img></a></li>
                       <li> <a href="https://outlook.live.com/owa/"><img src={require('../../assets/images/svg/outlook.svg')}></img></a></li>
                      <li>  <a href="tel:+917852693210"><img src={require('../../assets/images/svg/phone.svg')}></img></a></li>
                       <li> <a href=""><img src={require('../../assets/images/svg/share.svg')}></img></a></li>
            </ul>
                
       </div>
       </div>
        <div className='description'>
       <div className='desc-title'>
        Description
        </div>  
        <div className='desc-details'>
            <div className='description-line'>
           <img src={require('../../assets/images/svg/circle-right.svg')} /> <p>13.5” PixelSense touchscreen for ultra-portable productivity, larger 13.5” for split-screen multitasking.</p>
           </div>
           <div className='description-line'>
           <img src={require('../../assets/images/svg/circle-right.svg')} /> <p>Warm, sophisticated Alcantara.</p>
           </div>
           <div className='description-line'>
           <img src={require('../../assets/images/svg/circle-right.svg')} /> <p>Snappy multitasking with powerful 12th Gen Intel Core i5 processors built on the Intel Evo platform.</p>
           </div>
           <div className='description-line'>
           <img src={require('../../assets/images/svg/circle-right.svg')} /><p>Look and sound your best on calls with Studio Mics and enhanced camera experiences, powered by Windows 11.</p>
           </div>
           <div className='description-line'>
           <img src={require('../../assets/images/svg/circle-right.svg')} /><p>13.5” PixelSense touchscreen for ultra-portable productivity, larger 13.5” for split-screen multitasking.</p>
           </div>
           <div className='description-line'>
           <img src={require('../../assets/images/svg/circle-right.svg')} /><p>Warm, sophisticated Alcantara.</p>
           </div>
            </div>   
        </div>
      
    </div>
  </div>
</div>
<hr className='line-design' />

<div className='similarPrudcts'>
    <div className='borderTitle'>Similar Products</div>
<ClassifiedCardComponent />
</div>
</div>
</div>
    </>
  ) ;
};

export default ProductDetailComponent;

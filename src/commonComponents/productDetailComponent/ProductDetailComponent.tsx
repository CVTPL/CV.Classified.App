import * as React from 'react';
import { IProductDetailComponentProps } from './IProductDetailComponentProps';
// import ClassifiedCardComponent from '../classifiedCardComponent/ClassifiedCardComponent';
import ImageGallerySliderComponent from '../imageGallerySliderComponent/ImageGallerySliderComponent';
import { ActionButton, IIconProps } from 'office-ui-fabric-react';
import { useLocation, useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import commonServices from '../../services/commonServices';
import { spfi, SPFx } from "@pnp/sp";
import parse from 'html-react-parser';

const ProductDetailComponent: React.FunctionComponent<IProductDetailComponentProps> = (props) => {
  const sp = spfi().using(SPFx(props.context));

  const [currentProduct, setCurrentProduct] = React.useState(0);
  const [productDetailsData, setProductDetailsData]: any = React.useState([]);
  const [SimilarProductsData, setSimilarProductsData] = React.useState([]);

  const classifiedCard = [
    {
      id: 1,
      urlImage: require('../../assets/images/png/computer.png'),
      title: 'Iphone 11',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard.',
      location: 'Iskcon Ahmedabad',
      userName: 'Bhavin Patel',
      price: '₹12000',
      class: 'disabled',
      sold: require('../../assets/images/svg/sold.svg'),


    },
    {
      id: 2,
      urlImage: require('../../assets/images/png/computer.png'),
      title: 'Iphone 11',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard.',
      location: 'Iskcon Ahmedabad',
      userName: 'Bhavin Patel',
      price: '₹15000'
    },
    {
      id: 3,
      urlImage: require('../../assets/images/png/computer.png'),
      title: 'Iphone 11',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard.',
      location: 'Iskcon Ahmedabad',
      userName: 'Bhavin Patel',
      price: '₹14000'
    },
    {
      id: 4,
      urlImage: require('../../assets/images/png/computer.png'),
      title: 'Iphone 11',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard.',
      location: 'Iskcon Ahmedabad',
      userName: 'Bhavin Patel',
      price: '₹21000'
    },

    {
      id: 5,
      urlImage: require('../../assets/images/png/computer.png'),
      title: 'Iphone 11',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard.',
      location: 'Iskcon Ahmedabad',
      userName: 'Bhavin Patel',
      price: '₹45000'
    },
  ];

  let { path, url } = useRouteMatch();
  const backArrow: IIconProps = { iconName: 'ChevronLeftMed' };

  React.useEffect(() => {
    const productId = parseInt(new URL(`https://1.com?${window.location.href.split("?")[1]}`).searchParams.get("productId"));
    if (productId > 0) {
      let tempProductDetailsData: any = [];
      setCurrentProduct(productId);
      props.choiceGroupVisibility(false);//show choice group which is available in parent component.


      //get selected product details
      let selectedListItems: any = {};
      _getProductDetailsById(productId).then((listItemResponse) => {
        if (listItemResponse.length > 0) {
          selectedListItems = listItemResponse[0];
          //Set description with design
          let imageUrl = require('../../assets/images/svg/circle-right.svg');

          selectedListItems.CV_productDescription = selectedListItems.CV_productDescription.replaceAll("<ul>", "<ul class='desc-details'>")
          selectedListItems.CV_productDescription = selectedListItems.CV_productDescription.replaceAll("<li>", "<li class='description-line'><img src='" + imageUrl + "'/><p>")//'../../assets/images/svg/circle-right.svg'
          selectedListItems.CV_productDescription = selectedListItems.CV_productDescription.replaceAll("</li>", "</p></li>")
          return _getImageFromFolder(listItemResponse[0].CV_imageUrl);
        }
        else {
          return;
        }
      }).then((imageResponse) => {
        selectedListItems["Images"] = imageResponse
        setProductDetailsData(selectedListItems);
        return _getSimilarProductDetails(selectedListItems);//get similar product details
      }).then(async (similarProductRes) => {
        if (similarProductRes.length > 0) {
          let count = 0;
          do {
            await commonServices._getImageFromFolder(sp, similarProductRes[count].CV_imageUrl).then((response) => {
              similarProductRes[count]["Images"] = response
            })
            count = count + 1;
          } while (count < similarProductRes.length);
        }
        return similarProductRes;
      }).then((response) => {
        setSimilarProductsData(response);
      });
    }
  }, [currentProduct])

  return (
    <>
      <div className='productDetails'>
        <div className='detailsPage'>
          <ActionButton iconProps={backArrow} href='#/buyProducts' className='btn-standard'>
            Go Back
          </ActionButton>
          {/* Product Details DOM start from here */}
          {

            Object.keys(productDetailsData).length > 0 ?
              <div className="ms-Grid">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl6 colSize">
                    <div className='imageGallerySlider'>
                      <ImageGallerySliderComponent imagesData={productDetailsData.Images} />
                    </div>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl6 colSize">
                    <div className='prdCardContainer' id='prdCardContainer'>
                      <div className='prd-details'>
                        <p className='prd-title' >{productDetailsData.Title}</p>
                        <p className='prd-description'>{productDetailsData.CV_shortDescription}</p>
                        <div className='location'>
                          <img src={require('../../assets/images/svg/location.svg')} alt='Location Icon' />{productDetailsData.CV_location}</div>
                        <div className='userName'>
                          <img src={require('../../assets/images/svg/user-icon.svg')} />{productDetailsData.Author.Title}</div>
                        <div className='amt'>
                          {Number(productDetailsData.CV_productPrice).toLocaleString()}
                        </div>
                      </div>

                      <div className='social-icons'>
                        <ul>
                          <li><a onClick={() => { window.location.href = `https://teams.microsoft.com/l/chat/0/0?users=${productDetailsData.Author.EMail}` }} ><img src={require('../../assets/images/svg/ms-teams.svg')}></img></a></li>
                          <li><a onClick={() => { window.location.href = `mailTo:${productDetailsData.Author.EMail}` }} ><img src={require('../../assets/images/svg/outlook.svg')}></img></a></li>
                          <li><a onClick={() => { window.location.href = `tel:${productDetailsData.CV_ContactNo}` }}><img src={require('../../assets/images/svg/phone.svg')}></img></a></li>
                          <li><a onClick={() => { navigator.share({ title: 'TestUrlShare', url: 'https://www.google.com' }) }}><img src={require('../../assets/images/svg/share.svg')}></img></a></li>
                        </ul>
                      </div>
                    </div>
                    <div className='description'>
                      <div className='desc-title'>
                        Description
                      </div>
                      {parse(productDetailsData.CV_productDescription)}

                      {/* <div className='description-line'>
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
            </div> */}

                      {/* {productDetailsData[0].CV_productDescription} */}

                    </div>
                  </div>
                </div>
              </div>
              :
              ""
          }
          <hr className='line-design' />
          {/* Similar Products DOM start from here */}
          <div className='similarPrudcts'>
            <div className='borderTitle'>Similar Products</div>
            <div className='classified-cards'>
              <div className="custmRow">
                {SimilarProductsData.map((card) => (
                  <div className='custmCols' key={card.Id}>
                    <div className={card.CV_productStatus === "Sold" ? "content-card" + " " + 'disabled' : "content-card" + " " + ''}>
                      <Link to={`${path}?productId=${card.Id}`} onClick={() => { viewSimilarProduct(card.Id) }}>
                        <div className='card-header'>
                          <div className='prdPrice'>
                            <img src={card.Images[0].ServerRelativeUrl} alt={card.Title} />
                            <div className='prd-amt'>
                              {Number(card.CV_productPrice).toLocaleString()}
                            </div>
                          </div>
                          <div className='soldLabel'>
                            <img src={require('../../assets/images/svg/sold.svg')} alt="icon" style={{ display: card.CV_productStatus === "Sold" ? 'block' : 'none' }} />
                          </div>
                          <div>
                          </div>
                        </div>
                        <div className='card-body'>
                          <div className='card-title'>
                            <p>{card.Title}</p>
                          </div>
                          <div className='card-content'>
                            <p>{card.CV_shortDescription}</p>
                            <div className='card-location'>
                              <img src={require('../../assets/images/svg/location.svg')} alt='Location Icon' />
                              <p>{card.CV_location}</p>
                            </div>
                            <div className='card-userName'>
                              <img src={require('../../assets/images/svg/user-icon.svg')} alt='User Icon' />
                              <p>{card.Author.Title}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className='social-icons'>
                        <ul>
                          <li><a onClick={() => { window.location.href = `https://teams.microsoft.com/l/chat/0/0?users=${card.Author.EMail}` }}><img src={require('../../assets/images/svg/ms-teams.svg')}></img></a></li>
                          <li><a onClick={() => { window.location.href = `mailTo:${card.Author.EMail}` }} ><img src={require('../../assets/images/svg/outlook.svg')}></img></a></li>
                          <li><a onClick={() => { window.location.href = `tel:${card.CV_ContactNo}` }} ><img src={require('../../assets/images/svg/phone.svg')}></img></a></li>
                          <li><a onClick={() => { navigator.share({ title: 'TestUrlShare', url: 'https://www.google.com' }) }}><img src={require('../../assets/images/svg/share.svg')}></img></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function viewSimilarProduct(productId: number) {
    // console.log(productId);
    setCurrentProduct(productId);
    const element = document.getElementById("prdCardContainer");
    element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }

  /**
   * Function for get selected product details from Classified Products list.
   * @param productId 
   * @returns 
   */
  async function _getProductDetailsById(productId: any): Promise<any> {
    let selectString = "*,Author/ID,Author/Title,Author/EMail";
    let expandString = "Author";
    let filterString = `Id eq ${productId}`;

    return new Promise((resolve, reject) => {
      commonServices._getListItemWithExpandAndFilter(sp, "Classified Products", selectString, filterString, expandString)
        .then((response: any) => {
          resolve(response);
        },
          (error: any): any => {
            reject(error);
            console.log(error);
            alert("Error while geting data");
          });
    });
  }
  /**
   * Function for get product details which is similar to selected product
   * @param productObj 
   * @returns 
   */
  async function _getSimilarProductDetails(productObj: any): Promise<any> {

    let selectString = "*,Author/ID,Author/Title,Author/EMail";
    let expandString = "Author";
    let filterString = `CV_productCategory eq '${productObj.CV_productCategory}' and Id ne ${productObj.Id} and CV_productStatus ne 'InActive' `;

    return new Promise((resolve, reject) => {
      commonServices._getListItemWithExpandAndFilter(sp, "Classified Products", selectString, filterString, expandString)
        .then((response: any) => {
          resolve(response);
        },
          (error: any): any => {
            reject(error);
            console.log(error);
            alert("Error while geting data");
          });
    });
  }
  // Fetch image from site assets folder
  async function _getImageFromFolder(folderUrl: any): Promise<any> {
    return new Promise((resolve, reject) => {
      commonServices._getImageFromFolder(sp, folderUrl)
        .then((response: any) => {
          resolve(response);
        },
          (error: any): any => {
            reject(error);
            console.log(error);
            alert("Error while geting data");
          });
    });
  }

};

export default ProductDetailComponent;

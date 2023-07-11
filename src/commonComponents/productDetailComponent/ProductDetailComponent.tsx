import * as React from 'react';
import { IProductDetailComponentProps } from './IProductDetailComponentProps';
import ClassifiedCardComponent from '../classifiedCardComponent/ClassifiedCardComponent';
import ImageGallerySliderComponent from '../imageGallerySliderComponent/ImageGallerySliderComponent';
import { ActionButton, IIconProps } from 'office-ui-fabric-react';
import { useLocation, useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import commonServices from '../../services/commonServices';
import { spfi, SPFx } from "@pnp/sp";
import { BallTriangle } from 'react-loader-spinner';
require('../../assets/stylesheets/base/global.scss');

const ProductDetailComponent: React.FunctionComponent<IProductDetailComponentProps> = (props) => {
  const sp = spfi().using(SPFx(props.context));
  const backArrow: IIconProps = { iconName: 'ChevronLeftMed' };
  let { path, url } = useRouteMatch();
  const [showLoader, setShowLoader] = React.useState(true);
  const [currentProductId, setCurrentProductId] = React.useState(0);
  const [currentProductDetails, setCurrentProductDetails]: any = React.useState({});

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


  React.useEffect(() => {
    const productId = parseInt(new URL(`https://1.com?${window.location.href.split("?")[1]}`).searchParams.get("productId"));

    if (productId > 0) {
      setCurrentProductId(productId)
      props.choiceGroupVisibility(false);//show choice group which is available in parent component.

      _getProductDetailsById(productId).then((response) => {
        if (response.length > 0) {
          setCurrentProductDetails(response[0]);
          setShowLoader(false);
        }
        else {
          alert("Product does not available.");
          window.location.href = '#/buyProducts';
        }
      });
    }

  }, [])



  return (
    <>
      <div className='productDetails'>
        {Object.keys(currentProductDetails).length > 0 ?
          <div className='detailsPage'>
            <ActionButton iconProps={backArrow} href='#/buyProducts' className='btn-standard'>
              Go Back
            </ActionButton>
            {/* Product Details DOM start from here */}
            <div className="ms-Grid">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl6 colSize">
                  <div className='imageGallerySlider'>
                    <ImageGallerySliderComponent />
                  </div>
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl6 colSize">
                  <div className='prdCardContainer' id='prdCardContainer'>
                    <div className='prd-details'>
                      <p className='prd-title' >{currentProductDetails.Title}</p>
                      <p className='prd-description'>{currentProductDetails.CV_shortDescription}</p>
                      <div className='location'>
                        <img src={require('../../assets/images/svg/location.svg')} alt='Location Icon' />{currentProductDetails.CV_location}</div>
                      <div className='userName'>
                        <img src={require('../../assets/images/svg/user-icon.svg')} />{currentProductDetails.Author.Title}</div>
                      <div className='amt'>
                        {currentProductDetails.CV_productPrice}
                      </div>
                    </div>

                    <div className='social-icons'>
                      <ul>
                        <li><a onClick={() => { window.location.href = "https://teams.microsoft.com/l/chat/0/0?users=ankit@thecodevision.com" }} ><img src={require('../../assets/images/svg/ms-teams.svg')}></img></a></li>
                        <li><a onClick={() => { window.location.href = "mailTo:ankit@thecodevision.com" }} ><img src={require('../../assets/images/svg/outlook.svg')}></img></a></li>
                        <li><a onClick={() => { window.location.href = "tel:+91 7852693210" }}><img src={require('../../assets/images/svg/phone.svg')}></img></a></li>
                        <li><a onClick={() => { navigator.share({ title: 'TestUrlShare', url: 'https://www.google.com' }) }}><img src={require('../../assets/images/svg/share.svg')}></img></a></li>
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
            {/* Similar Products DOM start from here */}
            <div className='similarPrudcts'>
              <div className='borderTitle'>Similar Products</div>
              <div className='classified-cards'>
                <div className="custmRow">
                  {classifiedCard.map((card) => (
                    <div className='custmCols' key={card.id}>
                      <div className={"content-card" + " " + card.class}>
                        <Link to={`${path}?productId=${card.id}`} onClick={() => { viewSimilarProduct(card.id) }}>
                          <div className='card-header'>
                            <div className='prdPrice'>
                              <img src={card.urlImage} alt={card.title} />
                              <div className='prd-amt'>
                                {card.price}
                              </div>
                            </div>
                            <div className='soldLabel'>
                              <img src={card.sold} alt="icon" style={{ display: card.sold ? 'block' : 'none' }} />
                            </div>
                            <div>
                            </div>
                          </div>
                          <div className='card-body'>
                            <div className='card-title'>
                              <p>{card.title}</p>
                            </div>
                            <div className='card-content'>
                              <p>{card.content}</p>
                              <div className='card-location'>
                                <img src={require('../../assets/images/svg/location.svg')} alt='Location Icon' />
                                <p>{card.location}</p>
                              </div>
                              <div className='card-userName'>
                                <img src={require('../../assets/images/svg/user-icon.svg')} alt='User Icon' />
                                <p>{card.userName}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div className='social-icons'>
                          <ul>
                            <li><a onClick={() => { window.location.href = "https://teams.microsoft.com/l/chat/0/0?users=ankit@thecodevision.com" }}><img src={require('../../assets/images/svg/ms-teams.svg')}></img></a></li>
                            <li><a onClick={() => { window.location.href = "mailTo:ankit@thecodevision.com" }} ><img src={require('../../assets/images/svg/outlook.svg')}></img></a></li>
                            <li><a onClick={() => { window.location.href = "tel:+91 7852693210" }} ><img src={require('../../assets/images/svg/phone.svg')}></img></a></li>
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
          : ""}

        {/* Loader Start */}
        <div className="fixed-loader-container" hidden={!showLoader}>
          <div className="fixed-loader-child">
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#5F9BE7"
              ariaLabel="ball-triangle-loading"
              visible={showLoader}
            />
          </div>
        </div>
        {/* Loader End */}
      </div>
    </>
  );

  function viewSimilarProduct(productId: number) {
    setCurrentProductId(productId);
    const element = document.getElementById("prdCardContainer");
    element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }

  /**
   * Function for get product details based on Product Id
   * @param Id 
   * @returns 
   */
  async function _getProductDetailsById(Id: any): Promise<any> {
    let currentLoginUser = props.context.pageContext.user.email;

    let selectString = "*,Author/EMail,Author/Id,Author/Title";
    let expandString = "Author";
    // let filterString = "Author/EMail eq '" + currentLoginUser + "'";
    let filterString = "Id eq " + Id + "";

    return new Promise((resolve, reject) => {
      commonServices._getListItemWithExpandAndFilter(sp, "Classified Products", selectString, expandString, filterString).then((response) => {
        resolve(response);
      },
        (error: any): any => {
          reject(error);
        });
    });
  }
};

export default ProductDetailComponent;

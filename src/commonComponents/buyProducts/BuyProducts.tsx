import * as React from 'react';
import { IBuyProductsProps } from './IBuyProductsProps';
import { Route, BrowserRouter as Router, HashRouter, Link, NavLink, Switch, useRouteMatch } from 'react-router-dom';
import ProductDetailComponent from '../productDetailComponent/ProductDetailComponent';
import { Pagination } from "@pnp/spfx-controls-react/lib/pagination";

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

const BuyProducts: React.FunctionComponent<IBuyProductsProps> = (props) => {
    let { path, url } = useRouteMatch();

    // const soldIcon = require('../../assets/images/svg/sold.svg');

    const [paginatedItems, setPaginatedItems] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(1);

    const getPage = (page: number) => {
        // round a number up to the next largest integer.
        const roundupPage = Math.ceil(page);
        const tempPaginatedItems = props.productCardData.slice(roundupPage * pageSize, (roundupPage * pageSize) + pageSize)
        setPaginatedItems(tempPaginatedItems);
    }

    React.useEffect(() => {
        // console.log(path);
        // console.log(url);
        props.choiceGroupVisibility(true);//show choice group which is available in parent component.
    }, [])
    return (
        <>
            <div className='classified-cards'>
                <div className="custmRow">
                    {props.productCardData.map((card) => (
                        <div className='custmCols' key={card.Id}>
                            <div className={card.CV_productStatus === "Sold" ? "content-card" + " " + 'disabled' : "content-card" + " " + ''}>
                                <Link to={`${path}/productDetails?productId=${card.Id}`}  className='linkItem'>
                                    <div className='card-header'>
                                        <div className='prdPrice'>
                                            <img src={card.AttachmentFiles && card.AttachmentFiles[0] ? card.AttachmentFiles[0].ServerRelativeUrl : ""} alt={card.Title} />
                                            <div className='prd-amt'>
                                                {card.CV_productPrice}
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
            <Pagination
                currentPage={1}
                totalPages={(props.productCardData.length / pageSize) - 1}
                limiter={3}
                onChange={(page) => getPage(page)} />
            {/* <HashRouter>
                <Switch>
                    <Route exact path={path} component={() => (
                        <>
                            <div className="ms-Grid">
                                <div className="ms-Grid-row">
                                    <div className='ms-Grid-col ms-sm12 ms-md12 ms-lg12'>
                                        <div className='contentPivot'>
                                            <ProductDetailComponent />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )} />
                </Switch>
            </HashRouter> */}
        </>
    );
};

export default BuyProducts;

import * as React from 'react';
import { IBuyProductsProps } from './IBuyProductsProps';
import { Route, BrowserRouter as Router, HashRouter, Link, NavLink, Switch, useRouteMatch } from 'react-router-dom';
import ProductDetailComponent from '../productDetailComponent/ProductDetailComponent';
import { Pagination } from "@pnp/spfx-controls-react/lib/pagination";

const slice: any = require('lodash/slice');

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

    const [pageSize, setPageSize] = React.useState<number>(5);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [pagedItems, setPagedItems] = React.useState(slice(props.productCardData, 0, currentPage * pageSize));

    React.useEffect(() => {
        props.choiceGroupVisibility(true);//show choice group which is available in parent component.
    }, []);

    return (
        <>
            <div className='classified-cards'>
                <div className="custmRow">
                    {pagedItems.map((card: any) => (
                        <div className='custmCols' key={card.Id}>
                            <div className={card.CV_productStatus === "Sold" ? "content-card" + " " + 'disabled' : "content-card" + " " + ''}>
                                <Link to={`${path}/productDetails?productId=${card.Id}`} className='linkItem'>
                                    <div className='card-header'>
                                        <div className='prdPrice'>
                                            <img src={card.Images && card.Images[0] ? card.Images[0].ServerRelativeUrl : ""} alt={card.Title} />
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
                                        <li><a onClick={() => { navigator.share({ title: 'Classified App', url: window.location.href }) }}><img src={require('../../assets/images/svg/share.svg')}></img></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(props.productCardData.length / pageSize)}
                onChange={(page) => onPageUpdate(page)}
                limiter={3}
            />
        </>
    );

    // Pagination Handler
    function onPageUpdate(pageno?: number) {
        var currentPge = (pageno) ? pageno : currentPage;
        var startItem = ((currentPge - 1) * pageSize);
        var endItem = currentPge * pageSize;
        let filItems: any = slice(props.productCardData, startItem, endItem);
        setCurrentPage(currentPge);
        setPagedItems(filItems);
    };
};

export default BuyProducts;

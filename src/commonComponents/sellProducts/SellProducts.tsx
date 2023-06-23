import * as React from 'react';
import { ISellProductsProps } from './ISellProductsProps';
import { Panel } from 'office-ui-fabric-react';
import AddEditProductPanelComponent from '../addEditProductPanelComponent/AddEditProductPanelComponent';

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

const SellProducts: React.FunctionComponent<ISellProductsProps> = (props) => {
    const [isPanelOpen, setIsPanelOpen] = React.useState(false);

    const panelHeader = () => (
        <div className="panel-header">
            <h1>Edit Product</h1>
        </div>
    )

    return (
        <>
            <div className='classified-cards'>
                <div className="custmRow">
                    {classifiedCard.map((card) => (
                        <div className='custmCols' key={card.id}>
                            <div className={"content-card" + " " + card.class}>
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
                                    <div className='edit-icon' >
                                        <img src={require('../../assets/images/svg/edit-icon.svg')} onClick={() => { setIsPanelOpen(true) }} />
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
                                <div className='social-icons'>
                                    <ul>
                                        <li><a onClick={() => { window.location.href = "https://teams.microsoft.com/l/chat/0/0?users=ankit@thecodevision.com" }} ><img src={require('../../assets/images/svg/ms-teams.svg')}></img></a></li>
                                        <li><a onClick={() => { window.location.href = "mailTo:ankit@thecodevision.com" }} ><img src={require('../../assets/images/svg/outlook.svg')}></img></a></li>
                                        <li><a onClick={() => { window.location.href = "tel:+91 7852693210" }}><img src={require('../../assets/images/svg/phone.svg')}></img></a></li>
                                        <li><a onClick={() => { navigator.share({ title: 'TestUrlShare', url: 'https://www.google.com' }) }}><img src={require('../../assets/images/svg/share.svg')}></img></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* <div className='pagination-empty-card'> */}
                    <div className='pagination-empty-card'>
                        <div className='custmCols emptyCard'>
                            <div className='emptyCardContainer' onClick={() => { setIsPanelOpen(true) }}>
                                <div className='addIcon'>
                                    <img src={require('../../assets/images/svg/plus-icon.svg')} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Panel Start Region */}
            <Panel
                className="panel-container product-panel-container"
                onRenderHeader={panelHeader}
                isOpen={isPanelOpen}
                onDismiss={() => { setIsPanelOpen(false) }}
                closeButtonAriaLabel="Close">
                <AddEditProductPanelComponent />
            </Panel>
            {/* Panel End Region */}
        </>
    );
};

export default SellProducts;

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

    // const [isPanelOpen, setIsPanelOpen] = React.useState(false);

    const [isPanel, setIsPanel] = React.useState(false);

    const [AddPageToggle, setAddPageToggle] = React.useState(true);

    // const soldIcon = require('../../assets/images/svg/sold.svg');

    const panelHeader = () => (
        AddPageToggle ?
            <div className="panel-header">
                <h1>Sell New Product</h1>
            </div> :
            <div className="panel-header">
                <h1>Edit Product</h1>
            </div>
    )

    function showpanels(action: any, event: any) {
        if (action == "showAddPanel") {
            setAddPageToggle(true);
            setIsPanel(true);
            event.stopPropagation();
        }
        else {
            setAddPageToggle(false);
            setIsPanel(true);
            event.stopPropagation();
        }

    }

    return (
        <>
            <div className='classified-cards'>
                <div className="custmRow">
                    {props.productCardData.map((card) => (
                        <div className='custmCols' key={card.Id}>
                            <div className={card.CV_productStatus === "Sold" ? "content-card" + " " + 'disabled' : "content-card" + " " + ''}>
                                <div className='card-header'>
                                    <div className='prdPrice'>
                                        <img src={card.AttachmentFiles[0].ServerRelativeUrl} alt={card.Title} />
                                        <div className='prd-amt'>
                                            {card.CV_productPrice}
                                        </div>
                                    </div>
                                    <div className='soldLabel'>
                                        <img src={require('../../assets/images/svg/sold.svg')} alt="icon" style={{ display: card.CV_productStatus === "Sold" ? 'block' : 'none' }} />
                                    </div>
                                    <div className='edit-icon' >
                                        <img src={require('../../assets/images/svg/edit-icon.svg')} onClick={(e) => showpanels("showEditPanel", e)} />
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
                            <div className='emptyCardContainer' onClick={(e) => { showpanels("showAddPanel", e) }}>
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
                className="panel-containers product-panel-container"
                // panel-container product-panel-container
                onRenderHeader={panelHeader}
                isOpen={isPanel}
                onDismiss={() => { setIsPanel(false) }}
                closeButtonAriaLabel="Close">
                <AddEditProductPanelComponent context={props.context} onPanelChange={setIsPanel} onChangeAddPageToggle={AddPageToggle} />
            </Panel>
            {/* Panel End Region */}
        </>
    );
};

export default SellProducts;

import * as React from 'react';
import { ISellProductsProps } from './ISellProductsProps';
import { ChoiceGroup, Dialog, IChoiceGroupOption, Panel } from 'office-ui-fabric-react';
import AddEditProductPanelComponent from '../addEditProductPanelComponent/AddEditProductPanelComponent';
import commonServices from '../../services/commonServices';
import { spfi, SPFx } from "@pnp/sp";

const classifiedCard = [
    {
        id: 1,
        urlImage: require('../../assets/images/png/computer.png'),
        title: 'Iphone 11',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard.',
        location: 'Iskcon Ahmedabad',
        userName: 'Bhavin Patel',
        price: '₹12000',
        // class: 'disabled',
        requested: require('../../assets/images/svg/requested.svg'),
        rejected: require('../../assets/images/png/rejected.png')


    },
    {
        id: 2,
        urlImage: require('../../assets/images/png/computer.png'),
        title: 'Iphone 11',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard.',
        location: 'Iskcon Ahmedabad',
        userName: 'Bhavin Patel',
        price: '₹15000',
        requested: require('../../assets/images/svg/requested.svg'),
    },
    {
        id: 3,
        urlImage: require('../../assets/images/png/computer.png'),
        title: 'Iphone 11',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard.',
        location: 'Iskcon Ahmedabad',
        userName: 'Bhavin Patel',
        price: '₹14000',
        requested: require('../../assets/images/svg/requested.svg'),
    },
    {
        id: 4,
        urlImage: require('../../assets/images/png/computer.png'),
        title: 'Iphone 11',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard.',
        location: 'Iskcon Ahmedabad',
        userName: 'Bhavin Patel',
        price: '₹21000',
        requested: require('../../assets/images/svg/requested.svg'),
    },

    {
        id: 5,
        urlImage: require('../../assets/images/png/computer.png'),
        title: 'Iphone 11',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard.',
        location: 'Iskcon Ahmedabad',
        userName: 'Bhavin Patel',
        price: '₹21000',
        requested: require('../../assets/images/svg/requested.svg'),
    },

];

const SellProducts: React.FunctionComponent<ISellProductsProps> = (props) => {

    const sp = spfi().using(SPFx(props.context));

    const [isPanel, setIsPanel] = React.useState(false);
    const [AddPageToggle, setAddPageToggle] = React.useState(true);
    const [selectedView, setSelectedView] = React.useState("myproducts");
    const [editData, setEditData]: any = React.useState([]);

    const [isAdmin, setIsAdmin] = React.useState(false);

    const options = [
        {
            key: 'myproducts',
            text: 'My Products',
        },
        {
            key: 'requestedProducts',
            text: 'Requested Products',
        },
    ];

    // Add-Edit Panel Header
    const panelHeader = () => (
        AddPageToggle ?
            <div className="panel-header">
                <h1>Sell New Product</h1>
            </div> :
            <div className="panel-header">
                <h1>Edit Product</h1>
            </div>
    )

    function setHideDialog(arg0: boolean) {
        throw new Error('Function not implemented.');
    }

    React.useEffect(() => {
        _getAdminUser().then((AdminRes) => {
            AdminRes.forEach((adminEle: any) => {
                if (props.productCardData.filter((filterVal: any) => (filterVal.Author.EMail === adminEle.Email)).length > 0) {
                    setIsAdmin(true);
                }
            });
        });
    }, [])

    return (
        <>

            {/* <ChoiceGroup defaultSelectedKey={selectedView} className="switch-button-container" options={options} onChange={_onChangeChoiceGroup} /> */}
            {
                isAdmin ? <ChoiceGroup defaultSelectedKey={selectedView} options={options} onChange={_onChangeChoiceGroup} /> : ""
            }


            {selectedView == "myproducts" ?
                <div className='classified-cards'>
                    <div className="custmRow">
                        {props.productCardData.map((card) => (
                            <div className='custmCols' key={card.Id}>
                                <div className={card.CV_productStatus === "Sold" ? "content-card" + " " + 'disabled' : "content-card" + " " + ''}>
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
                                        <div className='edit-icon' >
                                            <img src={require('../../assets/images/svg/edit-icon.svg')} onClick={(e) => showpanels("showEditPanel", e, card)} />
                                        </div>

                                        {
                                            card.CV_productStatus === "Reject" ?
                                                <div className='rejectedCard'>
                                                    <img src={require('../../assets/images/png/rejected.png')} alt="icon" />
                                                    {/* style={{ display: card.rejected ? 'block' : 'none' }}  */}
                                                </div>
                                                : ""
                                        }

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
                                            <li><a onClick={() => { window.location.href = `https://teams.microsoft.com/l/chat/0/0?users=${card.Author.EMail}` }} ><img src={require('../../assets/images/svg/ms-teams.svg')}></img></a></li>
                                            <li><a onClick={() => { window.location.href = `mailTo:${card.Author.EMail}` }} ><img src={require('../../assets/images/svg/outlook.svg')}></img></a></li>
                                            <li><a onClick={() => { window.location.href = `tel:${card.CV_ContactNo}` }}><img src={require('../../assets/images/svg/phone.svg')}></img></a></li>
                                            <li><a onClick={() => { navigator.share({ title: 'TestUrlShare', url: 'https://www.google.com' }) }}><img src={require('../../assets/images/svg/share.svg')}></img></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* <div className='pagination-empty-card'> */}
                        <div className='pagination-empty-card'>
                            <div className='custmCols emptyCard'>
                                <div className='emptyCardContainer' onClick={(e) => { showpanels("showAddPanel", e, "") }}>
                                    <div className='addIcon'>
                                        <img src={require('../../assets/images/svg/plus-icon.svg')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className='classified-cards cardRequest'>
                    <div className="custmRow">
                        {props.requestedProductCardData.map((card) => (
                            <div className='custmCols' key={card.Id}>
                                <div className={"content-card"}>
                                    {/* + " " + card.class} */}
                                    <div className='card-header'>
                                        <div className='prdPrice'>
                                            <img src={card.Images && card.Images[0] ? card.Images[0].ServerRelativeUrl : ""} alt={card.Title} />
                                            <div className='prd-amt'>
                                                {Number(card.CV_productPrice).toLocaleString()}
                                            </div>
                                        </div>
                                        <div className='soldLabel'>
                                            <img src={require('../../assets/images/svg/requested.svg')} alt="icon" style={{ display: card.CV_productStatus === "Requested" ? 'block' : 'none' }} />
                                        </div>
                                        <div className='edit-icon'>
                                            {/*   */}
                                            <img src={require('../../assets/images/svg/edit-icon.svg')} onClick={(e) => showpanels("showEditPanel", e, card)} />
                                            {/* onClick={() => { setIsPanelOpen(true) }} */}
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
                                            <li><a onClick={() => { window.location.href = `https://teams.microsoft.com/l/chat/0/0?users=${card.Author.EMail}` }} ><img src={require('../../assets/images/svg/ms-teams.svg')}></img></a></li>
                                            <li><a onClick={() => { window.location.href = `mailTo:${card.Author.EMail}` }} ><img src={require('../../assets/images/svg/outlook.svg')}></img></a></li>
                                            <li><a onClick={() => { window.location.href = `tel:${card.CV_ContactNo}` }}><img src={require('../../assets/images/svg/phone.svg')}></img></a></li>
                                            <li><a onClick={() => { navigator.share({ title: 'TestUrlShare', url: 'https://www.google.com' }) }}><img src={require('../../assets/images/svg/share.svg')}></img></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* <div className='pagination-empty-card'> */}
                        {/* <div className='pagination-empty-card'>
                        <div className='custmCols emptyCard'>
                            <div className='emptyCardContainer'  onClick={() => { setIsPanelOpen(true) }}>
                           
                                <div className='addIcon'>
                                    <img src={require('../../assets/images/svg/plus-icon.svg')} />
                                </div>
                            </div>
                        </div>
                    </div> */}
                    </div>
                </div>
            }

            {/********************************************************************admin flow sell end region********************************************************************/}

            {/* Panel Start Region */}
            <Panel
                className="panel-containers product-panel-container"
                // panel-container product-panel-container
                onRenderHeader={panelHeader}
                isOpen={isPanel}
                onDismiss={() => { setIsPanel(false) }}
                closeButtonAriaLabel="Close">
                <AddEditProductPanelComponent context={props.context} onPanelChange={setIsPanel} onChangeAddPageToggle={AddPageToggle} callFetchSetData={props.callFetchSetData} editData={editData} selectedView={selectedView}/>
            </Panel>
            {/* Panel End Region */}





        </>
    );
    function _onChangeChoiceGroup(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
        setSelectedView(option.key)
    }

    // Set Add-Edit panel
    function showpanels(action: any, event: any, item: any) {
        if (action == "showAddPanel") {
            setAddPageToggle(true);
            setIsPanel(true);
            setEditData(item);
            event.stopPropagation();
        }
        if (action == "showEditPanel") {
            setAddPageToggle(false);
            setIsPanel(true);
            setEditData(item);
            event.stopPropagation();
        }
    }

    // Fetch current login user Service
    async function _getAdminUser(): Promise<any> {
        return new Promise((resolve, reject) => {
            commonServices._getOwnerSiteGroupUsers(sp)
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

export default SellProducts;

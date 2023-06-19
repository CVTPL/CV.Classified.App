import * as React from 'react';
import { IClassifiedCardComponentProps } from './IClassifiedCardComponentProps';
import {  Panel } from 'office-ui-fabric-react';
import AddEditProductPanelComponent from '../addEditProductPanelComponent/AddEditProductPanelComponent';
const ClassifiedCardComponent: React.FunctionComponent<IClassifiedCardComponentProps> = (props) => {


  const [isPanel, setIsPanel] = React.useState(false);
    const classifiedCard = [
        {
          id: 1,
          urlImage: require('../../assets/images/png/computer.png'),
          title: 'Iphone 11',
          content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard.',
          location:'Iskcon Ahmedabad',
          userName:'Bhavin Patel',
          price:'₹12000',
          class:'disabled',
          sold:  require('../../assets/images/svg/sold.svg'),
      
         
        },
        {
              urlImage: require('../../assets/images/png/computer.png'),
            title: 'Iphone 11',
            content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard.',
            location:'Iskcon Ahmedabad',
            userName:'Bhavin Patel',
            price:'₹15000'
        },
        {
          id: 3,
            urlImage: require('../../assets/images/png/computer.png'),
          title: 'Iphone 11',
          content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard.',
          location:'Iskcon Ahmedabad',
          userName:'Bhavin Patel',
          price:'₹14000'
        },
        {
          id: 4,
            urlImage: require('../../assets/images/png/computer.png'),
          title: 'Iphone 11',
          content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard.',
          location:'Iskcon Ahmedabad',
          userName:'Bhavin Patel',
          price:'₹21000'
        },

        {
            id: 5,
            urlImage: require('../../assets/images/png/computer.png'),
            title: 'Iphone 11',
            content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard.',
            location:'Iskcon Ahmedabad',
            userName:'Bhavin Patel',
            price:'₹45000'
          },
      ];
      
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
              <div className='custmCols'>
                <div className={"content-card" + " " + card.class}>
                  <div className='card-header'>
                    <div className='prdPrice'>
                    <img src={card.urlImage} alt={card.title} />
                    <div className='prd-amt'>
                      {card.price}
                      </div>
                    </div>
                    
                      <div className='soldLabel'>
                        <img src={card.sold} alt="icon"  />
                      </div>
                      <div className='edit-icon' onClick={() => {
                                    setIsPanel(true);
                                  }}>
                        <img src={require('../../assets/images/svg/edit-icon.svg')} />
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
                      <li><a href="https://www.microsoft.com/en-in/microsoft-teams/log-in"><img src={require('../../assets/images/svg/ms-teams.svg')}></img></a></li>
                       <li><a href="https://outlook.live.com/owa/"><img src={require('../../assets/images/svg/outlook.svg')}></img></a></li>
                       <li><a href="tel:+917852693210"><img src={require('../../assets/images/svg/phone.svg')}></img></a></li>
                       <li><a href=""  onClick={()=>{navigator.share({ title: 'TestUrlShare', url: 'https://www.google.com'})}}><img src={require('../../assets/images/svg/share.svg')}></img></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            <div className='custmCols emptyCard'>
          <div className='emptyCardContainer'>
            <div className='addIcon'>
            <img src={require('../../assets/images/svg/plus-icon.svg')} />
            </div>
            </div>              
            </div>
            {/* Panel Start Region */}
            <div>
            <Panel
                  className="panel-container product-panel-container"
                   onRenderHeader={panelHeader}
                   isOpen={isPanel}
                   onDismiss={() => {setIsPanel(false)}}
                    closeButtonAriaLabel="Close"
                    isHiddenOnDismiss={false}>
                    <AddEditProductPanelComponent />
                    </Panel>
            </div>
            {/* Panel End Region */}
            
        </div>
        </div>
    </>
  );

};

export default ClassifiedCardComponent;

import * as React from 'react';
import { IClassifiedCardComponentProps } from './IClassifiedCardComponentProps';
import { DefaultButton, Panel } from 'office-ui-fabric-react';



const ClassifiedCardComponent: React.FunctionComponent<IClassifiedCardComponentProps> = (props) => {
  const [isOpen, isClose] = React.useState(false);
    const classifiedCard = [
        {
          id: 1,
          urlImage: require('../../assets/images/png/computer.png'),
          title: 'Iphone 11',
          content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard.',
          location:'Iskcon Ahmedabad',
          userName:'Bhavin Patel',
          price:'₹12000'
      
         
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
      
      const assessmentFormPanelHeader = () => (
        <div className="panel-header">
           <h1>add product</h1>
          </div>
      )

  return (
    <>
      <div className='classified-cards'>
        <div className="custmRow">
        {classifiedCard.map((card) => (
              <div className='custmCols'>
                <div className='content-card'>
                  <div className='card-header'>
                    <img src={card.urlImage} alt={card.title} />
                    <div className='prd-amt'>
                      {card.price}
                      </div>
                      <div className='edit-icon'>
                        <img src={require('../../assets/images/svg/edit-icon.svg')} />
                        </div>

                        <div>
                          <DefaultButton text="Open panel" onClick={openPanel} />
                          <Panel className="panel-container assessment-panel-container"
                            onRenderHeader={assessmentFormPanelHeader}
                            isOpen={isOpen}
                            onDismiss={() => { assessmentFormPanelClose() }}
                            closeButtonAriaLabel="Close">

                            </Panel>
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
                       <li><a href=""><img src={require('../../assets/images/svg/share.svg')}></img></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
        </div>

    </>
  );
  function assessmentFormPanelClose() {
    isClose(false);
  }

  function openPanel (){
    isClose(false);
  }

};

export default ClassifiedCardComponent;

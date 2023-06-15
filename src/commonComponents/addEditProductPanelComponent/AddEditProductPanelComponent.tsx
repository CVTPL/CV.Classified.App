import * as React from 'react';
import { useState } from 'react';
import { IAddEditProductPanelComponentProps } from './IAddEditProductPanelComponentProps';
import { Dropdown, IDropdownOption, PrimaryButton } from 'office-ui-fabric-react';
import { IFilePickerResult, FilePicker } from '@pnp/spfx-controls-react/lib/FilePicker';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";


const AddEditProductPanelComponent: React.FunctionComponent<IAddEditProductPanelComponentProps> = (props) => {

  const [richTextValue, setRichTextValue] = useState('');



  const productOptions: IDropdownOption[] = [
    { key: 'Iphone', text: 'Iphone' },
    { key: 'Smart Watch', text: 'Smart Watch' },
    { key: 'Alexa', text: 'Alexa' },
    { key: 'Monitor', text: 'Monitor' },
    { key: 'laptop', text: 'Laptop' },
  ];

  const statusOpts: IDropdownOption[] = [
    { key: 'Active', text: 'Active' },
    { key: 'InActive', text: 'InActive' },
    { key: 'Draft', text: 'Draft'},
  ];



  return (
        <>
        <div className="panel-body">
        <div className='panelContainer'>
        <div className='panelInnerbox'>
        <div className="ms-Grid">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
          <div className="material-textfield">
          <input placeholder=" " type="text" value="Microsoft Surface Laptop" />
          <label>Title</label>
            </div>
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
          <div className="material-textfield-dropdown">
                    <Dropdown
                  defaultSelectedKey="laptop"
                  options={productOptions}
                />
            </div>
          </div>

          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
          <div className="material-textfield">
          <input placeholder=" " type="text" value="14,500" />
          <label>Price</label>
            </div>
          </div>
        </div>


        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
          <div className="material-textfield">
          <input placeholder=" " type="text" value="Fake Location" />
          <label>Location</label>
            </div>
          </div>
          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
          <div className="material-textfield-dropdown">
                <Dropdown
                  defaultSelectedKey="Active"
                  options={statusOpts}
                />
            </div>
          </div>
        </div>

        <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
        {/* <RichText label="My multiline text field" value={() => {handleRichTextChange}} /> */}
        <RichText value={richTextValue} onChange={(text)=>onTextChange(text)} />
            </div>
          </div>

          <div className='ms-Grid-row'>
          </div>
      </div>
        </div>  
        </div>
        </div>
          <div className="panel-footer">
          <div className="btn-container btn-end">
          <PrimaryButton className="btn-secondary-4" text="Cancel" />
          <PrimaryButton className="btn-secondary-4" text="Update" />
        </div>
      </div>

        </>

  ) ;

  function onTextChange (newText: string)  {
    // this.properties.myRichText = newText;
    console.log(newText);
    return newText;
  }







};

export default AddEditProductPanelComponent;

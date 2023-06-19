import * as React from 'react';
import { createRef, useState } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import { IAddEditProductPanelComponentProps } from './IAddEditProductPanelComponentProps';
import { Dialog, Dropdown, IDropdownOption, PrimaryButton } from 'office-ui-fabric-react';
import { IFilePickerResult, FilePicker } from '@pnp/spfx-controls-react/lib/FilePicker';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import CommonDeleteDailog from '../CommonDeleteDailog/CommonDeleteDailog';


const AddEditProductPanelComponent: React.FunctionComponent<IAddEditProductPanelComponentProps> = (props) => {

  const [richTextValue, setRichTextValue] = useState('');
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  const dropzoneRef:any = createRef()


  const [hideDialog, setHideDialog]: any = React.useState(false);
  const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };


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
    { key: 'Draft', text: 'Draft' },
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
                  <RichText value={richTextValue} onChange={(text) => onTextChange(text)} />
                </div>
              </div>

              <div className='ms-Grid-row'>
                <Dropzone ref={dropzoneRef}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                  )}
                </Dropzone>
                {/* <section className="container">
              <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
          <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="panel-footer">
        <div className="btn-container btn-end">
          <PrimaryButton className="btn-secondary-4" text="Cancel" />
          <PrimaryButton className="btn-secondary-2" text="Delete" onClick={toggleShowDialog} />
          <PrimaryButton className="btn-secondary-3" text="Update" />
        </div>
      </div>


      {/* <DefaultButton secondaryText="Opens the Sample Dialog" text="Open Dialog" /> */}
      <Dialog
        hidden={!hideDialog}
        onDismiss={toggleHideDialog}
        // dialogContentProps={dialogContentProps}
        modalProps={modelProps}>
        <CommonDeleteDailog toggleHideDialog={toggleHideDialog} />
      </Dialog>
    </>

  );

  function onTextChange(newText: string) {
    console.log(newText);
    return newText;
  }

  function toggleShowDialog() {
    setHideDialog(true);
  }

  function toggleHideDialog() {
    setHideDialog(false);
  }

};

export default AddEditProductPanelComponent;

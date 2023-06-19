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
  const dropzoneRef: any = createRef()
  const [files, setFiles]: any = React.useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles);
      // setFiles(acceptedFiles.map(file => Object.assign(file, {
      //     preview: URL.createObjectURL(file)
      //   })))
    }
  });

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

  const thumbsContainer: any = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };

  const thumb: any = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };

  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };

  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };

  const thumbs = files.map((file: any) => {
    return (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={URL.createObjectURL(file)}
            style={img}
            // Revoke data uri after image is loaded
            onLoad={() => { URL.revokeObjectURL(file.preview) }}
          />
        </div>
      </div>
    )
  });



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
                  <div className="material-textfield shortDescription">
                    <input placeholder=" " value="One day old Microsoft Surface Laptop 5 Intel Core i5 12th Gen in mint condition urgent sale." />
                    <label>Short Description</label>
                  </div>
                </div>
              </div>

              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                  <RichText value={richTextValue} onChange={(text) => onTextChange(text)} />
                </div>
              </div>

              <div className='ms-Grid-row'>
                {/* <Dropzone ref={dropzoneRef}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                  )}
                </Dropzone> */}
                <section className="container">
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                  <aside style={thumbsContainer}>
                    {thumbs}
                  </aside>
                </section>
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

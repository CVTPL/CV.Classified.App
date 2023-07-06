import * as React from 'react';
import { createRef, useState } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import { IAddEditProductPanelComponentProps } from './IAddEditProductPanelComponentProps';
import { Dialog, Dropdown, IDropdownOption, IIconProps, Icon, IconButton, MessageBar, PrimaryButton, TextField } from 'office-ui-fabric-react';
import { IFilePickerResult, FilePicker } from '@pnp/spfx-controls-react/lib/FilePicker';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
// import CommonDeleteDailog from '../CommonDeleteDailog/CommonDeleteDailog';
import commonServices from '../../services/commonServices';
import { BallTriangle } from 'react-loader-spinner';

import { spfi, SPFx } from "@pnp/sp";
import CommonAlertDailog from '../CommonAlertDailog/CommonAlertDailog';

const AddEditProductPanelComponent: React.FunctionComponent<IAddEditProductPanelComponentProps> = (props) => {

  const sp = spfi().using(SPFx(props.context));

  const [addProductInputList, setAddProductInputList] = React.useState<any>({});
  const [errorList, setErrorList] = React.useState<any>({});
  const [richTextValue, setRichTextValue] = useState('');
  const dropzoneRef: any = createRef()
  const [files, setFiles]: any = React.useState([]);

  const [productCategoryOptions, setProductCategoryOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      const errorsCopy = errorList
      if (errorsCopy["Attachments"] && errorsCopy["Attachments"].length > 0) {
        delete errorsCopy["Attachments"];
      }
      setErrorList(errorsCopy);
      setFiles(acceptedFiles);
      // setFiles(acceptedFiles.map(file => Object.assign(file, {
      //     preview: URL.createObjectURL(file)
      //   })))
    }
  });

  const [hideDialog, setHideDialog]: any = React.useState(false);

  const [rejectHideDialog, setRejectHideDialog]: any = React.useState(false);

  const [approveDialog , setApproveDialog] : any = React.useState(false)




  const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },

  };


  const rejectedModelProps = {
    isBlocking: false,
    className: "reject-dialog-container",
  }


  const successModalProps = React.useMemo(
    () => ({
      isBlocking: true,
      className: "success-dialog-container",
    }), [],
  );

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
    marginBottom: 8,
    marginRight: 21,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
    position: 'relative'
  };

  const thumbInner = {
    display: 'flex',
    minWidth: 100,
    overflow: 'hidden',
    borderRadius: '10px',
  };

  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };


  const addFriendIconProps: IIconProps = {
    iconName: 'ChromeClose',
  };


  const thumbs = files.map((file: any) => {
    return (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={URL.createObjectURL(file)}
            style={img}
            // Revoke data URI after the image is loaded
            onLoad={() => { URL.revokeObjectURL(file.preview) }}
            alt="Preview"
          />

        </div>
        <IconButton iconProps={addFriendIconProps} className='crossIconBtn' />
      </div>
    )
  });

  const handleChangeProductInput = (e: any) => {
    const errorsCopy = errorList;
    if (errorsCopy[e.target.id] && errorsCopy[e.target.id].length > 0) {
      delete errorsCopy[e.target.id];
    }
    setErrorList(errorsCopy);

    setAddProductInputList({ ...addProductInputList, [e.target.id]: e.target.value });
  }


  const handleChangeDropdown = (ev: any, op: any, i: any) => {
    const errorsCopy = errorList;
    if (errorsCopy[ev.target.id] && errorsCopy[ev.target.id].length > 0) {
      delete errorsCopy[ev.target.id];
    }

    if (op.key === "Other") {
      delete errorsCopy["CV_otherProductCategory"];
      delete addProductInputList["CV_otherProductCategory"];
    }
    setErrorList(errorsCopy);

    // if (ev.target.id === "CV_productCategory") {
    //   if (op.key === "Other") {
    //     setTextfieldVisible(true);
    //   }
    //   else {
    //     setTextfieldVisible(false);
    //   }
    // }

    setAddProductInputList({ ...addProductInputList, [ev.target.id]: op.key });
  }

  function onTextChange(newText: string) {
    // console.log(newText);
    const errorsCopy = errorList;
    if (errorsCopy["CV_productDescription"] && errorsCopy["CV_productDescription"].length > 0) {
      delete errorsCopy["CV_productDescription"];
    }
    setErrorList(errorsCopy);

    setRichTextValue(newText);
    return newText;
  }

  const _getListColumns = (): Promise<any> => {

    return new Promise((resolve, reject) => {
      commonServices._getContentTypeColumns(sp, "0x0100947717a5ffce43278ebe6ce504996740")
        .then((response: any) => {
          resolve(response);
        },
          (error: any): any => {
            reject(error);
            console.log(error);
            alert("Error while getting data");
          });
    });
  }

  const _addProductData = (productData: any): Promise<any> => {

    return new Promise((resolve, reject) => {
      commonServices._addListItem(sp, "Classified Products", productData)
        .then((response: any) => {
          resolve(response);
        },
          (error: any): any => {
            reject(error);
            console.log(error);
            alert("Error while adding data");
          });
    });
  }

  const _addProductAttachments = (itemId: any, productAttachment: any): Promise<any> => {

    return new Promise((resolve, reject) => {
      commonServices._addMultipleAttachment(sp, "Classified Products", itemId, productAttachment)
        .then((response: any) => {
          resolve(response);
        },
          (error: any): any => {
            reject(error);
            console.log(error);
            alert("Error while adding data");
          });
    });
  }

  const addProductSubmit = () => {

    let productData = { ...addProductInputList, ["CV_productDescription"]: richTextValue };
    let requiredFieldArr = ["Title", "CV_productCategory", "CV_productPrice", "CV_ContactNo", "CV_location", "CV_productStatus", "CV_shortDescription"];

    commonServices._checkRequiredValidation(addProductInputList, richTextValue, files, requiredFieldArr).then((response) => {

      if (Object.keys(response).length > 0) {
        setErrorList(response);
      }
      else {
        // console.log(addProductInputList);
        // console.log(files);

        _addProductData(productData).then((response) => {
          // console.log(response);
          setShowLoader(true);

          _addProductAttachments(response.data.Id, files).then((response) => {

            // console.log(response);
            setAddProductInputList({});
            setRichTextValue('');
            setFiles([]);
            setErrorList({});
            // setTextfieldVisible(false);
            setShowLoader(false);
            props.onPanelChange(false);
          })
        })

        // console.log(productData);
      }
    });
  }

  React.useEffect(() => {

    let tempProductCategoryOptions: any = [];
    let tempStatusOptions: any = [];

    _getListColumns().then((response) => {
      // console.log(response);

      let filterProductCategoryOptions: any = response.filter((filterRes: any) => (filterRes.InternalName === "CV_productCategory"));

      filterProductCategoryOptions[0].Choices.map((valChoice: any) => {
        tempProductCategoryOptions.push({ key: valChoice, text: valChoice });
      });
      // console.log(tempProductCategoryOptions);
      tempProductCategoryOptions.push({ key: "Other", text: "Other" });
      setProductCategoryOptions(tempProductCategoryOptions);

      let filterStatusOptions: any = response.filter((filterRes: any) => (filterRes.InternalName === "CV_productStatus"));

      filterStatusOptions[0].Choices.map((valChoice: any) => {
        tempStatusOptions.push({ key: valChoice, text: valChoice });
      });
      // console.log(tempStatusOptions);
      setStatusOptions(tempStatusOptions);
    })
  }, []);

  function setIsPanel(arg0: boolean) {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <div className={"LoaderDivCustom"} hidden={!showLoader}>
        <div className={"LoaderChild"}>
          <BallTriangle height={100} width={100} radius={5} color="#5F9BE7" ariaLabel="ball-triangle-loading" visible={showLoader} />
        </div>
      </div>

      <div className="panel-body">
        <div className='panelContainer'>
          <div className='panelInnerbox'>
            <div className="ms-Grid">
              <div className="ms-Grid-row">
                <div className='messageBar'>
                  <MessageBar className='message-alert-bar' role="none">
                  <img src={require("../../assets/images/svg/info-red-icon.svg")} alt="Not Available Now" title="Info Icon" />
                  <span>
                  The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                  </span>
                </MessageBar>                
            </div>
                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6 customTextFiled">
                  <div className="material-textfield">
                    <input placeholder=" " type="text" id="Title" value={addProductInputList.Title ? addProductInputList.Title : ""} onChange={(e) => { handleChangeProductInput(e) }} />
                    <label>Title</label>
                  </div>
                  {errorList.Title && <span className='requiredmsg'>{errorList.Title}</span>}
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6 customTextFiled">
                  <div className="material-textfield-dropdown">
                    <Dropdown
                      placeholder="Category"
                      selectedKey={addProductInputList.CV_productCategory ? addProductInputList.CV_productCategory : ""}
                      options={productCategoryOptions}
                      id="CV_productCategory"
                      onChange={(ev, op, i) => handleChangeDropdown(ev, op, i)}
                    />
                  </div>
                  {errorList.CV_productCategory && <span className='requiredmsg'>{errorList.CV_productCategory}</span>}
                </div>
              </div>
              <div className="ms-Grid-row">
                {addProductInputList.CV_productCategory === "Other" ?
                  <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6 customTextFiled">
                    <div className="material-textfield">
                      <input placeholder=" " type="text" id="CV_otherProductCategory" value={addProductInputList.CV_otherProductCategory ? addProductInputList.CV_otherProductCategory : ""} onChange={(e) => { handleChangeProductInput(e) }} />
                      <label>Other Category</label>
                    </div>
                    {errorList.CV_otherProductCategory && <span className='requiredmsg'>{errorList.CV_otherProductCategory}</span>}
                  </div>
                  :
                  ""}
                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6 customTextFiled">
                  <div className="material-textfield">
                    <input placeholder=" " type="number" id="CV_productPrice" value={addProductInputList.CV_productPrice ? addProductInputList.CV_productPrice : ""} onChange={(e) => { handleChangeProductInput(e) }} />
                    <label>Price</label>
                  </div>
                  {errorList.CV_productPrice && <span className='requiredmsg'>{errorList.CV_productPrice}</span>}
                </div>

                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6 customTextFiled">
                  <div className="material-textfield">
                    <input placeholder=" " type="number" id="CV_ContactNo" value={addProductInputList.CV_ContactNo ? addProductInputList.CV_ContactNo : ""} onChange={(e) => { handleChangeProductInput(e) }} />
                    <label>Contact No</label>
                  </div>
                  {errorList.CV_ContactNo && <span className='requiredmsg'>{errorList.CV_ContactNo}</span>}
                </div>

                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6 customTextFiled">
                  <div className="material-textfield">
                    <input placeholder=" " type="text" id="CV_location" value={addProductInputList.CV_location ? addProductInputList.CV_location : ""} onChange={(e) => { handleChangeProductInput(e) }} />
                    <label>Location</label>
                  </div>
                  {errorList.CV_location && <span className='requiredmsg'>{errorList.CV_location}</span>}
                </div>


                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6 customTextFiled">
                  <div className="material-textfield-dropdown">
                    <Dropdown
                      placeholder="Status"
                      selectedKey={addProductInputList.CV_productStatus ? addProductInputList.CV_productStatus : ""}
                      options={statusOptions}
                      id="CV_productStatus"
                      onChange={(ev, op, i) => handleChangeDropdown(ev, op, i)}
                    />
                  </div>
                  {errorList.CV_productStatus && <span className='requiredmsg'>{errorList.CV_productStatus}</span>}
                </div>
              </div>

              <div className="ms-Grid-row customRichText">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 customTextFiled">
                  <div className="material-textfield textareaContainer">
                    <textarea placeholder=" " id="CV_shortDescription" value={addProductInputList.CV_shortDescription ? addProductInputList.CV_shortDescription : ""} onChange={(e) => { handleChangeProductInput(e) }} ></textarea>
                    <label>Short Description</label>
                  </div>
                  {errorList.CV_shortDescription && <span className='requiredmsg'>{errorList.CV_shortDescription}</span>}
                </div>
              </div>


              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 customTextFiled">
                  <RichText value={richTextValue ? richTextValue : ''} onChange={(text) => onTextChange(text)} placeholder='Long Description' />
                  {errorList.CV_productDescription && <span className='requiredmsgRichText'>{errorList.CV_productDescription}</span>}

                </div>
              </div>

              <div className='ms-Grid-row'>
                <div className='zoneContent'>
                  <p>Product Images</p>
                  <section className="dropZoneContainer">
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <p>+</p>
                    </div>
                    <aside style={thumbsContainer}>
                      {thumbs}
                    </aside>
                  </section>
                  {errorList.Attachments && <span className='requiredmsgUploadImages'>{errorList.Attachments}</span>}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        props.onChangeAddPageToggle ?
          <div className="panel-footer">
            <div className="btn-container btn-end">
              <PrimaryButton className="btn-secondary-4" text="Cancel" onClick={() => { props.onPanelChange(false) }} />
              <PrimaryButton className="btn-secondary-3" text="Add" onClick={() => { addProductSubmit() }} />
            </div>
          </div>
          :
          <div className="panel-footer">
            <div className="btn-container btn-end">
              <PrimaryButton className="btn-secondary-4" text="Cancel" onClick={() => { props.onPanelChange(false) }} />
              <PrimaryButton className="btn-secondary-2" text="Delete" onClick={() => { toggleShowDialog() }} />
              <PrimaryButton className="btn-secondary-3" text="Update" onClick={() => { addProductSubmit() }} />
              <PrimaryButton className="btn-secondary-2" text="Reject" onClick={() => { setRejectHideDialog(true) }} />
              <PrimaryButton className="btn-secondary-5" text="Approve" onClick={() => { setApproveDialog(true) }} />
            </div>
          </div>

      }

      {/* <DefaultButton secondaryText="Opens the Sample Dialog" text="Open Dialog" /> */}
      <Dialog
        hidden={!hideDialog}
        onDismiss={toggleHideDialog}
        modalProps={modelProps}>
        <CommonAlertDailog
          toggleHideDialog={toggleHideDialog}
          rejectMsg={undefined}
          rejectSubmit={undefined}
          alertBoxFor={"DeleteModal"}
          closeDailogBox={undefined}
          message={"Are you sure do you want to delete"}
          _deleteFunction={undefined}
        />
      </Dialog>


      {/* Reject Modal popup start region  */}
      <Dialog hidden={!rejectHideDialog} onDismiss={rejectHideDialog} modalProps={rejectedModelProps}>
        <CommonAlertDailog
          alertBoxFor={"RejectModal"}
          closeDailogBox={() => { setIsPanel(false); }}
          rejectMsg={"Are you sure do u want to reject this product?"} //for reject only
          rejectSubmit={"RequiredFieldError"} //for reject only 
          message={"You have successfully rejected this request."}
          _deleteFunction={""}
          toggleHideDialog={undefined}
        />
      </Dialog>
      {/*  */}


       {/* Approve Modal popup start region  */}
       <Dialog hidden={!approveDialog} onDismiss={approveDialog} modalProps={successModalProps}>
        <CommonAlertDailog
          alertBoxFor={"approvedModal"}
          closeDailogBox={() => { setIsPanel(false); }}
          rejectMsg={""} //for reject only
          rejectSubmit={""} //for reject only 
          message={"You have successfully approved this request."}
          _deleteFunction={""}
          toggleHideDialog={undefined}
        />
      </Dialog>
      {/*  */}

    </>

  );



  function toggleShowDialog() {
    setHideDialog(true);
  }

  function toggleHideDialog() {
    setHideDialog(false);
  }
};

export default AddEditProductPanelComponent;

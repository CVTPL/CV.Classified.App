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
import { clone } from '@microsoft/sp-lodash-subset';
import CommonAlertDailog from '../CommonAlertDailog/CommonAlertDailog';

const AddEditProductPanelComponent: React.FunctionComponent<IAddEditProductPanelComponentProps> = (props) => {
  const sp = spfi().using(SPFx(props.context));

  const todayDate = new Date();
  const currentTime = todayDate.getDate() + '_' + (todayDate.getMonth() + 1) + '_' + todayDate.getFullYear() + '_' + todayDate.getHours() + '_' + todayDate.getMinutes() + '_' + todayDate.getSeconds();

  const [addProductInputList, setAddProductInputList] = React.useState<any>({});
  const [errorList, setErrorList] = React.useState<any>({});
  const [richTextValue, setRichTextValue] = useState('');
  const dropzoneRef: any = createRef()
  const [files, setFiles]: any = React.useState([{}]);

  const [productCategoryOptions, setProductCategoryOptions] = useState([]);
  // const [statusOptions, setStatusOptions] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [hideDialog, setHideDialog]: any = React.useState(false);
  const [rejectHideDialog, setRejectHideDialog]: any = React.useState(false);
  const [approveDialog, setApproveDialog]: any = React.useState(false)

  const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },

  };

  // Dropzone handler
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      const errorsCopy = errorList;
      if (errorsCopy["Attachments"] && errorsCopy["Attachments"].length > 0) {
        delete errorsCopy["Attachments"];
      }
      setErrorList(errorsCopy);
      const combinedFiles = [...files, ...acceptedFiles];
      combinedFiles.splice(combinedFiles.lastIndexOf(combinedFiles.filter((ele: any) => Object.keys(ele).length == 0)[0]), 1);
      combinedFiles.push({});
      setFiles(combinedFiles);
    }
  });

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

  // product edit status options
  const statusOptions: IDropdownOption[] = [
    { key: 'Active', text: 'Active' },
    { key: 'InActive', text: 'InActive' },
    { key: 'Sold', text: 'Sold' },
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

  // Images display & input styles
  const thumbs = files.map((file: any) => {
    return (
      Object.keys(file).length > 0 ?
        <div style={thumb} key={file.ServerRelativeUrl ? file.Name : file.name}>
          <div style={thumbInner}>
            <img
              // src={URL.createObjectURL(file.ServerRelativeUrl)}
              src={file.ServerRelativeUrl ? file.ServerRelativeUrl : URL.createObjectURL(file)}
              style={img}
              // Revoke data URI after the image is loaded
              onLoad={() => { URL.revokeObjectURL(file.preview) }}
              alt="Preview"
            />

          </div>
          {
            addProductInputList.CV_productStatus !== "Requested" ?
              <IconButton iconProps={addFriendIconProps} className='crossIconBtn' onClick={() => { file.ServerRelativeUrl ? removeInputImage(file.Name) : removeInputImage(file.name) }} />
              : ""
          }
        </div>
        :
        addProductInputList.CV_productStatus !== "Requested" ?
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>+</p>
          </div>
          : ""
    )
  });

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

      // let filterStatusOptions: any = response.filter((filterRes: any) => (filterRes.InternalName === "CV_productStatus"));

      // filterStatusOptions[0].Choices.map((valChoice: any) => {
      //   tempStatusOptions.push({ key: valChoice, text: valChoice });
      // });
      // console.log(tempStatusOptions);
      // setStatusOptions(tempStatusOptions);
    })

    if (Object.keys(props.editData).length > 0) {
      setAddProductInputList(props.editData);
      setRichTextValue(props.editData.CV_productDescription);
      const combinedFiles = [...files, ...props.editData.Images];
      combinedFiles.splice(combinedFiles.lastIndexOf(combinedFiles.filter((ele: any) => Object.keys(ele).length == 0)[0]), 1);
      combinedFiles.push({});
      setFiles(combinedFiles);
    }

  }, []);

  function setIsPanel(arg0: boolean) {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      {/* {/ Loader Start /} */}
      <div className="fixed-loader-container" hidden={!showLoader}>
        <div className="fixed-loader-child">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#5F9BE7"
            ariaLabel="ball-triangle-loading"
            visible={showLoader}
          />
        </div>
      </div>
      {/* Loader End  */}
      <div className="panel-body">
        <div className='panelContainer'>
          <div className='panelInnerbox'>
            <div className="ms-Grid">
              <div className="ms-Grid-row">
                <div className='messageBar'>
                  {
                    addProductInputList.CV_comment ?
                      <MessageBar className='message-alert-bar' role="none">
                        <img src={require("../../assets/images/svg/info-red-icon.svg")} alt="Not Available Now" title="Info Icon" />
                        <span> {addProductInputList.CV_comment}
                          {/* The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. */}
                        </span>
                      </MessageBar>
                      : ""
                  }
                </div>

                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6 customTextFiled">
                  <div className="material-textfield">
                    <input placeholder=" " type="text" id="Title" value={addProductInputList.Title ? addProductInputList.Title : ""} onChange={(e) => { handleChangeProductInput(e) }} disabled={addProductInputList.CV_productStatus == "Requested" ? true : false} />
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
                      disabled={addProductInputList.CV_productStatus == "Requested" ? true : false}
                    />
                  </div>
                  {errorList.CV_productCategory && <span className='requiredmsg'>{errorList.CV_productCategory}</span>}
                </div>
              </div>

              <div className="ms-Grid-row">
                {addProductInputList.CV_productCategory === "Other" ?
                  <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6 customTextFiled">
                    <div className="material-textfield">
                      <input placeholder=" " type="text" id="CV_otherProductCategory" value={addProductInputList.CV_otherProductCategory ? addProductInputList.CV_otherProductCategory : ""} onChange={(e) => { handleChangeProductInput(e) }} disabled={addProductInputList.CV_productStatus == "Requested" ? true : false} />
                      <label>Other Category</label>
                    </div>
                    {errorList.CV_otherProductCategory && <span className='requiredmsg'>{errorList.CV_otherProductCategory}</span>}
                  </div>
                  :
                  ""}

                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6 customTextFiled">
                  <div className="material-textfield">
                    <input placeholder=" " type="number" id="CV_productPrice" value={addProductInputList.CV_productPrice ? addProductInputList.CV_productPrice : ""} onChange={(e) => { handleChangeProductInput(e) }} disabled={addProductInputList.CV_productStatus == "Requested" ? true : false} />
                    <label>Price</label>
                  </div>
                  {errorList.CV_productPrice && <span className='requiredmsg'>{errorList.CV_productPrice}</span>}
                </div>

                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6 customTextFiled">
                  <div className="material-textfield">
                    <input placeholder=" " type="number" id="CV_ContactNo" value={addProductInputList.CV_ContactNo ? addProductInputList.CV_ContactNo : ""} onChange={(e) => { handleChangeProductInput(e) }} disabled={addProductInputList.CV_productStatus == "Requested" ? true : false} />
                    <label>Contact No</label>
                  </div>
                  {errorList.CV_ContactNo && <span className='requiredmsg'>{errorList.CV_ContactNo}</span>}

                </div>

                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6 customTextFiled">
                  <div className="material-textfield">
                    <input placeholder=" " type="text" id="CV_location" value={addProductInputList.CV_location ? addProductInputList.CV_location : ""} onChange={(e) => { handleChangeProductInput(e) }} disabled={addProductInputList.CV_productStatus == "Requested" ? true : false} />
                    <label>Location</label>
                  </div>
                  {errorList.CV_location && <span className='requiredmsg'>{errorList.CV_location}</span>}
                </div>

                {
                  addProductInputList.CV_productStatus === undefined || addProductInputList.CV_productStatus === "" || addProductInputList.CV_productStatus === "Requested" || addProductInputList.CV_productStatus === "Reject" ? "" :
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6 customTextFiled">
                      <div className="material-textfield-dropdown">
                        <Dropdown
                          placeholder="Status"
                          selectedKey={addProductInputList.CV_productStatus ? addProductInputList.CV_productStatus : "Active"}
                          options={statusOptions}
                          id="CV_productStatus"
                          onChange={(ev, op, i) => handleChangeDropdown(ev, op, i)}
                          disabled={addProductInputList.CV_productStatus == "Requested" ? true : false}
                        />
                      </div>
                      {errorList.CV_productStatus && <span className='requiredmsg'>{errorList.CV_productStatus}</span>}
                    </div>
                }
              </div>

              <div className="ms-Grid-row customRichText">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 customTextFiled">
                  <div className="material-textfield textareaContainer">
                    <textarea placeholder=" " id="CV_shortDescription" value={addProductInputList.CV_shortDescription ? addProductInputList.CV_shortDescription : ""} onChange={(e) => { handleChangeProductInput(e) }} disabled={addProductInputList.CV_productStatus == "Requested" ? true : false}></textarea>
                    <label>Short Description</label>
                  </div>
                  {errorList.CV_shortDescription && <span className='requiredmsg'>{errorList.CV_shortDescription}</span>}
                </div>
              </div>

              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 customTextFiled">
                  <RichText value={richTextValue ? richTextValue : ''} onChange={(text) => onTextChange(text)} placeholder='Long Description' isEditMode={addProductInputList.CV_productStatus == "Requested" ? false : true} />
                  {errorList.CV_productDescription && <span className='requiredmsgRichText'>{errorList.CV_productDescription}</span>}
                </div>
              </div>

              <div className='ms-Grid-row'>
                <div className='zoneContent'>
                  <p>Product Images</p>
                  <section className="dropZoneContainer">
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

      {props.onChangeAddPageToggle ?
        <div className="panel-footer">
          <div className="btn-container btn-end">
            <PrimaryButton className="btn-secondary-4" text="Cancel" onClick={() => { closePanel() }} />
            <PrimaryButton className="btn-secondary-3" text="Add" onClick={() => { addProductSubmit() }} />
          </div>
        </div>
        :
        props.selectedView === "myproducts" ?
          <div className="panel-footer">
            <div className="btn-container btn-end">
              <PrimaryButton className="btn-secondary-4" text="Cancel" onClick={() => { closePanel() }} />
              <PrimaryButton className="btn-secondary-2" text="Delete" onClick={() => { toggleShowDialog() }} />
              <PrimaryButton className="btn-secondary-3" text="Update" onClick={() => { editProductSubmit() }} />
            </div>
          </div>
          :
          <div className="panel-footer">
            <div className="btn-container btn-end">
              <PrimaryButton className="btn-secondary-4" text="Cancel" onClick={() => { closePanel() }} />
              <PrimaryButton className="btn-secondary-2" text="Reject" onClick={() => { setRejectHideDialog(true) }} />
              <PrimaryButton className="btn-secondary-5" text="Approve" onClick={() => { setApproveBtn(addProductInputList) }} />
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
          _deleteFunction={""}
          productItem={addProductInputList}
          context={props.context}
        />
      </Dialog>


      {/* Reject Modal popup start region  */}
      <Dialog hidden={!rejectHideDialog} onDismiss={rejectHideDialogs} modalProps={rejectedModelProps}>
        <CommonAlertDailog
          alertBoxFor={"RejectModal"}
          closeDailogBox={() => { setIsPanel(false) }}
          rejectMsg={"Are you sure do u want to reject this product?"} //for reject only
          rejectSubmit={"*Required!"} //for reject only 
          message={"You have successfully rejected this request."}
          productItem={addProductInputList}
          _deleteFunction={""}
          toggleHideDialog={rejectHideDialogs}
          context={props.context}
        />
      </Dialog>
      {/*  */}


      {/* Approve Modal popup start region  */}
      <Dialog hidden={!approveDialog} onDismiss={approveDialogs} modalProps={successModalProps}>
        <CommonAlertDailog
          alertBoxFor={"approvedModal"}
          closeDailogBox={() => { setIsPanel(false) }}
          rejectMsg={""} //for reject only
          rejectSubmit={""} //for reject only 
          message={"You have successfully approved this request."}
          _deleteFunction={""}
          toggleHideDialog={approveDialogs}
          productItem={""}
          context={props.context}
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
    closePanel();
  }

  function rejectHideDialogs() {
    setRejectHideDialog(false);
    closePanel();
  }

  function approveDialogs() {
    setApproveDialog(true);

    setTimeout(() => {
      setApproveDialog(false);
      closePanel();
    }, 3000); // 3000 milliseconds = 3 seconds
  }

  // Remove Image handler
  function removeInputImage(fileName: any) {
    setFiles(files.filter((val: any) => ((val.name || val.Name) !== fileName)))
  }

  // TextField Input Handler
  function handleChangeProductInput(e: any) {
    const errorsCopy = errorList;
    if (errorsCopy[e.target.id] && errorsCopy[e.target.id].length > 0) {
      delete errorsCopy[e.target.id];
    }
    setErrorList(errorsCopy);
    setAddProductInputList({ ...addProductInputList, [e.target.id]: e.target.value });

  }

  // Dropdown Input Handler
  function handleChangeDropdown(ev: any, op: any, i: any) {
    const errorsCopy = errorList;
    if (errorsCopy[ev.target.id] && errorsCopy[ev.target.id].length > 0) {
      delete errorsCopy[ev.target.id];
    }

    if (op.key === "Other") {
      delete errorsCopy["CV_otherProductCategory"];
      delete addProductInputList["CV_otherProductCategory"];
    }
    setErrorList(errorsCopy);
    setAddProductInputList({ ...addProductInputList, [ev.target.id]: op.key });
  }

  // Richtext Input Handler
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

  // Fetch list columns from content types service
  async function _getListColumns(): Promise<any> {
    return new Promise((resolve, reject) => {
      commonServices._getListColumns(sp, "Classified Products")
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

  // Add products data in list service
  async function _addProductData(productData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      commonServices._addListItem(sp, "Classified Products", productData)
        .then((response: any) => {
          resolve(response);
        },
          (error: any): any => {
            reject(error);
            console.log(error);
            alert("Error while adding data");
            setShowLoader(false);
          });
    });
  }

  // Add Image and Product in List/Folder
  async function _AddImageInFolder(item: any, inputFiles: any): Promise<any> {
    let listId = "";
    let itemFolderName = `${item.Title} ${currentTime}`;

    await commonServices._getSiteListByName(props.context, "Classified Products").then(async (response) => {
      return await response.json();
    }).then(async (response) => {
      listId = response.d.Id;
      return await commonServices._createFolder(sp, "SiteAssets/Lists/" + listId + "/" + itemFolderName + "")
    }).then(async (response) => {
      return await commonServices._addMultipleImage(sp, "SiteAssets/Lists/" + listId + "/" + itemFolderName + "", inputFiles);
    }).then((response) => {
      let productData = { ...item, ["CV_imageUrl"]: "SiteAssets/Lists/" + listId + "/" + itemFolderName + "" };
      _addProductData(productData).then((ItemRes) => {
        closePanel();
      });
    })
  }

  // On submit product data handler
  function addProductSubmit() {
    let inputFiles = clone(files);
    let productData = { ...addProductInputList, ["CV_productDescription"]: richTextValue };
    let requiredFieldArr = ["Title", "CV_productCategory", "CV_productPrice", "CV_ContactNo", "CV_location", "CV_shortDescription"];

    inputFiles.splice(inputFiles.lastIndexOf(inputFiles.filter((ele: any) => Object.keys(ele).length == 0)[0]), 1);
    commonServices._checkRequiredValidation(addProductInputList, richTextValue, inputFiles, requiredFieldArr).then((response) => {

      if (Object.keys(response).length > 0) {
        setErrorList(response);
      }
      else {
        if (props.isAdmin) {
          productData["CV_productStatus"] = "Approve";
        }
        else {
          productData["CV_productStatus"] = "Requested";
        }
        setShowLoader(true);
        _AddImageInFolder(productData, inputFiles);
      }
    });
  }

  // Update products data in list service
  async function _updateProductData(productData: any, productId: any): Promise<any> {
    return new Promise((resolve, reject) => {
      commonServices._updateListItem(sp, "Classified Products", productData, productId)
        .then((response: any) => {
          resolve(response);
        },
          (error: any): any => {
            reject(error);
            console.log(error);
            alert("Error while updating data");
            setShowLoader(false);
          });
    });
  }

  // update & delete Image in Folder and update Product in List
  async function _updateImageInFolder(item: any, inputFiles: any) {
    let imageObjUpdate: any = [];
    let imageObjDelete: any = [];

    await commonServices._getImageFromFolder(sp, item.CV_imageUrl).then((imageResponse) => {

      imageObjDelete = imageResponse.filter((filterVal: any) =>
        !inputFiles.some((imageItem: any) => filterVal.Name === (imageItem.Name || imageItem.name))
      )

      imageObjUpdate = inputFiles.filter((filterVal: any) =>
        !imageResponse.some((imageItem: any) => (filterVal.Name || filterVal.name) === imageItem.Name)
      )

      // console.log(imageObjUpdate);
      // console.log(imageObjDelete);
      return imageResponse;
    }).then(async (response) => {
      return await commonServices._deleteMultipleImages(sp, item.CV_imageUrl, imageObjDelete);
    }).then(async (response) => {
      return await commonServices._addMultipleImage(sp, item.CV_imageUrl, imageObjUpdate);
    }).then((response) => {
      _updateProductData(item, item.Id).then((ItemRes) => {
        closePanel();
      });
    })
  }

  // On edit product data handler
  function editProductSubmit() {
    let inputFiles = clone(files);
    let productData = { ...addProductInputList, ["CV_productDescription"]: richTextValue };
    let requiredFieldArr = ["Title", "CV_productCategory", "CV_productPrice", "CV_ContactNo", "CV_location", "CV_productStatus", "CV_shortDescription"];

    inputFiles.splice(inputFiles.lastIndexOf(inputFiles.filter((ele: any) => Object.keys(ele).length == 0)[0]), 1);

    commonServices._checkRequiredValidation(addProductInputList, richTextValue, inputFiles, requiredFieldArr).then((response) => {

      if (Object.keys(response).length > 0) {
        setErrorList(response);
      }
      else {
        let updateData = {
          Id: productData.Id,
          Title: productData.Title,
          CV_productCategory: productData.CV_productCategory,
          CV_otherProductCategory: productData.CV_otherProductCategory,
          CV_productPrice: productData.CV_productPrice,
          CV_ContactNo: productData.CV_ContactNo,
          CV_location: productData.CV_location,
          CV_productStatus: "Requested",
          CV_shortDescription: productData.CV_shortDescription,
          CV_productDescription: productData.CV_productDescription,
          CV_imageUrl: productData.CV_imageUrl,
          CV_comment: "",
        }

        if (props.isAdmin) {
          updateData["CV_productStatus"] = productData.CV_productStatus;
        }
        else {

          let originalArr = clone(props.editData);
          let modifiedArr = clone(productData);

          delete originalArr["CV_productStatus"];
          delete modifiedArr["CV_productStatus"];

          if (JSON.stringify(originalArr) === JSON.stringify(modifiedArr) && JSON.stringify(inputFiles) === JSON.stringify(originalArr.Images)) {
            updateData["CV_productStatus"] = productData.CV_productStatus;
          }
          else {
            updateData["CV_productStatus"] = "Requested";
          }
        }
        // console.log(updateData);
        setShowLoader(true);
        _updateImageInFolder(updateData, inputFiles);
      }
    });
  }

  // Close Add-Edit Panel With Clear Data
  function closePanel() {
    props.callFetchSetData(); // call product components function for new data render
    setAddProductInputList({});
    setRichTextValue('');
    setFiles([]);
    setErrorList({});
    setShowLoader(false);
    props.onPanelChange(false); // close add/edit panel
  }

  // Approve Product data & change Status
  function setApproveBtn(item: any) {
    let productData = {
      CV_productStatus: "Approve"
    }
    _updateProductData(productData, item.Id).then((response) => {
      commonServices._getRoleDefinitionByName(sp, "EditItems").then((roleDefitions) => {
        let roleDefId = roleDefitions.Id;

        //break inheritance permission at item level
        commonServices._breakRollAssignmentsAtItemLevel(sp, "Classified Products", item.Id, true, true).then((breakRollAssignmentRes) => {
          //assign custom permission to item
          commonServices._roleAssignmentsAtItemLevel(sp, "Classified Products", item.Id, item.Author.ID, roleDefId).then((breakRollAssignmentRes) => {
            // Check site assets exit or not
            commonServices._ensureSiteAssetsLibraryexist(sp).then((response) => {
              //break inheritance permission at document library(site assets)
              commonServices._breakRollAssignmentsAtListLevel(sp, "Site Assets", true, true).then((breakRollAssignmentRes) => {
                //assign custom permission to document library(site assets)
                commonServices._roleAssignmentsAtListLevel(sp, "Site Assets", item.Author.ID, roleDefId).then((roleAssignmentRes) => {
                  approveDialogs();
                });
              });
            })
          })
        });
      });
    });
  }
}

export default AddEditProductPanelComponent;

import { DialogFooter, PrimaryButton, TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import { spfi, SPFx } from "@pnp/sp";
import commonServices from '../../services/commonServices';

interface ICommonAlertDailog {
  toggleHideDialog: any;
  rejectMsg: any;
  rejectSubmit: any;
  alertBoxFor: any;
  closeDailogBox: any;
  message: any;
  _deleteFunction: any;
  productItem: any;
  context: any;
}

const CommonAlertDailog: React.FunctionComponent<ICommonAlertDailog> = (props) => {
  const sp = spfi().using(SPFx(props.context));

  const [commentInput, setCommentInput]: any = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  const toggleHideDialog1 = () => {
    props.toggleHideDialog();
  };

  return (
    <>
      {props.alertBoxFor === "DeleteModal" ? (
        <div className="modal-custom-content">
          <div className="modal-header">
            <div className="circle-box bg-secondary-18">
              <img src={require("../../assets/images/svg/delete.svg")} alt="delete-icon" />
            </div>
          </div>
          <div className="modal-body">
            <h3>Are you sure?</h3>
            <p>You want to delete this product? This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <div className="btn-container btn-center">
              <PrimaryButton className="btn-green" text="Cancel" onClick={props.toggleHideDialog} />
              <PrimaryButton className="btn-red" text="Delete" onClick={deleteProduct} />
            </div>
          </DialogFooter>
        </div>
      ) : ""}

      {props.alertBoxFor === "RejectModal" ? (
        <div className="modal-custom-content rejectModal">
          <div className="modal-header">
            <div className="circle-box bg-secondary-18">
              <img src={require("../../assets/images/svg/Reject-icon.svg")} alt="reject-icon" />
            </div>
          </div>
          <div className="modal-body">
            {/* <h3>Are you sure?</h3> */}
            <p>{props.message}</p>
            <TextField multiline resizable={false} placeholder='Enter Reason' id="CV_comment" value={commentInput ? commentInput : ""} onChange={(e) => { handleChangeCommentInput(e) }} />
          </div>
          {errorMsg && <span className="requiredmsg">{errorMsg}</span>}
          <DialogFooter>
            <div className="btn-container btn-center">
              <PrimaryButton className="btn-green" text="Cancel" onClick={props.toggleHideDialog} />
              <PrimaryButton className="btn-red" text="Reject" onClick={() => { rejectProduct(commentInput) }} />
            </div>
          </DialogFooter>
        </div>
      ) : ""}

      {props.alertBoxFor === "approvedModal" ? (
        <div className="modal-custom-content ApproveModal">
          <div className="modal-header">
            <div className="circle-box bg-secondary-18">
              <img src={require("../../assets/images/svg/right-icon.svg")} alt="reject-icon" />
            </div>
          </div>
          <div className="modal-body">
            {/* <h3>Are you sure?</h3> */}
            <p>{props.message}</p>
          </div>
        </div>
      ) : ""}
    </>
  );

  // TextField Input Handler
  function handleChangeCommentInput(e: any) {
    if (e.target.value.length > 0 && errorMsg.length > 0) {
      setErrorMsg("")
    }
    setCommentInput(e.target.value);
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
          });
    });
  }

  // On click reject handler with assign permission & update status
  function rejectProduct(rejectReason: any) {
    if (rejectReason.length === 0) {
      setErrorMsg(props.rejectSubmit)
    }
    else {
      let productData = {
        CV_productStatus: "Reject",
        CV_comment: rejectReason
      }
      _updateProductData(productData, props.productItem.Id).then((response) => {
        commonServices._getRoleDefinitionByName(sp, "EditItems").then((roleDefitions) => {
          let roleDefId = roleDefitions.Id;

          //break inheritance permission at item level
          commonServices._breakRollAssignmentsAtItemLevel(sp, "Classified Products", props.productItem.Id, true, true).then((breakRollAssignmentRes) => {
            //assign custom permission to item
            commonServices._roleAssignmentsAtItemLevel(sp, "Classified Products", props.productItem.Id, props.productItem.Author.ID, roleDefId).then((breakRollAssignmentRes) => {
              // Check site assets exit or not
              commonServices._ensureSiteAssetsLibraryexist(sp).then((response) => {
                //break inheritance permission at document library(site assets)
                commonServices._breakRollAssignmentsAtListLevel(sp, "Site Assets", true, true).then((breakRollAssignmentRes) => {
                  //assign custom permission to document library(site assets)
                  commonServices._roleAssignmentsAtListLevel(sp, "Site Assets", props.productItem.Author.ID, roleDefId).then((roleAssignmentRes) => {
                    props.toggleHideDialog();
                  });
                });
              })
            })
          });
        });
      });
    }
  }

  // Delete products data from list service
  async function _deleteProductData(productId: any): Promise<any> {
    return new Promise((resolve, reject) => {
      commonServices._deleteListItem(sp, "Classified Products", productId)
        .then((response: any) => {
          resolve(response);
        },
          (error: any): any => {
            reject(error);
            console.log(error);
            alert("Error while deleting data");
          });
    });
  }

  // On Click Delete handler with Delete image folder
  async function deleteProduct() {
    await commonServices._deleteFolderByUrl(sp, props.productItem.CV_imageUrl).then((response) => {
      _deleteProductData(props.productItem.Id).then((ItemRes) => {
        props.toggleHideDialog();
      });
    })
  }
};

export default CommonAlertDailog;

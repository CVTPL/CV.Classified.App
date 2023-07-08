import { DialogFooter, PrimaryButton, TextField } from 'office-ui-fabric-react';
import * as React from 'react';

interface ICommonAlertDailog {
  toggleHideDialog: any;
  rejectMsg: any;
  rejectSubmit: any;
  alertBoxFor: any;
  closeDailogBox: any;
  message: any;
  _deleteFunction: any;
}

const CommonAlertDailog: React.FunctionComponent<ICommonAlertDailog> = (props) => {
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
              <PrimaryButton className="btn-red" text="Delete" onClick={props._deleteFunction} />
            </div>
          </DialogFooter>
        </div>
      ):""}

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
            <TextField multiline resizable={false} placeholder='Enter Reason' />
          </div>
          <DialogFooter>
            <div className="btn-container btn-center">
              <PrimaryButton className="btn-green" text="Cancel" onClick={props.toggleHideDialog} />
              <PrimaryButton className="btn-red" text="Reject" onClick={props._deleteFunction} />
            </div>
          </DialogFooter>
        </div>
      ):""}



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
      ):""}
    </>
  );
};

export default CommonAlertDailog;

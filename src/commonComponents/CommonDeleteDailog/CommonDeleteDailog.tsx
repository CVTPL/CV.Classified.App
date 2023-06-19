import { DialogFooter, PrimaryButton } from 'office-ui-fabric-react';
import * as React from 'react';

interface ICommonDeleteDailogProps {
    toggleHideDialog:any;
}

const CommonDeleteDailog: React.FunctionComponent<ICommonDeleteDailogProps> = (props) => {
  return (
    <>
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
              <PrimaryButton className="btn-green" text="Cancel" onClick={toggleHideDialog1}/>
              <PrimaryButton className="btn-red" text="Delete"/>
            </div>
          </DialogFooter>
        </div>
    
    </>
  ) ;

  function toggleHideDialog1(){
    props.toggleHideDialog
  }
};


export default CommonDeleteDailog;

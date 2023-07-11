import * as React from 'react';
import styles from './CvClassified.module.scss';
import { ICvClassifiedProps } from './ICvClassifiedProps';
import { escape } from '@microsoft/sp-lodash-subset';
import ProductComponents from '../../../commonComponents/productComponents/ProductComponents';
require('../../../assets/stylesheets/base/global.scss');
import { spfi, SPFx } from "@pnp/sp";
import commonServices from '../../../services/commonServices';
import * as alasql from 'alasql';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react';

export default class CvClassified extends React.Component<ICvClassifiedProps, any, {}> {

  constructor(props: ICvClassifiedProps) {
    super(props);
    this.state = {
      alasql: alasql,
      initializationStatus: false,
      loading: true
    };
  }

  public sp = spfi().using(SPFx(this.props.context));

  componentDidMount(): void {

    //check list is exist or not
    if (Object.keys(this.props.context).length > 0) {
      this.initializeFunction().then((response) => {
        this.setState({ initializationStatus: true, loading: false });
      });
    }
  }


  public render(): React.ReactElement<ICvClassifiedProps> {

    return (
      <>
        {this.state.initializationStatus ?
          <ProductComponents context={this.props.context} alasql={this.state.alasql} />
          : ""}

        {this.state.loading &&
          <Spinner label="Webpart initialization..." size={SpinnerSize.large} />
        }
      </>
    );
  }

  /**
   * initializeFunction
   */
  private initializeFunction = async () => {
    let siteUrl = this.props.context.pageContext.legacyPageContext.webAbsoluteUrl;

    commonServices._getSiteListByName(this.props.context, "Classified Products").then((response) => {
      if (response.status == 404) {//list is not available

        //list is not available than check site design available
        commonServices._getSiteDesign(this.sp).then((allSiteDesign) => {
          let checkSiteDesign = allSiteDesign.filter((ele: any) => ele.Title == "ClassifiedSiteDesign");

          if (checkSiteDesign.length > 0) {
            //site design is available so apply that site design to site.
            return commonServices._applySiteDesignToSite(this.sp, checkSiteDesign[0].Id, siteUrl).then((response)=>{
              return this.folderConfiguration();
            }).then((response)=>{
              return this.checkAndApplyCustomPermission();
            });
          }
          else {
            //site design is not available then check site script available
            return commonServices._getSiteScript(this.sp).then((allSiteScripts) => {
              let checkSiteScript = allSiteScripts.filter((ele: any) => ele.Title == "ClassifiedSiteScript");

              if (checkSiteScript.length > 0) {
                //site script is available so create site design and apply to site
                return commonServices._createSiteDesign(this.sp, checkSiteScript[0].Id).then((response) => {
                  return commonServices._applySiteDesignToSite(this.sp, response.Id, siteUrl);
                }).then((response)=>{
                  return this.folderConfiguration();
                });
              }
              else {
                // site script is not available so create site script and site design and apply to site
                commonServices._createSiteScript(this.props.context, this.sp).then((response) => {
                  return commonServices._createSiteDesign(this.sp, response.Id);
                }).then((response) => {
                  return commonServices._applySiteDesignToSite(this.sp, response.Id, siteUrl);
                }).then((response)=>{
                  return this.folderConfiguration();
                });
              }
            });
          }
        });
      }
      else {
        this.setState({ initializationStatus: true, loading: false });
        return;
      }
    });
  }

  /**
   * function for create custom permission and assign to list.
   */
  private checkAndApplyCustomPermission = async () => {
    commonServices._getAllRoleDefinitions(this.sp).then((allRoleDefitions) => {

      //check AddItems permission level exist or not
      let addItemCustomPermissionLevel = allRoleDefitions.filter((ele: any) => ele.Name === "AddItems");
      let editItemCustomPermissionLevel = allRoleDefitions.filter((ele: any) => ele.Name === "EditItems");
      let groupName = this.props.context.pageContext.web.title + " Visitors";
      let rolDefId: number;

      if (addItemCustomPermissionLevel.length === 0) {//AddItem permission level does not exist
        //create Add Items permission level for visitors group.
        commonServices._createNewPermissionLevel(this.sp, "AddItems", "Can add Only", 101, { High: 1, Low: 2 }).then((response) => {
          rolDefId = response.data.Id;
          //break list level inheritance permission
          return commonServices._breakRollAssignments(this.sp, "Classified Products", true, true);
        }).then((breakRollAssignmentRes) => {
          //get site group details for assign custom permission level.
          return commonServices._getSiteGroupByName(this.sp, groupName);
        }).then((visitorGroupRes) => {
          let principalId = visitorGroupRes.Id;
          //assign custom permission level AddItems to visitor group in list.
          return commonServices._roleAssignments(this.sp, "Classified Products", principalId, rolDefId);
        });
      }
      else { //AddItem permission exist
        rolDefId = addItemCustomPermissionLevel[0].Id;
        //break the inheritance permission at list level.
        commonServices._breakRollAssignments(this.sp, "Classified Products", true, true).then((breakInheritanceRes) => {
          //get site group details for assign custom permission level.
          return commonServices._getSiteGroupByName(this.sp, groupName);
        }).then((visitorGroupRes) => {
          let principalId = visitorGroupRes.Id;
          //assign custom permission level AddItems to visitor group in list.
          return commonServices._roleAssignments(this.sp, "Classified Products", principalId, rolDefId);
        });
      }

      if (editItemCustomPermissionLevel.length === 0) {//EditItem permission level does not exist
        //create EditItem permission level for visitors group.
        return commonServices._createNewPermissionLevel(this.sp, "EditItems", "Can Edit Only", 102, { High: 0, Low: 196613 });
      }
    });
  }

  /**
   * Function for check Site Assets folder is available or not if not then create it.
   */
  private folderConfiguration = async () => {
    let listId = "";
    commonServices._ensureSiteAssetsLibraryexist(this.sp).then((response) => {
      return commonServices._getFolderByPath(this.props.context, "SiteAssets/Lists")
    }).then((response) => {
      //check Lists folder in Site Assets already exists if no then create.
      if (response.status == 200) {
        return;
      }
      else {
        return commonServices._createFolder(this.sp, "SiteAssets/Lists");
      }
    }).then((response) => {
      return commonServices._getSiteListByName(this.props.context, "Classified Products");
    }).then(async (response) => {
      return await response.json();
    }).then((response) => {
      listId = response.d.Id;
      return commonServices._createFolder(this.sp, "SiteAssets/Lists/" + listId + "");
    });
  }
}


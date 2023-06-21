import * as React from 'react';
import styles from './CvClassified.module.scss';
import { ICvClassifiedProps } from './ICvClassifiedProps';
import { escape } from '@microsoft/sp-lodash-subset';
import ProductComponents from '../../../commonComponents/productComponents/ProductComponents';
require('../../../assets/stylesheets/base/global.scss');
// import { spfi, SPFx } from "@pnp/sp";
import commonServices from '../../../services/commonServices';

export default class CvClassified extends React.Component<ICvClassifiedProps, {}> {

  constructor(props: ICvClassifiedProps) {
    super(props);
  }

  public sp = spfi().using(SPFx(this.props.context));

  componentDidMount(): void {

    //check list is exist or not
    if (Object.keys(this.props.context).length > 0) {

      let siteUrl = this.props.context.pageContext.legacyPageContext.webAbsoluteUrl;

      commonServices._getSiteListByName(this.props.context, "Classified Products").then((response) => {
        if (response.status == 404) {//list is not available

          //list is not available than check site design available
          commonServices._getSiteDesign(this.sp).then((allSiteDesign) => {
            let checkSiteDesign = allSiteDesign.filter((ele: any) => ele.Title == "ClassifiedSiteDesign");

            if (checkSiteDesign.length > 0) {
              //site design is available so apply that site design to site.
              return commonServices._applySiteDesignToSite(this.sp, checkSiteDesign[0].Id, siteUrl).then((response) => {
                alert("Site design applied");
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
                  }).then((response) => {
                    alert("Site design applied");
                  });
                }
                else {
                  // site script is not available so create site script and site design and apply to site
                  commonServices._createSiteScript(this.props.context, this.sp).then((response) => {
                    return commonServices._createSiteDesign(this.sp, response.Id);
                  }).then((response) => {
                    return commonServices._applySiteDesignToSite(this.sp, response.Id, siteUrl);
                  }).then((response) => {
                    alert("Site design applied");
                  });
                }
              });
            }
          });
        }
        else {
          // alert("list already exit")
        }
      });
    }
  }
  public render(): React.ReactElement<ICvClassifiedProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;



    return (
     <>
     
    <ProductComponents />
     </>
    );
  }
}

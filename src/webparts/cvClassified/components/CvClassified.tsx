import * as React from 'react';
import styles from './CvClassified.module.scss';
import { ICvClassifiedProps } from './ICvClassifiedProps';
import { escape } from '@microsoft/sp-lodash-subset';
import ProductComponents from '../../../commonComponents/productComponents/ProductComponents';
import ProductDetailComponent from '../../../commonComponents/productDetailComponent/ProductDetailComponent';
import AddEditProductPanelComponent from '../../../commonComponents/addEditProductPanelComponent/addEditProductPanelComponent';
require('../../../assets/stylesheets/base/global.scss');

export default class CvClassified extends React.Component<ICvClassifiedProps, {}> {
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
    {/* <ProductDetailComponent /> */}
    {/* <AddEditProductPanelComponent /> */}
     </>
    );
  }
}

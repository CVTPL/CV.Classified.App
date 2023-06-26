import * as React from 'react';
import { useState } from 'react';
import { IProductComponentsProps } from './IProductComponentsProps';
import { ActionButton, ChoiceGroup, IChoiceGroupOption, IIconProps, Icon, PrimaryButton, SearchBox, Slider, TextField } from 'office-ui-fabric-react';
import { IStyleSet, Label, Pivot, PivotItem } from 'office-ui-fabric-react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react';
import ClassifiedCardComponent from '../classifiedCardComponent/ClassifiedCardComponent';
import BuyProducts from '../buyProducts/BuyProducts';
import SellProducts from '../sellProducts/SellProducts';
import { Route, BrowserRouter as Router, HashRouter, Link, NavLink, Switch } from 'react-router-dom';
import ProductDetailComponent from '../productDetailComponent/ProductDetailComponent';


const onRenderCaretDown = (): JSX.Element => {
  return <Icon iconName="List" />;
};

const ProductComponents: React.FunctionComponent<IProductComponentsProps> = (props) => {

  const sortOptions: IDropdownOption[] = [
    { key: 'Newest', text: 'Newest' },
    { key: 'Price Low to High', text: 'Price Low to High' },
    { key: 'Price High to Low', text: 'Price High to Low' },
  ];

  const filterIcon: IIconProps = { iconName: 'FilterSolid' };
  const [selectedView, setSelectedView] = React.useState("buy");

  const locationOptions: IDropdownOption[] = [
    { key: 'Ahmedabad', text: 'Ahmedabad' },
    { key: 'Surat', text: 'Surat' },
    { key: 'Goa', text: 'Goa' },
    { key: 'Varanasi', text: 'Varanasi' },
    { key: 'Bombay', text: 'Bombay' },
    { key: 'Kolkata', text: 'Kolkata' },
    { key: 'Cheenai', text: 'Cheenai' },
  ];


  const category: IDropdownOption[] = [
    { key: 'Laptop', text: 'Laptop' },
    { key: 'Mobile', text: 'Mobile' },
    { key: 'Ipad', text: 'Ipad' },
    { key: 'Iphone', text: 'Iphone' },
    { key: 'Headphones', text: 'Headphones' },
    { key: 'Smart Watch', text: 'Smart Watch' },
    { key: 'Alexa Echodot', text: 'Alexa Echodot' },
  ];

  const status: IDropdownOption[] = [
    { key: 'Active', text: 'Active' },
    { key: 'InActive', text: 'InActive' },
    { key: 'SoldOut', text: 'SoldOut' },
  ];

  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showBuySection, setShowBuySection] = useState(true);
  const [showSellSection, setShowSellSection] = useState(true);
  const [showChoiceGroup, setShowChoiceGroup] = useState(true);

  const handleLocationChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
    setSelectedLocation(option?.key as string);
  };

  const handleCategoryChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
    setSelectedCategory(option?.key as string);
  };

  const handleStatusChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
    setSelectedStatus(option?.key as string);
  };

  const handleFilterButtonClick = (): void => {
    setShowFilterOptions(!showFilterOptions);
  };

  const options: any[] = [
    {
      key: 'buyProducts',
      text: 'BUY'
    },
    {
      key: 'sellProducts',
      text: 'SELL'
    }
  ];

  React.useEffect(() => {
    // window.location.href = '#/buyProducts';
    console.log("Hello")
  }, []);

  return (
    <>
      <div className='mainClassifiedContainer'>
        <HashRouter>
          <div className='subClassified'>
            <div className="ms-Grid">
              <div className="ms-Grid-row">
                <div className='ms-Grid-col ms-sm12 ms-md12 ms-lg12'>
                  <div className='headerTitle'>
                    <div className='title'>
                      <h1>Classified</h1>
                    </div>
                    {showChoiceGroup ?
                      <ChoiceGroup defaultSelectedKey="buyProducts" className="switch-button-container" options={options} onChange={_onChangeChoiceGroup} />
                      : ""}
                  </div>
                </div>
              </div>
            </div>
            <Switch>
              {/* Buy Products Component */}
              <Route exact path="/buyProducts" component={() => (
                <>
                  <div className="ms-Grid">
                    <div className='ms-Grid-row'>
                      <div className='ms-Grid-col ms-sm12 ms-md12 ms-lg12'>
                        <div className='searchSection'>
                          <div className='searchContainer'>
                            <SearchBox
                              className=''
                              placeholder="Search"
                              onEscape={ev => {
                                console.log('Custom onEscape Called');
                              }}
                              onClear={ev => {
                                console.log('Custom onClear Called');
                              }}
                              onChange={(_, newValue) => console.log('SearchBox onChange fired: ' + newValue)}
                              onSearch={newValue => console.log('SearchBox onSearch fired: ' + newValue)}
                            />
                          </div>
                          <div className='filtersSortSection'>
                            <div className='sort-section'>
                              <div className='sortBy'>
                                <Dropdown
                                  placeholder="Sort by"
                                  options={sortOptions}
                                  onRenderCaretDown={onRenderCaretDown}
                                />
                              </div>
                            </div>

                            <div className='filterSection'>
                              <ActionButton iconProps={filterIcon} onClick={handleFilterButtonClick}>
                                Filter
                              </ActionButton>
                              {showFilterOptions && (
                                <>
                                  <div className='filter-dropDown'>

                                    <div className='filter-title'>
                                      <p>Filter</p>
                                    </div>

                                    <div className='filter-content'>
                                      <Dropdown
                                        label="Location"
                                        selectedKey="Ahmedabad"
                                        onChange={handleLocationChange}
                                        options={locationOptions}
                                      />

                                      <Dropdown
                                        label="Category"
                                        selectedKey="Mobile"
                                        onChange={handleCategoryChange}
                                        options={category}
                                      />

                                      <Dropdown
                                        label="Status"
                                        selectedKey="Active"
                                        onChange={handleStatusChange}
                                        options={status}
                                      />

                                      <div className='minMaxInput'>
                                        <Slider ranged label="Price Range" min={0} max={10} defaultValue={8} defaultLowerValue={2} className='sliderName' />
                                        <div className='inputPrice'>
                                          <div className="ms-Grid">
                                            <div className="ms-Grid-row">
                                              <div className='ms-Grid-col ms-sm12 ms-md12 ms-lg6'>
                                                <TextField
                                                  label="Min Price"
                                                  prefix="₹" />
                                              </div>
                                              <div className='ms-Grid-col ms-sm12 ms-md12 ms-lg6'>
                                                <TextField
                                                  label="Max Price"
                                                  prefix="₹"
                                                /></div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="btn-container btn-center">
                                        <PrimaryButton className="btn-secondary-4" text="Reset" />
                                        <PrimaryButton className="btn-secondary-3" text="Apply" />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ms-Grid">
                    <div className="ms-Grid-row">
                      <div className='ms-Grid-col ms-sm12 ms-md12 ms-lg12'>
                        <div className='contentPivot'>
                          <BuyProducts choiceGroupVisibility={setShowChoiceGroup}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )} />
              {/* Sell Products Component */}
              <Route path="/sellProducts" component={() => (
                <>
                  <div className="ms-Grid">
                    <div className="ms-Grid-row">
                      <div className='ms-Grid-col ms-sm12 ms-md12 ms-lg12'>
                        <div className='contentPivot sellProducts'>
                          <SellProducts />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )} />
              {/* Product Details Component */}
              <Route path="/buyProducts/productDetails" component={() => (
                <>
                  <ProductDetailComponent choiceGroupVisibility={setShowChoiceGroup}/>
                </>
              )} />
              {/* Default Route */}
              {/* <Route component={() => (
             
              )} /> */}
            </Switch>
          </div>
        </HashRouter>
      </div>
    </>
  );
  /**
   * Function for change products 
   * @param ev 
   * @param option 
   */
  function _onChangeChoiceGroup(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
    setSelectedView(option.key)
    window.location.href = '#/' + option.key;
  }
};

export default ProductComponents;

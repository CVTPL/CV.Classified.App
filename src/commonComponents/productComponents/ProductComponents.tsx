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
import { spfi, SPFx } from "@pnp/sp";
import { clone } from '@microsoft/sp-lodash-subset';
import commonServices from '../../services/commonServices';

const onRenderCaretDown = (): JSX.Element => {
  return <Icon iconName="List" />;
};

const ProductComponents: React.FunctionComponent<IProductComponentsProps> = (props) => {

  const sp = spfi().using(SPFx(props.context));

  const sortOptions: IDropdownOption[] = [
    { key: 'Newest', text: 'Newest' },
    { key: 'Price Low to High', text: 'Price Low to High' },
    { key: 'Price High to Low', text: 'Price High to Low' },
  ];

  const filterIcon: IIconProps = { iconName: 'FilterSolid' };

  const [selectedView, setSelectedView] = React.useState("buy");

  // const locationOption: IDropdownOption[] = [
  //   { key: 'Ahmedabad', text: 'Ahmedabad' },
  //   { key: 'Surat', text: 'Surat' },
  //   { key: 'Goa', text: 'Goa' },
  //   { key: 'Varanasi', text: 'Varanasi' },
  //   { key: 'Bombay', text: 'Bombay' },
  //   { key: 'Kolkata', text: 'Kolkata' },
  //   { key: 'Cheenai', text: 'Cheenai' },
  // ];


  // const category: IDropdownOption[] = [
  //   { key: 'Laptop', text: 'Laptop' },
  //   { key: 'Mobile', text: 'Mobile' },
  //   { key: 'Ipad', text: 'Ipad' },
  //   { key: 'Iphone', text: 'Iphone' },
  //   { key: 'Headphones', text: 'Headphones' },
  //   { key: 'Smart Watch', text: 'Smart Watch' },
  //   { key: 'Alexa Echodot', text: 'Alexa Echodot' },
  // ];

  // const status: IDropdownOption[] = [
  //   { key: 'Active', text: 'Active' },
  //   { key: 'InActive', text: 'InActive' },
  //   { key: 'SoldOut', text: 'SoldOut' },
  // ];

  // const [selectedLocation, setSelectedLocation] = useState('');
  // const [selectedCategory, setSelectedCategory] = useState('');
  // const [selectedStatus, setSelectedStatus] = useState('');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showBuySection, setShowBuySection] = useState(true);
  const [showSellSection, setShowSellSection] = useState(true);
  const [showChoiceGroup, setShowChoiceGroup] = useState(true);

  const [searchString, setSearchString] = React.useState("");
  const [productCardData, setProductCardData] = useState([]);
  const [productCardDataDuplicate, setProductCardDataDuplicate] = useState([]);
  const [createdByUserProductCardData, setcreatedByUserProductCardData] = useState([]);
  const [filterItem, setFilterItem]: any = React.useState({});
  const [productCategoryOptions, setProductCategoryOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [filterInputs, setFilterInputs] = React.useState<any>({});
  const [sliderValue, setSliderValue] = React.useState(0);
  const [sliderLowerValue, setSliderLowerValue] = React.useState(0);


  const handleSearchTextChange = (searchText: string) => {
    let filterItems = filterItem;
    filterItems["seachInput"] = searchText;

    setFilterItem(filterItems);
    setSearchString(searchText)
    getFilterData();

  }

  const handleSortOptionsChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
    let tempProductCardData = clone(productCardData);
    let sortedArray: any = [];

    if (option?.key === "Newest") {
      sortedArray = tempProductCardData.sort((a, b) => a.Created.split('/').reverse().join().localeCompare(b.Created.split('/').reverse().join())).reverse();
    }

    if (option?.key === "Price Low to High") {
      sortedArray = tempProductCardData.sort((a, b) => a.CV_productPrice > b.CV_productPrice ? 1 : -1);
    }

    if (option?.key === "Price High to Low") {
      sortedArray = tempProductCardData.sort((a, b) => a.CV_productPrice < b.CV_productPrice ? 1 : -1);
    }

    setProductCardData(sortedArray);
  }

  const handleChangeFilterDropdown = (ev: any, op: any, i: any) => {
    let filterItems = filterItem;
    filterItems[ev.target.id] = op.text;

    setFilterItem(filterItems);
    setFilterInputs({ ...filterInputs, [ev.target.id]: op.key });
  }


  const onChangeSliderValue = (_: unknown, range: [number, number]) => {
    setSliderLowerValue(range[0]);
    setSliderValue(range[1]);

    let filterItems = filterItem;
    filterItems["minprice"] = range[0];
    filterItems["maxprice"] = range[1];

    setFilterItem(filterItems);
  };

  const handleChangePriceFilterInput = (e: any) => {
    let filterItems = filterItem;

    if (e.target.id === "minPrice") {
      setSliderLowerValue(Number(e.target.value));
      filterItems["minprice"] = Number(e.target.value);
    }
    else {
      setSliderValue(Number(e.target.value));
      filterItems["maxprice"] = Number(e.target.value);
    }

    setFilterItem(filterItems);
  }

  const getFilterData = () => {
    let itemdata = filterItem;
    let copyProductCardData: any = clone(productCardDataDuplicate);

    if (Object.keys(itemdata).length > 0) {

      const searchText = itemdata.seachInput ? "Title like '%" + itemdata.seachInput + "%' or CV_productCategory like '%" + itemdata.seachInput + "%' or CV_otherProductCategory like '%" + itemdata.seachInput + "%' or CV_productPrice like '%" + itemdata.seachInput + "%' or CV_ContactNo like '%" + itemdata.seachInput + "%' or CV_location like '%" + itemdata.seachInput + "%'  or CV_shortDescription like '%" + itemdata.seachInput + "%' or Author->Title like '%" + itemdata.seachInput + "%'" : "Title != 'null'";

      const location = itemdata.Location ? "CV_location like '%" + itemdata.Location + "%'" : "CV_location != 'null'";
      const category = itemdata.Category ? "CV_productCategory like '%" + itemdata.Category + "%'" : "CV_productCategory != 'null'";
      const status = itemdata.Status ? "CV_productStatus like '%" + itemdata.Status + "%'" : "CV_productStatus != 'null'";
      // const priceRange = itemdata.maxprice ? "CV_productPrice >= " + itemdata.minprice + " AND CV_productPrice <= " + itemdata.maxprice + "" : "CV_productPrice != 'null'";
      const priceRange = itemdata.maxprice ? "CV_productPrice BETWEEN " + itemdata.minprice + " AND " + itemdata.maxprice + "" : "CV_productPrice != 'null'";

      var filteredData = props.alasql("select * from ? where (" + searchText + ") AND " + location + " AND " + category + "AND " + status + "AND " + priceRange + "", [copyProductCardData]);

      setProductCardData(filteredData);
    }
    else {
      setProductCardData(copyProductCardData);
    }
  }

  const clearFilter = () => {
    let filterItems = filterItem;
    delete filterItems["seachInput"];
    delete filterItems["Location"];
    delete filterItems["Category"];
    delete filterItems["Status"];
    delete filterItems["minprice"];
    delete filterItems["maxprice"];
    setSearchString("");
    setSliderLowerValue(0);
    setSliderValue(0);
    setFilterInputs({});
    setFilterItem({});/* Filter Items Data */
    getFilterData();/* Function of Filter */
  }



  // const handleLocationChange = (event: any, option?: IDropdownOption): void => {
  //   let filterItems = filterItem;
  //   setSelectedLocation(option?.key as string);
  //   // setDropdownSelectionInput({ ...dropdownSelectionInput, [ev.target.id]: op.key });

  //   filterItems[event.target.id] = option.text;

  //   setFilterItem(filterItems);
  //   // _getFilterData();

  // };

  // const handleCategoryChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
  //   setSelectedCategory(option?.key as string);
  // };

  // const handleStatusChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
  //   setSelectedStatus(option?.key as string);
  // };

  const handleFilterButtonClick = (): void => {
    setShowFilterOptions(!showFilterOptions);
  };

  const _getCurrentLoginUser = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      commonServices._getCurrentLoginUser(sp)
        .then((response: any) => {
          resolve(response);
        },
          (error: any): any => {
            reject(error);
            console.log(error);
            alert("Error while geting data");
          });
    });
  }

  const _getClassifiedAppsListData = (): Promise<any> => {

    let selectString = "*,Author/ID,Author/Title,Author/EMail,AttachmentFiles";
    let expandString = "AttachmentFiles,Author";

    return new Promise((resolve, reject) => {
      commonServices._getListItemWithExpand(sp, "Classified Products", selectString, expandString)
        .then((response: any) => {
          resolve(response);
        },
          (error: any): any => {
            reject(error);
            console.log(error);
            alert("Error while geting data");
          });
    });
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

  React.useEffect(() => {

    let tempLocationOptions: any = [];
    let tempProductCategoryOptions: any = [];
    let tempStatusOptions: any = [];

    _getCurrentLoginUser().then((LoginRes) => {
      // console.log(LoginRes);

      _getClassifiedAppsListData().then((ListRes) => {
        // console.log(ListRes);
        setProductCardData(ListRes);
        setProductCardDataDuplicate(ListRes);

        let tempCreatedByUserProductCardData = ListRes.filter((filterVal: any) => (filterVal.Author.EMail === LoginRes.Email));
        setcreatedByUserProductCardData(tempCreatedByUserProductCardData);

        ListRes.map((valChoice: any) => {
          tempLocationOptions.push({ key: valChoice.CV_location, text: valChoice.CV_location });
        });
        // console.log(tempStatusOptions);
        setLocationOptions(tempLocationOptions);

      });
    })

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
    // console.log("Hello")
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
                              id="seachInput"
                              value={searchString ? searchString : ""}
                              onEscape={ev => {
                                console.log('Custom onEscape Called');
                              }}
                              onClear={ev => { clearFilter() }}
                              // onChange={(_, newValue) => { handleSearchTextChange(newValue) }}
                              onSearch={newValue => handleSearchTextChange(newValue)}
                            />
                          </div>
                          <div className='filtersSortSection'>
                            <div className='sort-section'>
                              <div className='sortBy'>
                                <Dropdown
                                  placeholder="Sort by"
                                  options={sortOptions}
                                  onRenderCaretDown={onRenderCaretDown}
                                  onChange={handleSortOptionsChange}
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
                                        // selectedKey="Ahmedabad"
                                        placeholder="Location"
                                        id="Location"
                                        selectedKey={filterInputs.Location ? filterInputs.Location : ""}
                                        // onChange={handleLocationChange}
                                        onChange={(ev, op, i) => handleChangeFilterDropdown(ev, op, i)}
                                        options={locationOptions}
                                      />

                                      <Dropdown
                                        label="Category"
                                        // selectedKey="Mobile"
                                        placeholder="Category"
                                        id="Category"
                                        selectedKey={filterInputs.Category ? filterInputs.Category : ""}
                                        // onChange={handleCategoryChange}
                                        onChange={(ev, op, i) => handleChangeFilterDropdown(ev, op, i)}
                                        options={productCategoryOptions}
                                      />

                                      <Dropdown
                                        label="Status"
                                        // selectedKey="Active"
                                        placeholder="Status"
                                        id="Status"
                                        selectedKey={filterInputs.Status ? filterInputs.Status : ""}
                                        // onChange={handleStatusChange}
                                        onChange={(ev, op, i) => handleChangeFilterDropdown(ev, op, i)}
                                        options={statusOptions}
                                      />

                                      <div className='minMaxInput'>
                                        <Slider ranged label="Price Range" min={0} max={50000} className='sliderName' value={sliderValue} defaultValue={8} defaultLowerValue={2}
                                          lowerValue={sliderLowerValue}
                                          onChange={onChangeSliderValue} />
                                        <div className='inputPrice'>
                                          <div className="ms-Grid">
                                            <div className="ms-Grid-row">
                                              <div className='ms-Grid-col ms-sm12 ms-md12 ms-lg6'>
                                                <TextField
                                                  label="Min Price"
                                                  prefix="₹"
                                                  type="number"
                                                  id="minPrice"
                                                  value={String(sliderLowerValue)}
                                                  onChange={(e) => { handleChangePriceFilterInput(e) }} />
                                              </div>
                                              <div className='ms-Grid-col ms-sm12 ms-md12 ms-lg6'>
                                                <TextField
                                                  label="Max Price"
                                                  prefix="₹"
                                                  type="number"
                                                  id="maxPrice"
                                                  value={String(sliderValue)}
                                                  onChange={(e) => { handleChangePriceFilterInput(e) }}
                                                /></div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="btn-container btn-center">
                                        <PrimaryButton className="btn-secondary-4" text="Reset" onClick={() => clearFilter()} />
                                        <PrimaryButton className="btn-secondary-3" text="Apply" onClick={() => getFilterData()} />
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
                          {productCardData.length > 0 ?
                            <BuyProducts choiceGroupVisibility={setShowChoiceGroup} productCardData={productCardData} />
                            : 
                            <h1 className='noItemsDataMsg'>No items found</h1>}
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
                          <SellProducts context={props.context} productCardData={createdByUserProductCardData} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )} />
              {/* Product Details Component */}
              <Route path="/buyProducts/productDetails" component={() => (
                <>
                  <ProductDetailComponent choiceGroupVisibility={setShowChoiceGroup} />
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

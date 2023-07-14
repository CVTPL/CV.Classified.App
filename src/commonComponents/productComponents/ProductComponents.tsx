import * as React from 'react';
import { useState } from 'react';
import { IProductComponentsProps } from './IProductComponentsProps';
import { ActionButton, ChoiceGroup, IChoiceGroupOption, IIconProps, Icon, PrimaryButton, SearchBox, Slider, TextField } from 'office-ui-fabric-react';
import { IStyleSet, Label, Pivot, PivotItem } from 'office-ui-fabric-react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react';
// import ClassifiedCardComponent from '../classifiedCardComponent/ClassifiedCardComponent';
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

  // Sorting Options
  const sortOptions: IDropdownOption[] = [
    { key: 'Newest', text: 'Newest' },
    { key: 'Price Low to High', text: 'Price Low to High' },
    { key: 'Price High to Low', text: 'Price High to Low' },
  ];

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

  // Filter Status options
  const statusOptions: IDropdownOption[] = [
    { key: 'Active', text: 'Active' },
    { key: 'InActive', text: 'InActive' },
    { key: 'Sold', text: 'Sold' },
  ];

  const filterIcon: IIconProps = { iconName: 'FilterSolid' };
  const [selectedView, setSelectedView] = React.useState("buy");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showBuySection, setShowBuySection] = useState(true);
  const [showSellSection, setShowSellSection] = useState(true);
  const [showChoiceGroup, setShowChoiceGroup] = useState(true);

  const [sortOptionValue, setSortOptionValue]: any = useState("");
  const [searchString, setSearchString] = React.useState("");
  const [productCardData, setProductCardData] = useState([]);
  const [productCardDataDuplicate, setProductCardDataDuplicate] = useState([]);
  const [createdByUserProductCardData, setcreatedByUserProductCardData] = useState([]);
  const [requestedProductData, setRequestedProductData] = useState([]);
  const [filterItem, setFilterItem]: any = React.useState({});
  const [productCategoryOptions, setProductCategoryOptions] = useState([]);
  // const [statusOptions, setStatusOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [filterInputs, setFilterInputs] = React.useState<any>({});
  const [sliderMaxValue, setSliderMaxValue] = React.useState(0);
  const [sliderMinValue, setSliderMinValue] = React.useState(0);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    window.location.href = '#/buyProducts';
    fetchSetProductData();
  }, []);

  return (
    <>
      <div className='mainClassifiedContainer' onClick={(event) => { setShowFilterOptions(false) }}>
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
                                  selectedKey={sortOptionValue ? sortOptionValue : ""}
                                />
                              </div>
                            </div>

                            <div className='filterSection'>
                              <ActionButton iconProps={filterIcon} onClick={(event) => { handleFilterButtonClick(event) }}>
                                Filter
                              </ActionButton>
                              {showFilterOptions ?
                                <>
                                  <div className='filter-dropDown' onClick={(event) => { event.stopPropagation() }}>

                                    <div className='filter-title'>
                                      <p>Filter</p>
                                    </div>

                                    <div className='filter-content'>
                                      <Dropdown
                                        label="Location"
                                        // selectedKey="Ahmedabad"
                                        // placeholder="Location"
                                        id="Location"
                                        selectedKey={filterInputs.Location ? filterInputs.Location : "All"}
                                        // onChange={handleLocationChange}
                                        onChange={(ev, op, i) => handleChangeFilterDropdown(ev, op, i)}
                                        options={locationOptions}
                                      />

                                      <Dropdown
                                        label="Category"
                                        // selectedKey="Mobile"
                                        placeholder="Category"
                                        id="Category"
                                        selectedKey={filterInputs.Category ? filterInputs.Category : "All"}
                                        // onChange={handleCategoryChange}
                                        onChange={(ev, op, i) => handleChangeFilterDropdown(ev, op, i)}
                                        options={productCategoryOptions}
                                      />

                                      {/* <Dropdown
                                        label="Status"
                                        // selectedKey="Active"
                                        placeholder="Status"
                                        id="Status"
                                        selectedKey={filterInputs.Status ? filterInputs.Status : "All"}
                                        // onChange={handleStatusChange}
                                        onChange={(ev, op, i) => handleChangeFilterDropdown(ev, op, i)}
                                        options={statusOptions}
                                      /> */}

                                      <div className='minMaxInput'>
                                        <Slider ranged label="Price Range" min={0} max={50000} className='sliderName' value={sliderMaxValue} showValue
                                          lowerValue={sliderMinValue}
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
                                                  value={String(sliderMinValue)}
                                                  onChange={(e) => { handleChangePriceFilterInput(e) }} />
                                              </div>
                                              <div className='ms-Grid-col ms-sm12 ms-md12 ms-lg6'>
                                                <TextField
                                                  label="Max Price"
                                                  prefix="₹"
                                                  type="number"
                                                  id="maxPrice"
                                                  value={String(sliderMaxValue)}
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
                                : ""}
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
                            <div className='errMsg'>
                              <img src={require('../../assets/images/png/no-data-found.png')} className='noDataIcon' />
                            </div>
                          }
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
                          <SellProducts context={props.context} productCardData={createdByUserProductCardData} requestedProductCardData={requestedProductData} callFetchSetData={fetchSetProductData} isAdmin={isAdmin} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )} />
              {/* Product Details Component */}
              <Route path="/buyProducts/productDetails" component={() => (
                <>
                  <ProductDetailComponent choiceGroupVisibility={setShowChoiceGroup} context={props.context} />
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

  // Search Textfield Handler
  function handleSearchTextChange(searchText: string) {
    let filterItems = filterItem;
    filterItems["seachInput"] = searchText;

    setFilterItem(filterItems);
    setSearchString(searchText)
    getFilterData();
  }

  // Sort options handler
  function handleSortOptionsChange(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void {
    let tempProductCardData = clone(productCardData);
    let sortedArray: any = [];

    setSortOptionValue(option.key);

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

  // Filter Dropdown Handler
  function handleChangeFilterDropdown(ev: any, op: any, i: any) {
    let filterItems = filterItem;
    filterItems[ev.target.id] = op.text;

    setFilterItem(filterItems);
    setFilterInputs({ ...filterInputs, [ev.target.id]: op.key });
  }

  // Filter Slider Handler
  function onChangeSliderValue(_: unknown, range: [number, number]) {
    setSliderMinValue(range[0]);
    setSliderMaxValue(range[1]);

    let filterItems = filterItem;
    filterItems["minprice"] = range[0];
    filterItems["maxprice"] = range[1];

    setFilterItem(filterItems);
  };

  // Filter Price Textfield Handler
  function handleChangePriceFilterInput(e: any) {
    let filterItems = filterItem;

    if (e.target.id === "minPrice") {
      setSliderMinValue(Number(e.target.value));
      filterItems["minprice"] = Number(e.target.value);
    }
    else {
      setSliderMaxValue(Number(e.target.value));
      filterItems["maxprice"] = Number(e.target.value);
    }

    setFilterItem(filterItems);
  }

  // Get and Set Filter Data
  function getFilterData() {
    let itemdata = filterItem;
    let copyProductCardData: any = clone(productCardDataDuplicate);

    if (Object.keys(itemdata).length > 0) {

      const searchText = itemdata.seachInput ? "Title like '%" + itemdata.seachInput + "%' or CV_productCategory like '%" + itemdata.seachInput + "%' or CV_otherProductCategory like '%" + itemdata.seachInput + "%' or CV_productStatus like '%" + itemdata.seachInput + "%' or CV_productPrice like '%" + itemdata.seachInput + "%' or CV_ContactNo like '%" + itemdata.seachInput + "%' or CV_location like '%" + itemdata.seachInput + "%'  or CV_shortDescription like '%" + itemdata.seachInput + "%' or Author->Title like '%" + itemdata.seachInput + "%'" : "Title != 'null'";

      const location = itemdata.Location !== "All" && itemdata.Location !== undefined ? "CV_location like '%" + itemdata.Location + "%'" : "CV_location != 'null'";
      const category = itemdata.Category !== "All" && itemdata.Category !== undefined ? "CV_productCategory like '%" + itemdata.Category + "%'" : "CV_productCategory != 'null'";
      const status = itemdata.Status !== "All" && itemdata.Status !== undefined ? "CV_productStatus like '%" + itemdata.Status + "%'" : "CV_productStatus != 'null'";
      // const priceRange = itemdata.maxprice ? "CV_productPrice >= " + itemdata.minprice + " AND CV_productPrice <= " + itemdata.maxprice + "" : "CV_productPrice != 'null'";
      const priceRange = itemdata.maxprice ? "CV_productPrice BETWEEN " + itemdata.minprice + " AND " + itemdata.maxprice + "" : "CV_productPrice != 'null'";

      var filteredData = props.alasql("select * from ? where (" + searchText + ") AND " + location + " AND " + category + "AND " + status + "AND " + priceRange + "", [copyProductCardData]);

      setProductCardData(filteredData);
    }
    else {
      setProductCardData(copyProductCardData);
    }
  }

  // Clear Filter Data
  function clearFilter() {
    let filterItems = filterItem;
    delete filterItems["seachInput"];
    delete filterItems["Location"];
    delete filterItems["Category"];
    delete filterItems["Status"];
    delete filterItems["minprice"];
    delete filterItems["maxprice"];
    setSortOptionValue("");
    setSearchString("");
    setSliderMinValue(0);
    setSliderMaxValue(0);
    setFilterInputs({});
    setFilterItem({});/* Filter Items Data */
    getFilterData();/* Function of Filter */
  }

  function handleFilterButtonClick(event: any): void {
    event.stopPropagation();
    setShowFilterOptions(!showFilterOptions);
  };

  // Fetch current login user Service
  async function _getCurrentLoginUser(): Promise<any> {
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

  // Fetch admin users list Service
  async function _getAdminUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      commonServices._getOwnerSiteGroupUsers(sp)
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

  // Fetch list data using select & expand service
  async function _getClassifiedAppsListData(): Promise<any> {

    // let selectString = "*,Author/ID,Author/Title,Author/EMail,AttachmentFiles";
    // let expandString = "AttachmentFiles,Author";

    let selectString = "*,Author/ID,Author/Title,Author/EMail";
    let expandString = "Author";

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

  // Fetch list column from list service
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

  // Buy & Sell Product Render Data
  function fetchSetProductData() {
    let tempLocationOptions: any = [{ key: "All", text: "All" }];
    let tempProductCategoryOptions: any = [{ key: "All", text: "All" }];
    let tempStatusOptions: any = [{ key: "All", text: "All" }];
    let tempSellProductCardData: any = [];

    _getCurrentLoginUser().then((LoginRes) => {
      // console.log(LoginRes);

      _getAdminUser().then((adminRes: any) => {
        adminRes.forEach((adminEle: any) => {
          if (LoginRes.Email === adminEle.Email) {
            setIsAdmin(true);
          }
        });
      });

      _getClassifiedAppsListData().then(async (ListRes) => {
        if (ListRes.length > 0) {
          let count = 0;
          do {
            await commonServices._getImageFromFolder(sp, ListRes[count].CV_imageUrl).then((response) => {
              ListRes[count]["Images"] = response;
            })
            count = count + 1;
          } while (count < ListRes.length);
        }
        return ListRes;
      }).then((response) => {
        response.map((valChoice: any) => {
          if (!tempLocationOptions.some((location: any) => location.text === valChoice.CV_location)) {
            tempLocationOptions.push({ key: valChoice.CV_location, text: valChoice.CV_location }); // location Options
          }
        });
        // console.log(tempStatusOptions);
        setLocationOptions(tempLocationOptions);

        let tempBuyProductData = response.filter((resVal: any) => (resVal.CV_productStatus === "Active" || resVal.CV_productStatus === "Sold"));
        setProductCardData(tempBuyProductData); // buy product data
        setProductCardDataDuplicate(tempBuyProductData); // for filtering buy product data

        tempSellProductCardData = response.filter((filterVal: any) => (filterVal.Author.EMail === LoginRes.Email));
        setcreatedByUserProductCardData(tempSellProductCardData); // sell product data

        let tempRequestedProductData = response.filter((filterVal: any) => (filterVal.CV_productStatus === "Requested"));
        setRequestedProductData(tempRequestedProductData); // Requested product data
      });
    })

    _getListColumns().then((response) => {
      // console.log(response);

      let filterProductCategoryOptions: any = response.filter((filterRes: any) => (filterRes.InternalName === "CV_productCategory")); // Category Options
      filterProductCategoryOptions[0].Choices.map((valChoice: any) => {
        tempProductCategoryOptions.push({ key: valChoice, text: valChoice });
      });
      // console.log(tempProductCategoryOptions);
      tempProductCategoryOptions.push({ key: "Other", text: "Other" });
      setProductCategoryOptions(tempProductCategoryOptions);

      // let filterStatusOptions: any = response.filter((filterRes: any) => (filterRes.InternalName === "CV_productStatus")); // Status Options
      // filterStatusOptions[0].Choices.map((valChoice: any) => {
      //   tempStatusOptions.push({ key: valChoice, text: valChoice });
      // });
      // // console.log(tempStatusOptions);
      // setStatusOptions(tempStatusOptions);
    })
  }
};

export default ProductComponents;

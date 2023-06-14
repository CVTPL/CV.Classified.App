import * as React from 'react';
import { useState } from 'react';
import { IProductComponentsProps } from './IProductComponentsProps';
import { ActionButton, IIconProps, Icon, PrimaryButton, SearchBox } from 'office-ui-fabric-react';
import { IStyleSet, Label, Pivot, PivotItem } from 'office-ui-fabric-react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react';
import ClassifiedCardComponent from '../classifiedCardComponent/ClassifiedCardComponent';



const onRenderCaretDown = (): JSX.Element => {
  return <Icon iconName="List" />;
};

const ProductComponents: React.FunctionComponent<IProductComponentsProps>  = (props) => {
  
const sortOptions: IDropdownOption[] = [
  { key: 'Newest', text: 'Newest' },
  { key: 'Price Low to High', text: 'Price Low to High' },
  { key: 'Price High to Low', text: 'Price High to Low' },
];

const filterIcon: IIconProps = { iconName: 'FilterSolid' };

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






  return(
    <>
    <div className='mainClassifiedContainer'>
      <div className='subClassified'>
      <div className="ms-Grid">
      <div className="ms-Grid-row">
        <div className='ms-Grid-col ms-sm12 ms-md12 ms-lg12'>
          <div className='title'>
          <h1>Classified</h1>
        </div>
          </div>
          </div>
          </div>
      <div className="ms-Grid">
      <div className="ms-Grid-row">
        <div className='ms-Grid-col ms-sm12 ms-md12 ms-lg12'>
        
        <Pivot aria-label="pivot"  className='pivotSection'>
      <PivotItem
        headerText="BUY"
        headerButtonProps={{
          'data-order': 1,
          'data-title': 'My Files Title',
        }}
      >
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
        <div className='filter-dropDown'>
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
        </div>
      )}

    </div>
    </div>

         </div>

        <div className='contentPivot'>
      < ClassifiedCardComponent />
        </div>
      </PivotItem>



      <div className="ms-Grid">
      <div className="ms-Grid-row">
        <div className='ms-Grid-col ms-sm12 ms-md12 ms-lg12'>
          <div className='title'>
          <h1>Classified</h1>
        </div>
          </div>
          </div>
          </div>
      <PivotItem className='contentPivot' headerText="SELL">
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
        <div className='filter-dropDown'>
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
        </div>
      )}

    </div>
    </div>
         </div>  
         <div className='contentPivot'>
      < ClassifiedCardComponent />
        </div>
      
      </PivotItem>
        </Pivot>
        </div>
      </div>
      </div>
     
      </div>
    </div>
    </>
  ) ;
};

export default ProductComponents;

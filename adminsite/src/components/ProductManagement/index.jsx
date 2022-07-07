import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import {getProductRequest, addProductRequest} from './services/request'
import {handleApi} from '../../handleApi'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './index.css';

function ProductManagement() {
  let emptyProduct = {
    id: 0,
    name: '',
    imagepath: null,
    description: '',
    categories: null,
    price: 0,
    stock: 0,
    created: '',
    updated: ''
  };
  const [products, setProducts] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  
  const toast = useRef(null);
  const [product, setProduct] = useState(emptyProduct);
  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    const fetchDataAsync = async() => {
      let result = await handleApi(getProductRequest());
      setProducts(result.data)
    }

    fetchDataAsync()
  }, [])

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  }
  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  }

  const addProductAsync = async (payload) => {
    await handleApi(addProductRequest(payload));
  }

  const saveProduct = () => {
    let _products = [...products];
    let _product = {...product};
    
    _product.image = 'product-placeholder.svg';
    _products.push(_product);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    addProductAsync(_product);
    setProducts(_products);
    setProductDialog(false);
    setProduct(emptyProduct);
  }

  

  //templates
  const header = (
    <div className="table-header">
        <h5 className="mx-0 my-1">Manage Products</h5>
          <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
          </span>
    </div>
  );

  const productDialogFooter = (
    <React.Fragment>
        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
    </React.Fragment>
  );

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button label="Add" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
      </React.Fragment>
    )
  }

  //methods
  


  const onCategoryChange = e => {
    let _product = {...product}
    _product.categories = e.value;
    setProduct(_product);
  }

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = {...product};
    _product[`${name}`] = val;

    setProduct(_product);
  }

  const onInputNumberChange = (e, name) => {
    const val = (e.target && e.target.value) || 0;
    let _product = {...product};
    _product[`${name}`] = val;

    setProduct(_product);
  }

  const imageBodyTemplate = (rowData) => {
    return <img src={`${rowData.imagePath}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />;
  }
  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'VND' });
  }

  const flagStock = stock => {
    return stock <= 60 ? "LOWSTOCK" : "INSTOCK";
  }

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  } 
  
  const statusBodyTemplate = (rowData) => {
    return <span className={`product-badge status-${flagStock(rowData.stock)}`}>{flagStock(rowData.stock)}</span>;
  }

  
  return (
    <div className="datatable-crud-demo">
        <Toast ref={toast} />
        <div className="card">
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
          <DataTable value={products} header={header} responsiveLayout="scroll">
            <Column field="name" header="Name"></Column>
            <Column header="Image" body={imageBodyTemplate}></Column>
            <Column field="price" header="Price" body={priceBodyTemplate}></Column>
            <Column field="categories" header="Category"></Column>
           
            <Column header="Status" body={statusBodyTemplate}></Column>
          </DataTable>
        </div>


      <Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
               {product.image && <img src={`images/product/${product.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image block m-auto pb-3" />}
                 <div className="field">
                     <label htmlFor="name">Name</label>
                     <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                     {submitted && !product.name && <small className="p-error">Name is required.</small>}
                 </div>
                 <div className="field">
                     <label htmlFor="description">Description</label>
                     <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                 </div>

                 <div className="field">
                     <label className="mb-3">Category</label>
                     <div className="formgrid grid">
                         <div className="field-radiobutton col-6">
                             <RadioButton inputId="category1" name="category" value="Refresher" onChange={onCategoryChange} checked={product.category === 'Refresher'} />
                             <label htmlFor="category1">Refresher</label>
                         </div>
                         <div className="field-radiobutton col-6">
                             <RadioButton inputId="category2" name="category" value="Milk Tea" onChange={onCategoryChange} checked={product.category === 'Milk Tea'} />
                             <label htmlFor="category2">Milk Tea</label>
                         </div>
                         <div className="field-radiobutton col-6">
                             <RadioButton inputId="category3" name="category" value="Fruit Tea" onChange={onCategoryChange} checked={product.category === 'Fruit Tea'} />
                             <label htmlFor="category3">Fruit Tea</label>
                         </div>
                         <div className="field-radiobutton col-6">
                             <RadioButton inputId="category4" name="category" value="Fruit Tea" onChange={onCategoryChange} checked={product.category === 'Wellness Tea'} />
                             <label htmlFor="category4">Fruit Tea</label>
                         </div>
                         <div className="field-radiobutton col-6">
                             <RadioButton inputId="category5" name="category" value="Cake" onChange={onCategoryChange} checked={product.category === 'Cake'} />
                            <label htmlFor="category5">Cake</label>
                        </div>
                         <div className="field-radiobutton col-6">
                             <RadioButton inputId="category6" name="category" value="Coffee" onChange={onCategoryChange} checked={product.category === 'Coffee'} />
                             <label htmlFor="category5">Coffee</label>
                         </div>
                     </div>
                </div>

                 <div className="formgrid grid">
                     <div className="field col">
                         <label htmlFor="price">Price</label>
                         <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="VND" locale="en-US" />
                     </div>
                     <div className="field col">
                         <label htmlFor="stock">Stock</label>
                         <InputNumber id="stock" value={product.stock} onValueChange={(e) => onInputNumberChange(e, 'stock')} integeronly="true" />
                     </div>
                 </div>
             </Dialog>
      </div>
  )
}


export default ProductManagement;

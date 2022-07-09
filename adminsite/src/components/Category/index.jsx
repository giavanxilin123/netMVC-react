import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import {getProductRequest, addProductRequest, updateProductRequest, deleteProductRequest} from './services/request'
import {handleApi} from '../../handleApi'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './index.css';

function Category() {
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
  const [category, setCategory] = useState([])
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    const fetchDataAsync = async() => {
      let result = await handleApi(getProductRequest());
      setProducts(result.data)
      let uniqueCate = [... new Set(result.data.map(x => x.categories))]
      setCategory(uniqueCate)
      console.log(uniqueCate)
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

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  }

  const addProductAsync = async (payload) => {
    await handleApi(addProductRequest(payload));
  }

  const saveProduct = () => {
    //clone 
    let _products = [...products];
    let _product = {...product};

    if (product.id) {
      //update view
      const index = _products.findIndex(p => p.id === product.id) 
      _products[index] = _product;
      let date = new Date();
      _product.updated = date;
      toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      //call axios
      (async(p) => {
        await handleApi(updateProductRequest(p))
      })(_product)
    }
    else {
      //update view
      _product.imagePath = 'product-placeholder.svg';
      _products.push(_product);
      let date = new Date();
      [_product.created, _product.updated] = new Array(2).fill(date)
      toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      //call axios
      addProductAsync(_product);
    }
    
    setProducts(_products);
    setProductDialog(false);
    setProduct(emptyProduct);
  }

  const editProduct = (product) => {
    setProduct({...product});
    setProductDialog(true);
  }

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  }

  const deleteProduct = () => {
    let _products = products.filter(val => val.id !== product.id);
    let id = product.id;
    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });

    (async(id) => {
      await handleApi(deleteProductRequest(id))
    })(id)
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

  const actionBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
            <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
        </React.Fragment>
    );
  }

  const deleteProductDialogFooter = (
    <React.Fragment>
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
    </React.Fragment>
  );

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.id /3} readOnly cancel={false} />;
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

  const createdBodyTemplate = (rowData) => {
    return new Date(rowData.created).toLocaleString();
  } 

  const updatedBodyTemplate = (rowData) => {
    return new Date(rowData.updated).toLocaleString();
  } 
  
  const statusBodyTemplate = (rowData) => {
    return <span className={`product-badge status-${flagStock(rowData.stock).toLowerCase()}`}>{flagStock(rowData.stock)}</span>;
  }

  
  return (
    <div className="datatable-crud-demo">
        <Toast ref={toast} />
        <div className="card">
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
          <DataTable globalFilter={globalFilter} value={products} header={header} responsiveLayout="scroll">
            <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
            <Column header="Image" body={imageBodyTemplate}></Column>
            <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
            <Column field="categories" header="Category" sortable style={{ minWidth: '10rem' }}></Column>
            {/* <Column field="id" header="Rating" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
            <Column field="created" header="Created" body={createdBodyTemplate}></Column>
            <Column field="created" header="Updated" body={updatedBodyTemplate}></Column>
            <Column header="Status" body={statusBodyTemplate}></Column>
            <Column header="Action" body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
          </DataTable>
        </div>


      <Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
               {product.imagePath && <img src={`${product.imagePath}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image block m-auto pb-3" />}
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
                             <RadioButton inputId="category4" name="category" value="Wellness Tea" onChange={onCategoryChange} checked={product.category === 'Wellness Tea'} />
                             <label htmlFor="category4">Wellness Tea</label>
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
        <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
            <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                {product && <span>Are you sure you want to delete <b>{product.name}</b>?</span>}
            </div>
          </Dialog>
      </div>
  )
}


export default Category;

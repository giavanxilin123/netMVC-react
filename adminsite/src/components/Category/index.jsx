import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import {getProductRequest, addCategoryRequest, deleteProductRequest, getCategoryRequest} from './services/request'
import {handleApi} from '../../handleApi'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './index.css';

function CategoryManagement() {
  let emptyProduct = {
    id: 0,
    name: '',
    imagePath: null,
    description: '',
    category: {
      id: 0,
      name: ''
    },
    price: 0,
    stock: 0,
    created: '',
    updated: ''
  };

  let emptyCategory = {
    id : 0,
    name: ''
  }

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(emptyCategory)
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    const fetchDataAsync = async() => {
      let result = await handleApi(getProductRequest());
      setProducts(result.data)
    }

    const fetchCategoryAsync = async() => {
      let result = await handleApi(getCategoryRequest());
      setCategories(result.data)
    }

    fetchDataAsync();
    fetchCategoryAsync();
  }, [])

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setCategoryDialog(true);
  }
  const hideDialog = () => {
    setSubmitted(false);
    setCategoryDialog(false);
  }

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  }

  const saveCategory = () => {
    setSubmitted(true);
    let _category = {...category};
    let _categories = [...categories]
    console.log(_categories)
    let date = new Date();
    [_category.created, _category.updated] = new Array(2).fill(date)
      
    const addCategoryAsync = async (payload) => {
      let result = await handleApi(addCategoryRequest(payload));
      setCategory(result.data)
      _categories.push(result.data);
    }

    addCategoryAsync(_category);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Category Created', life: 3000 });
    
    setCategories(_categories);
    setCategoryDialog(false);
    setCategory(emptyCategory);
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
        <h5 className="mx-0 my-1">Manage Category</h5>
          <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
          </span>
    </div>
  );

  const categoryDialogFooter = (
    <React.Fragment>
        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveCategory} />
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


  //methods

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    console.log(val)
    let _category = {...category};
    _category[`${name}`] = val;
    setCategory(_category);
  }

  const createdBodyTemplate = (rowData) => {
    return new Date(rowData.created).toLocaleString();
  } 

  const updatedBodyTemplate = (rowData) => {
    return new Date(rowData.updated).toLocaleString();
  } 
  
  return (
    <div className="datatable-crud-demo">
        <Toast ref={toast} />
        <div className="card">
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
          <DataTable globalFilter={globalFilter} value={categories} header={header} responsiveLayout="scroll">
            <Column field="id" header="Id" style={{ minWidth: '16rem' }}></Column>
            <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
            <Column field="created" header="Created" body={createdBodyTemplate}></Column>
            <Column field="created" header="Updated" body={updatedBodyTemplate}></Column>
            <Column header="Action" body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
          </DataTable>
        </div>

      <Dialog visible={categoryDialog} style={{ width: '450px' }} header="Add Category" modal className="p-fluid" footer={categoryDialogFooter} onHide={hideDialog}>
              <div className="field">
              <label htmlFor="title">Title</label>
                  <InputText id="name" value ={category.name}  onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !category.name })} />
                  {submitted && !category.name && <small className="p-error">Name is required.</small>}
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


export default CategoryManagement;

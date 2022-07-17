import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import {getProductRequest, addProductRequest, updateProductRequest, deleteProductRequest, getCategoryRequest} from './services/request'
import {handleApi} from '../../handleApi'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useFormik } from 'formik';
import './index.css';

function ProductManagement() {
  let emptyProduct = {
    id: 0,
    name: '',
    imagePath: 'product-placeholder.svg',
    description: '',
    category: {
      id: 0,
      name: ''
    },
    price: 0,
    stock: 0,
    created: '',
    updated: '',
  };

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([])
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const toast = useRef(null);

  const formik = useFormik({
    initialValues: {
      name:  '',
      description: '',
      price: 0,
      category: ''
    },
    validate: (data) => {
      let errors = {}

      if (data.name.length <= 3){
        errors.name = "The name of product is more than 3 characters."
      }

      if (!data.description) {
        errors.description = 'Description is required.'
      }

      if (+data.price <= 0) {
        errors.price = 'Price must be larger than 0.'
      }
      
      if (!data.category) {
        errors.category = "You must choose category of product."
      }

      return errors
    },
    onSubmit: () => {
      let _product = {...product}
      let _products = [...products]
      
      if (product.id === 0){
        let date = new Date();
        [_product.created, _product.updated] = new Array(2).fill(date)

        const addProductAsync = async (payload) => {
          let result = await handleApi(addProductRequest(payload));
          console.log("result", result)
          // dùng setProduct _product là m đi chắc tại _product đang chơi thằng id = 0
          setProduct(result.data)
          _products.push(result.data);
        }
        addProductAsync(_product);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      } else {
        const index = _products.findIndex(p => p.id === product.id) 
        _products[index] = _product;

        let date = new Date();
        _product.updated = date;
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      
        _product.categoryId = _product.category.id;
        (async(p) => {
          await handleApi(updateProductRequest(p))
        })(_product)
      }
      
      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
      
      formik.resetForm()
    }
  })

  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
      return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  useEffect(() => {
    const fetchDataAsync = async() => {
      let result = await handleApi(getProductRequest());
      setProducts(result.data)
    }

    const fetchCategoryAsync = async() => {
      let result = await handleApi(getCategoryRequest());
      setCategory(result.data)
    }

    fetchDataAsync();
    fetchCategoryAsync();
  }, [])

  const openNew = () => {
    formik.values.name = ''
    formik.values.description = ''
    formik.values.price = 0
    formik.values.category = ''
    setProduct(emptyProduct);
    setProductDialog(true);
  }

  const hideDialog = () => {
    setProductDialog(false);
  }

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  }

  const editProduct = (product) => {
    formik.values.name = product.name;
    formik.values.description = product.description;
    formik.values.price = product.price
    formik.values.category = product.category.name
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

  const header = (
    <div className="table-header">
        <h5 className="mx-0 my-1">Manage Products</h5>
          <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
          </span>
    </div>
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


  //methods
  const onCategoryChange = e => {
    let _product = {...product}
    _product.category.id = e.value.id;
    _product.category.name = e.value.name;
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


  const uploadImage = async (event) => {
    const file = event.files[0];
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then(r => r.blob()); 
    reader.readAsDataURL(blob); 
    reader.onloadend = function () {
        const base64data = reader.result;
        let _product = {...product};
        _product.imagePath = base64data;
        setProduct(_product);
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode'});
    }
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
            <Column field="category.name" header="Category" sortable style={{ minWidth: '10rem' }}></Column>
            <Column field="created" header="Created" body={createdBodyTemplate}></Column>
            <Column field="created" header="Updated" body={updatedBodyTemplate}></Column>
            <Column header="Status" body={statusBodyTemplate}></Column>
            <Column header="Action" body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
          </DataTable>
          
        </div>

      <Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" onHide={hideDialog}>
            <form onSubmit={formik.handleSubmit} className ="p-fluid">
              <div className="field">
                    <div>Upload Image</div>
                    <FileUpload mode="basic" name="demo[]"  accept="image/*" customUpload auto uploadHandler={uploadImage} />
                    {product.imagePath && <img src={`${product.imagePath}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image block m-auto pb-3" />}
              </div>

              <div className="field">
                  <label htmlFor="name">Name</label>
                  <InputText id="name" name ="name" value={formik.values.name} onChange={(e) => {formik.handleChange(e); onInputChange(e, 'name'); }}  autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                  {getFormErrorMessage('name')}
              </div>
              <div className="field">
                  <label htmlFor="description">Description</label>
                  <InputTextarea id="description" name="description" value={formik.values.description} onChange={(e) => {onInputChange(e, 'description'); formik.handleChange(e)}}  rows={3} cols={20} />
                  {getFormErrorMessage('description')}
              </div>
              <div className="field">
                     <label className="mb-3">Category</label>
                     <div className="formgrid grid">
                     {category.map((c, index) => (
                        <div key={index} className="field-radiobutton col-6">
                            <RadioButton inputId={`category${index}`} name="category" value={c} onChange={(e) => {onCategoryChange(e); formik.handleChange(e)}} checked={product.category.name === c.name} />
                            <label htmlFor="category1">{c.name}</label>
                        </div>
                      ))}
                      {getFormErrorMessage('category')}
                     </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                      <label htmlFor="price">Price</label>
                      <InputNumber id="price" value={formik.values.price} onValueChange={(e) => {onInputNumberChange(e, 'price'); formik.handleChange(e)}} mode="currency" currency="VND" locale="en-US" />
                      {getFormErrorMessage('price')}
                     </div>
                     <div className="field col">
                         <label htmlFor="stock">Stock</label>
                        <InputNumber id="stock" value={product.stock} onValueChange={(e) => {onInputNumberChange(e, 'stock')}} integeronly="true" />
                     </div>
                 </div>
                 <div style={{width: "30%", marginLeft: "auto", marginTop: "10px"}}>
                      <Button label="Save" icon="pi pi-check" className="p-button-text" type="submit" />
                  </div>
            </form>
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


export default ProductManagement;

import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';

import {addCategoryRequest, deleteCategoryRequest, getCategoryRequest} from './services/request'
import {handleApi} from '../../handleApi'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import './index.css';

function CategoryManagement() {
  let emptyCategory = {
    id : 0,
    name: ''
  }

  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(emptyCategory)
  const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [categoryDialog, setCategoryDialog] = useState(false);
  const toast = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validate: (data) => {
      let errors = {}

      if (data.name.length <= 3){
        errors.name = "Title of category is more than 3 characters."
      }

      return errors
    },

    onSubmit: (data) => {
      let _category = {...category}
      _category.name = data.name
      setCategory(_category);
      
      let _categories = [...categories]
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
      
      formik.resetForm()
    }
  })

  

  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
      return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  useEffect(() => {
    const fetchCategoryAsync = async() => {
      let result = await handleApi(getCategoryRequest());
      setCategories(result.data)
    }

    fetchCategoryAsync();
  }, [])

  const openNew = () => {
    setCategory(emptyCategory)
    setCategoryDialog(true);
  }
  const hideDialog = () => {
    setCategoryDialog(false);
  }

  const hideDeleteCategoryDialog = () => {
    setDeleteCategoryDialog(false);
  }

  const confirmDeleteCategory = (category)=> {
    setCategory(category);
    setDeleteCategoryDialog(true);
  }

  const deleteCategory = () => {
    let _categories = categories.filter(val => val.id !== category.id);
    let name = category.name;
    setCategories(_categories)
    setDeleteCategoryDialog(false);
    setCategory(emptyCategory)
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Category Deleted', life: 3000 });

    (async(name) => {
      await handleApi(deleteCategoryRequest(name))
    })(name)
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
            <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteCategory(rowData)} />
        </React.Fragment>
    );
  }

  const deleteCategoryDialogFooter = (
    <React.Fragment>
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteCategoryDialog} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteCategory} />
    </React.Fragment>
  );


  //methods

  const onInputChange = (e) => {
    const val = (e.target && e.target.value) || '';
    let _category = {...category};
    _category.name = val;
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

          <Dialog visible={categoryDialog} style={{ width: '450px' }} header="Add Category" modal className="p-fluid"  onHide={hideDialog}>
              <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <label htmlFor="name" >Name*</label>
                    <InputText id="name" name="name" value ={category.name} onChange={(e) => {onInputChange(e); formik.handleChange(e); }} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                    {getFormErrorMessage('name')}
                    <div style={{width: "30%", marginLeft: "auto", marginTop: "10px"}}>
                      <Button label="Save" icon="pi pi-check" className="p-button-text" type="submit" />
                    </div>
              </form>
          </Dialog>
       
          <Dialog visible={deleteCategoryDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCategoryDialogFooter} onHide={hideDeleteCategoryDialog}>
            <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                {category && <span>Are you sure you want to delete <b>{category.name}</b>?</span>}
            </div>
          </Dialog>
      </div>
  )
}

export default CategoryManagement;

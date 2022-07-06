import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route, 
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import Product from './components/Product';
import Category from './components/Category';

// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
// dotenv.config();
function App() {
  const items = [
    {
       label:'File',
       icon:'pi pi-fw pi-file',
       items:[
          {
             label:'New',
             icon:'pi pi-fw pi-plus',
             items:[
                {
                   label:'Bookmark',
                   icon:'pi pi-fw pi-bookmark'
                },
                {
                   label:'Video',
                   icon:'pi pi-fw pi-video'
                },

             ]
          },
          {
             label:'Delete',
             icon:'pi pi-fw pi-trash'
          },
          {
             separator:true
          },
          {
             label:'Export',
             icon:'pi pi-fw pi-external-link'
          }
       ]
    },
    {
       label:'Edit',
       icon:'pi pi-fw pi-pencil',
       items:[
          {
             label:'Left',
             icon:'pi pi-fw pi-align-left'
          },
          {
             label:'Right',
             icon:'pi pi-fw pi-align-right'
          },
          {
             label:'Center',
             icon:'pi pi-fw pi-align-center'
          },
          {
             label:'Justify',
             icon:'pi pi-fw pi-align-justify'
          },

       ]
    },
    {
       label:'Users',
       icon:'pi pi-fw pi-user',
       items:[
          {
             label:'New',
             icon:'pi pi-fw pi-user-plus',

          },
          {
             label:'Delete',
             icon:'pi pi-fw pi-user-minus',

          },
          {
             label:'Search',
             icon:'pi pi-fw pi-users',
             items:[
                {
                   label:'Filter',
                   icon:'pi pi-fw pi-filter',
                   items:[
                      {
                         label:'Print',
                         icon:'pi pi-fw pi-print'
                      }
                   ]
                },
                {
                   icon:'pi pi-fw pi-bars',
                   label:'List'
                }
             ]
          }
       ]
    },
    {
       label:'Events',
       icon:'pi pi-fw pi-calendar',
       items:[
          {
             label:'Edit',
             icon:'pi pi-fw pi-pencil',
             items:[
                {
                   label:'Save',
                   icon:'pi pi-fw pi-calendar-plus'
                },
                {
                   label:'Delete',
                   icon:'pi pi-fw pi-calendar-minus'
                },

             ]
          },
          {
             label:'Archieve',
             icon:'pi pi-fw pi-calendar-times',
             items:[
                {
                   label:'Remove',
                   icon:'pi pi-fw pi-calendar-minus'
                }
             ]
          }
       ]
    },
    {
       label:'Quit',
       icon:'pi pi-fw pi-power-off'
    }
 ];


  return (
    <BrowserRouter>
        <div style={{display: "flex", height: "100vh"}}>
          <Sidebar></Sidebar>
          <div style={{width : "83%"}}>
            <Menubar
              model={items}
              start={<InputText placeholder="Search" type="text"/>}
              end={<Button label="Logout" icon="pi pi-power-off"/>}
            />
            <Routes>
                <Route path="/" element={<Dashboard/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/user" element={<UserManagement/>} />
                <Route path="/product" element={<Product/>} />
                <Route path="/category" element={<Category/>} />
            </Routes>
          </div>
        </div>
    </BrowserRouter>
  );
}

export default App;

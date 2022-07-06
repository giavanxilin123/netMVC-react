import  { useState, useEffect } from "react";
import {getUserRequest} from './services/request'
import {handleApi} from '../../handleApi'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function UserManagement() {

    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchDataAsync = async () => {
            let result = await handleApi(getUserRequest())
            result.data = result.data.map((x, i) => {
                return {...x, address : `${i + 1} Ly Thuong Kiet, Phường 14 Quận 10 TP.Hồ Chí Minh`}
            })
            setUser(result.data)
        }
        fetchDataAsync();
    },[])



    return (
        <div id="user-management">
            <DataTable value={user} responsiveLayout="scroll">
                    <Column field="username" header="Username"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="age" header="Age"></Column>
                    <Column field="address" header="Address"></Column>
            </DataTable>
            {/* {user.map((c, index) => (
            <span key={index}>{c.name}</span>
            ))} */}
          </div>
    )
}

export default UserManagement;

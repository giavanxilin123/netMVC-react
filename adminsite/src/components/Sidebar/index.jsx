import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default class Sidebar extends Component {
render() {
    return (
          <div id="sidebar">
            <div className="logo">
              <span className="logo-sm">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAA/CAYAAAAPKRaqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE0NjQxM0ZBODcyMTExRUI4RUU5RkFCMjFDQTc5NDRCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE0NjQxM0ZCODcyMTExRUI4RUU5RkFCMjFDQTc5NDRCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTQ2NDEzRjg4NzIxMTFFQjhFRTlGQUIyMUNBNzk0NEIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTQ2NDEzRjk4NzIxMTFFQjhFRTlGQUIyMUNBNzk0NEIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5JO6ZDAAAQaElEQVR42uxdC5AdRRW9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" alt=""/>
              </span>
            </div>
            <div id="menu">
            <Link to ="/dashboard"><i style={{marginRight: "10px", lineHeight: "24px"}} className="pi pi-th-large"></i>Dashboard</Link> 
            <Link to ="/user"><i style={{marginRight: "10px", lineHeight: "24px"}} className="pi pi-user"></i>User Management</Link>
            <Link to ="/product"><i style={{marginRight: "10px", lineHeight: "24px"}} className="pi pi-slack"></i>Product</Link> 
            <Link to ="/category"><i style={{marginRight: "10px", lineHeight: "24px"}} className="pi pi-box"></i>Category</Link>  
            </div>
          </div>
    );
  }
}
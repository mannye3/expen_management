import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {  Modal, Button } from 'react-bootstrap';
import { a, Link } from "react-router-dom";
function Home() {
  const [formData, setFormData] = useState({
    expense_date: '',
        merchant: '',
        total: '',
        status: 'New',
        comment: '',
        image: null,
  });
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);



  const handleRowClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };


  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setFormData({ ...formData, image });
  };


  const handleDocChange = (event) => {
    const excel_file = event.target.files[0];
    setFormData({ ...formData, excel_file });
  };



  const handleImoportSubmit = async (event) => {
    event.preventDefault();
   
    try {
      const formdata = new FormData();
      formdata.append('excel_file', formData.excel_file);

       await axios.post('  https://react.ailesgroup.com/api/upload-excel', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
 
      fetchData();
      setFormData({
        excel_file: '',
       
      });
    } catch (error) {
      
    }
  };



  
  const handleSubmit = async (event) => {
    event.preventDefault();
   
    try {
      const formdata = new FormData();
      formdata.append('expense_date', formData.expense_date);
      formdata.append('merchant', formData.merchant);
      formdata.append('total', formData.total);
      formdata.append('status', formData.status);
      formdata.append('comment', formData.comment);
      formdata.append('image', formData.image);

     await axios.post('https://react.ailesgroup.com/api/addexpenses', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
 
      fetchData();
      setFormData({
        expense_date: '',
        merchant: '',
        total: '',
        status: 'New',
        comment: '',
        image: null,
      });
    } catch (error) {
      
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

const fetchData = () => {
axios.get("https://react.ailesgroup.com/api/expenses").then(response => {
  setTableData(response.data);
});


};

  


  const handleInputChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSearch = event => {
    setSearchQuery(event.target.value);
  };


  
  const filteredTableData = tableData.filter(
    item =>

      item.merchant.toLowerCase().includes(searchQuery.toLowerCase()) &&
    //   item.expense_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //   item.status.toLowerCase().includes(searchQuery.toLowerCase())
      (!startDate || new Date(item.expense_date) >= new Date(startDate)) &&
      (!endDate || new Date(item.expense_date) <= new Date(endDate))
  );




  const totalAmount = filteredTableData.reduce((acc, curr) => acc + curr.total, 0);



  

  return (
    <>
     <div class="nk-header is-light">
                <div class="container-fluid">
                    <div class="nk-header-wrap">
                        <div class="nk-menu-trigger mr-sm-2 d-lg-none">
                            <Link to="#" class="nk-nav-toggle nk-quick-nav-icon" data-target="headerNav"><em class="icon ni ni-menu"></em></Link>
                        </div>
                        <div class="nk-header-brand">
                            <Link to="#" class="logo-a">
                            <h3>Expense Manager</h3> 
                            </Link>
                        </div>
                        <div class="nk-header-menu ml-auto" data-content="headerNav">
                            <div class="nk-header-mobile">
                                <div class="nk-header-brand">
                                    <a href="#" class="logo-a">
                                   <h3>Expense Manager</h3> 
                                    </a>
                                </div>
                                <div class="nk-menu-trigger mr-n2">
                                    <a to="#" class="nk-nav-toggle nk-quick-nav-icon" data-target="headerNav"><em class="icon ni ni-arrow-left"></em></a>
                                </div>
                            </div>
                           
                        </div>
                        <div class="nk-header-tools">
                            <ul class="nk-quick-nav">
                                
                                <li class="dropdown user-dropdown">
                                    <a to="#" class="dropdown-toggle" data-toggle="dropdown">
                                        <div class="user-toggle">
                                            <div class="user-avatar sm">
                                                <em class="icon ni ni-user-alt"></em>
                                            </div>
                                        </div>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-md dropdown-menu-right dropdown-menu-s1 is-light">
                                       
                                       
                                      
                                        <div class="dropdown-inner">
                                            <ul class="a-list">
                                                <li><a to="#"><em class="icon ni ni-signout"></em><span>Sign out</span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
     
      <div class="nk-content ">
                <div class="container-fluid">
                    <div className="row">
                    <div className="col-3">
                    

                         <form onSubmit={handleSubmit}>
                                <div class="nk-block">
                                    <div class="row g-3">
                                    
                                      
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label" for="sale-price">From</label>
                                                <div class="form-control-wrap">
                                                <DatePicker className="form-control" selected={startDate} onChange={(date) => setStartDate(date)} />
                                                    
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label" for="sale-price">To</label>
                                                <div class="form-control-wrap">
                                                <DatePicker className="form-control" selected={endDate} onChange={(date) => setEndDate(date)} />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <div class="form-group">
                                                <label class="form-label" for="product-title">Merchant </label>
                                                <div class="form-control-wrap">
                                                    <select name="merchant" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} class="form-control">
                                                    <option value="Ride sharing">Ride sharing</option>
                                                    <option value="Office supplies">Office supplies</option>
                                                    <option value="Breakfast">Breakfast</option>
                                                    <option value="Electronics">Electronics</option>
                                                    <option value="Parking">ElectroParkingnics</option>
                                                    <option value="Airline">Airline</option>
                                                    </select>
                                                   
                                                </div>
                                            </div>

                                        </div>
                                        
                                       
                                       
                                       
                                        
                                    </div>
                                </div>
                                </form>
                        </div>
                    <div className="col-7">
                    <div class="nk-content-inner">
                        <div class="nk-content-body">
                            <div class="nk-block-head nk-block-head-sm">
                                <div class="nk-block-between">
                                    <div class="nk-block-head-content">
                                        <h3 class="nk-block-title page-title">Expenses</h3>
                                    </div>

                                    <div class="nk-block-head-content">
                                        <div class="toggle-wrap nk-block-tools-toggle">
                                            <Link  class="btn  btn-trigger toggle-expand mr-n1" data-target="pageMenu"><em class="icon ni ni-more-v"></em></Link>
                                            <div class="toggle-expand-content" data-content="pageMenu">
                                                <ul class="nk-block-tools g-3">
                                                    <li>
                                                        <div class="form-control-wrap">
                                                            <div class="form-icon form-icon-right">
                                                                <em class="icon ni ni-search"></em>
                                                            </div>
                                                            <input  value={searchQuery} onChange={handleSearch} type="text" class="form-control" id="default-04" placeholder="Quick search by merchant"/>
                                                        </div>
                                                    </li>
                                                   
                                                    <li class="nk-block-tools-opt">
                                                        <a to="#" data-target="addProduct" class="toggle btn btn-icon btn-primary d-md-none"><em class="icon ni ni-plus"></em></a>
                                                        <Link data-target="addProduct" class="toggle btn btn-primary d-none d-md-inline-flex"><em class="icon ni ni-plus"></em><span> Add Expense</span></Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="nk-block">
							<table class="datatable-init-export nowrap table">
                                                <thead>
                                                    <tr>
														<th>id</th>
                                                        <th>Date</th>
                                                        <th>Merchant</th>
                                                        <th>Total</th>
                                                        <th>Status</th>
                                                        <th>Comment</th>
                                                      
                                                        
                                                    </tr>
                                                </thead>
                                                <tbody>
											
	
                                               
                                                    {filteredTableData.map(u => (
												    <tr key={u.id} onClick={() => handleRowClick(u)}>
                                                        <td>{u.id}</td>
                                                        <td>{u.expense_date}</td>
                                                        <td>{u.merchant}</td>
                                                        <td>{u.total}</td>
                                                        <td>{u.status}</td>
                                                        <td>{u.comment}</td>
                                                      
                                                    </tr>
                                                     ))}
                                                     {tableData.length === 0 && (
                                        <tr>
                                            <td
                                                className="px-6 py-4 border-t"
                                                colSpan="4"
                                            >
                                                No contacts found.
                                            </td>
                                           
                                        </tr>
                                        
                                        
                                    )}
                                               </tbody>
                                            </table>
                            </div>
                            <div class="nk-add-product toggle-slide toggle-slide-right" data-content="addProduct" data-toggle-screen="any" data-toggle-overlay="true" data-toggle-body="true" data-simplebar>
                                <div class="nk-block-head">
                                    <div class="nk-block-head-content">
                                        <h5 class="nk-block-title">Add Expense</h5>
                                        <div class="nk-block-des">
                                          
                                        </div>
                                    </div>
                                </div>
                                    <ul class="nav nav-tabs">
                                    <li class="nav-item">
                                        <a class="nav-a active" data-toggle="tab" href="#tabItem1">Add Expense</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-a" data-toggle="tab" href="#tabItem2">Import CSV</a>
                                    </li>
                                    
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tabItem1">
                                        <p> <form onSubmit={handleSubmit}>
                                <div class="nk-block">
                                    <div class="row g-3">
                                        <div class="col-12">
                                            <div class="form-group">
                                                <label class="form-label" for="product-title">Merchant *</label>
                                                <div class="form-control-wrap">
                                                    <select name="merchant" value={formData.merchant} onChange={handleInputChange} class="form-control">
                                                    <option value="Ride sharing">Ride sharing</option>
                                                    <option value="Office supplies">Office supplies</option>
                                                    <option value="Breakfast">Breakfast</option>
                                                    <option value="Electronics">Electronics</option>
                                                    <option value="Parking">ElectroParkingnics</option>
                                                    <option value="Airline">Airline</option>
                                                    </select>
                                                   
                                                </div>
                                            </div>

                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label" for="regular-price">Total</label>
                                                <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">$</span>
                                        </div>
                                        <input name="total" value={formData.total} onChange={handleInputChange} type="number" class="form-control"/>
                                        <div class="input-group-append">
                                            <span class="input-group-text">.00</span>
                                        </div>
                                    </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label" for="sale-price">Date</label>
                                                <div class="form-control-wrap">
                                                    <input name="expense_date" value={formData.expense_date} onChange={handleInputChange} type="date" class="form-control" id="sale-price"/>
                                                    <input hidden name="status" value={formData.status} onChange={handleInputChange} type="text" class="form-control" id="sale-price"/>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label" for="SKU">Comment</label>
                                                <div class="form-control-wrap">
                                                    <textarea name="comment" value={formData.comment} onChange={handleInputChange}  class="form-control" id="SKU"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                       
                                        <div class="col-12">

                                        <div class="form-control-wrap">
                                        <div class="custom-file">
                                            <input  type="file" name="image" onChange={handleImageChange} class="custom-file-input" id="customFile"/>
                                            <label class="custom-file-label" for="customFile">Choose file</label>
                                        </div>
                                    </div>
                                        
                                      
                                       
                                </div>
                                        <div class="col-12">
                                            <button type="submit" class="btn btn-primary"><em class="icon ni ni-plus"></em><span>Add New</span></button>
                                        </div>
                                    </div>
                                </div>
                                </form></p>
                                    </div>
                                    <div class="tab-pane" id="tabItem2">
                                    <div class="nk-block">
                                    <div class="row g-3">
                                    <form onSubmit={handleImoportSubmit}>
                                    <div class="form-group">
                                    <label class="form-label" for="customFileLabel"> File Upload</label>
                                    
                                    <div class="form-control-wrap">
                                        <div class="custom-file">
                                        <div class="col-12">
                                            <input  type="file" name="excel_file" onChange={handleDocChange} class="custom-file-input" id="customFile"/>
                                            <label class="custom-file-label" for="customFile">Choose file</label>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                        <div class="col-12">
                                            <button type="submit" class="btn btn-primary"><em class="icon ni ni-plus"></em><span> Submit</span></button>
                                        </div>
                                        </form>
                                        </div>
                                        </div>
                                    </div>
                                    
                                </div>
                               
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-2">
                    <br/><br/>
                    <h3>${totalAmount}</h3>
                        </div>
                    </div>
                    
                </div>
            </div>


         
       

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>View</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRow && (
            <>
            
                <div class="nk-block">
                                    <div class="row g-3">
                                        <div class="col-8">
                                        <div class="col-12">
                                            <div class="form-group">
                                                <label class="form-label" for="product-title">Merchant</label>
                                                <div class="form-control-wrap">
                                                    <input readOnly  value={selectedRow.merchant}  class="form-control"/>
                                                    
                                                </div>
                                            </div>

                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label" for="regular-price">Total</label>
                                                <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">$</span>
                                        </div>
                                        <input readOnly value={selectedRow.total}  class="form-control"/>
                                        <div class="input-group-append">
                                            <span class="input-group-text">.00</span>
                                        </div>
                                    </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label" for="sale-price">Date</label>
                                                <div class="form-control-wrap">
                                                    <input readOnly value={selectedRow.expense_date} class="form-control" id="sale-price"/>
                                                   
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label" for="SKU">Comment</label>
                                                <div class="form-control-wrap">
                                                    <textarea readOnly value={selectedRow.comment}  class="form-control" id="SKU"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                       
                                        </div>
                                        <div class="col-4">
                                        <img src={`https://react.ailesgroup.com/documents/${selectedRow.image}`} alt={selectedRow.merchant} />
                                            </div>
                                    </div>
                                </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
			
    </>
  );
}

export default Home;

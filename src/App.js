import React from 'react';
import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-blue.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchStudentGridData, localStorageStudentData } from './actions/studentDetailsAction';
import { connect } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import Modal from 'react-modal';
/*
* style for modal dialog
*/
const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
  }
};
class StudentDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      gridDataForStudentList: [],
      stateVal: 0,
      detailScreenFlag: false,
      updateRecordFlag: false,
      firstCallFlag: true,
      columnDefsForStudentList: [
        {
          headerName: "Row",
          checkboxSelection: true,
          width: 90,
          cellClass: ['ellipses']
        },
        {
          headerName: "Student ID",
          field: "id",
          width: 130,
          unSortIcon: true,
          editable: false,
          cellClass: ['ellipses']
        },
        {
          headerName: "Student Name",
          field: "name",
          width: 180,
          unSortIcon: true,
          editable: false,
          cellClass: 'ellipses'
        },
        {
          headerName: "Email Address",
          field: "email",
          width: 185,
          unSortIcon: true,
          editable: false,
          cellClass: 'ellipses'
        },
        {
          headerName: "Favourite",
          field: "favourite",
          width: 169,
          editable: true,
          cellRenderer: (item) => this.favouriteValue(item),
          cellEditorParams: {
            cellHeight: 50,
            options: ['Yes', 'No']
          }
        }
      ]
    }
  }
  componentDidMount() {
    if (JSON.parse(localStorage.getItem("studentData")) === null || JSON.parse(localStorage.getItem("studentData")).length === 0) {
      this.props.dispatch(fetchStudentGridData());
    }
    else {
      this.props.dispatch(localStorageStudentData(JSON.parse(localStorage.getItem("studentData"))));
    }

  }
  componentWillMount() {
    Modal.setAppElement('body');
  }
  componentWillReceiveProps(nextProps) {
    let studentData = nextProps.studentData;
    if (studentData[0].favourite === undefined) {
      for (let i = 0; i < studentData.length; i++) {
        studentData[i].favourite = 'No';
      }
    }
    this.setState({
      gridDataForStudentList: studentData
    })
  }
  /**
   * @desc favouriteValue, return favourite Value of the student Grid
   * @param {object} params params
   * @returns {string} string
  */
  favouriteValue(params) {
    return this.state.gridDataForStudentList[params.rowIndex].favourite

  }
  /**
 * @desc onStudentRowSelection, function to be called when student grid data is selected
 * @returns {null} null
*/
  onStudentRowSelection() {
    let selectedRow = this.gridApi.getSelectedRows();
    if (selectedRow.length === 1) {
      this.setState({
        detailScreenFlag: true,
        updateRecordFlag: true
      })
    }
    else {
      this.setState({
        detailScreenFlag: false,
        updateRecordFlag: false
      })
    }
  }
  /**
 * @desc handleDetailScreenValidation, function to open Detail Screen
 * @param {null} null
 * @returns {null} null
*/
  handleDetailScreenValidation() {
    let selectedRow = this.gridApi.getSelectedRows();
    let favouriteFlag = false;
    if ((selectedRow[0].favourite).toUpperCase() === 'YES') {
      favouriteFlag = true;
    }
    this.setState({
      modalIsOpen: true,
      studentId: selectedRow[0].id,
      studentName: selectedRow[0].name,
      studentMail: selectedRow[0].email,
      studentDesc: selectedRow[0].body,
      favouriteStudent: favouriteFlag,
      detailsButtonFlag: true
    })
  }
  /**
 * @desc handleUpdatedStudentData, function to update data of the grid row
 * @param {null} null
 * @returns {null} null
*/
  handleUpdatedStudentData() {
    let studentRecords = this.state.gridDataForStudentList;
    for (let i = 0; i < studentRecords.length; i++) {
      if ((studentRecords[i].favourite).toUpperCase() === 'YES') {
        studentRecords[i].favourite = 'Yes';
      }
      else {
        studentRecords[i].favourite = 'No';
      }
    }
    localStorage.setItem("studentData", JSON.stringify(studentRecords));
    this.setState({
      modalIsOpen: true,
      detailsButtonFlag: false
    })
  }
  /**
 * @desc handleCloseModal, function to close modal
 * @param {null} null
 * @returns {null} null
*/
  handleCloseModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    let self = this;
    return (
      <div id="container">

        <Modal
          isOpen={this.state.modalIsOpen}
          style={modalStyles}
          contentLabel="Example Modal"
        >
          {this.state.detailsButtonFlag === true ? (
            <div>
              <h2 id="modalHeaderId" ref={subtitle => this.subtitle = subtitle}>Student Details</h2>
              <form className="form-horizontal">
                <div className="form-inline form-group">
                  <label className="col-md-5">Student Id:</label>
                  <div className="col-md-5">
                    <input type="text" className="form-control" id="studentId" name="studentId" value={this.state.studentId} readOnly />
                  </div>
                </div>
                <div className="form-inline form-group">
                  <label className="col-md-5">Student Name:</label>
                  <div className="col-md-5">
                    <input type="text" className="form-control" id="studentName" name="studentName" value={this.state.studentName} readOnly />
                  </div>
                </div>
                <div className="form-inline form-group">
                  <label className="col-md-5">Student Mail:</label>
                  <div className="col-md-5">
                    <input type="text" className="form-control" id="studentMail" name="studentMail" value={this.state.studentMail} readOnly />
                  </div>
                </div>
                <div className="form-inline form-group">
                  <label className="col-md-6">Favourite Student:</label>
                  <div className="col-md-3">
                    <input type="radio" className="radio form-control" name="radioGroup" checked={this.state.favouriteStudent} readOnly />


                    <label className="col-md-1">Yes</label>
                  </div>
                  <div className="col-md-3">
                    <input type="radio" className="radio form-control" name="radioGroup" checked={!this.state.favouriteStudent} readOnly />

                    <label className="col-md-1">No</label>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-6" >Student Description:</label>
                  <div className="col-md-12">
                    <textarea className="form-control" id="studentDesc" name="studentDesc" value={this.state.studentDesc} readOnly />
                  </div>
                </div>
              </form>
              <button type="button" className="col-md-2 btn btn-primary float-right" style={{ margin: "10px" }} onClick={() => this.handleCloseModal()}>Close</button>
            </div>
          ) : (
              <div>
                <p>
                  Student Records Updated
              </p>
                <button type="button" className="col-md-5 btn btn-primary updateMessage" onClick={() => this.handleCloseModal()}>Ok</button>
              </div>
            )
          }
        </Modal>
        <form id="contentForm">
          <div className="form-group" id="pageHeader">
            <header>
              <h1>Student Records</h1>
            </header>
          </div>
          <div id="myGrid" style={{ height: '500px', width: '756px' }} className="ag-theme-blue">
            <AgGridReact
              rowSelection="single"
              columnDefs={self.state.columnDefsForStudentList}
              rowData={self.state.gridDataForStudentList}
              onGridReady={params => this.gridApi = params.api}
              onSelectionChanged={() => this.onStudentRowSelection()}
            >
            </AgGridReact>
          </div>
          <div className="form-group col-md-5">
            <footer>
              <button type="button" id="detailBtn" className="btn btn-primary float-right col-md-3" onClick={() => this.handleDetailScreenValidation()} disabled={!this.state.detailScreenFlag}> Detail Screen</button>
              <button type="button" id="updateBtn" className="btn btn-primary float-right col-md-3" onClick={() => this.handleUpdatedStudentData()} disabled={!this.state.updateRecordFlag}> Update Data</button>
            </footer>

          </div>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    studentData: state.studentDetailsReducer.studentData
  }
}
export default connect(mapStateToProps)(StudentDetails);
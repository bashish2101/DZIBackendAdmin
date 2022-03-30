import React, { useState, useEffect } from 'react'
import { Table, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import AddThirdPartyService from './addThirdPartyService';
import { getAllServicesAsync, createServiceAsync, updateServiceAsync } from '../redux/thirdPartyApi';
import CircularProgress from '@material-ui/core/CircularProgress';

export function ThirdPartyServices() {

    const [AddModal, setAddModal] = useState(false);
    const handleClose = () => setAddModal(false);
    const handleShow = () => setAddModal(true);

    const [DeleteModal, setDeleteModal] = useState(false);
    const deleteClose = () => setDeleteModal(false);
    const deleteShow = () => setDeleteModal(true);

    const [selectedService, setSelectedService] = useState({});

    const dispatch = useDispatch();

    const { allServiceList, refreshServiceList, isLoading } = useSelector(state => state.thirdParty, shallowEqual)

    useEffect(() => {
        if (refreshServiceList) {
            dispatch(getAllServicesAsync())
        }
    }, [refreshServiceList])

    const onAddService = (data) => {
        dispatch(createServiceAsync(data));
        handleClose();
    };

    const onEditService = (data, id) => {
        dispatch(updateServiceAsync(data, id));
        handleClose();
    }

    const onDeleteService = () => {
        setSelectedService({});
        deleteClose();
    }

    const onEditClick = (service) => {
        setSelectedService(service)
        handleShow();
    }

    const onStatusChange = (serviceDetails) => {
        let data = {
            status: serviceDetails.status === "INACTIVE" ? "ACTIVE" : "INACTIVE",
        }
        dispatch(updateServiceAsync(data, serviceDetails._id));
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12 d-flex justify-content-between flex-wrap flex-sm-nowrap db_1400">
                    <div className="d-flex align-items-center flex-wrap mr-1">
                        <h5 className="fn_s_32 f-w-700 color_blk mb-4 mr-5">Third Party Services</h5>
                        <button className="btn btn-def btn-defv3 mrgn-8" onClick={handleShow}>ADD NEW</button>
                    </div>
                    {/* <div className="d-flex flex-wrap ap_filter_wraper justify-content-end align-items-center">
                        <form className="subheader_filter">
                            <div className="form-row">
                                <div className="form-group mr-3 mb-1">
                                    <input name="propertySearch" placeholder="Search" type="text" className="form-control" />
                                </div>
                            </div>
                        </form>
                    </div> */}
                </div>

                <div className="col-md-12 mt-5">
                    <div className="px-6 pt-0 dash_wt_bx pb-0 ovflhddn loader-display-position">
                        <div className="tblmrgn mt-0">
                            <Table hover responsive className="mb-0 default_table with_hoverbtn">
                                <thead>
                                    <tr>
                                        <th className="wd-120">Added On</th>
                                        <th>TYPE</th>
                                        <th>Status</th>
                                        <th className="wd-120"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allServiceList.length ? (
                                            allServiceList.map((allServiceLists, index) => (
                                                <tr key={index} >
                                                    <td>
                                                        {/* <span className="fn_s_14">{new Date(allServiceLists.createdAt).getDate()}</span> */}
                                                        <span className="fn_s_14">
                                                            {new Date(allServiceLists.createdAt).getDate()}&nbsp;{new Date(allServiceLists.createdAt).toLocaleString('default', { month: 'short' })}&nbsp;{new Date(allServiceLists.createdAt).getFullYear()} &nbsp;|&nbsp;  {new Date(allServiceLists.createdAt).getHours()} : {new Date(allServiceLists.createdAt).getMinutes()}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="f-w-500">{allServiceLists.type}</span>
                                                    </td>
                                                    <td>
                                                        <Form.Check
                                                            checked={allServiceLists.status === "ACTIVE"}
                                                            onClick={() => onStatusChange(allServiceLists)}
                                                            type="switch"
                                                            id="check1"
                                                            label=""
                                                            className="cstmswtch"
                                                            name="status"
                                                        />
                                                    </td>
                                                    <td>
                                                        <button className="actn_btn edit_btn" onClick={() => onEditClick(allServiceLists)}>
                                                            <span className="material-icons">edit</span>EDIT
                                                        </button>
                                                        {/* <button className="actn_btn rmv_btn" onClick={() => onDeleteClick(allServiceLists)}>
                                                            <span className="material-icons">delete</span>REMOVE
                                                        </button> */}
                                                    </td>
                                                </tr>
                                            ))
                                        ) :
                                            (
                                                <tr>
                                                    <td colSpan={4} className="text-center">
                                                        No Record Found
                                                    </td>
                                                </tr>
                                            )
                                    }
                                </tbody>
                            </Table>
                        </div>
                        {
                            isLoading &&
                            <div className="basic-verification-loader">
                                <CircularProgress />
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Modal show={AddModal} onHide={handleClose} centered className="def_modal">
                <Modal.Header closeButton>
                    <Modal.Title className="fn_s_18 color_blk f-w-700">{selectedService ? "Add New" : "Edit Service"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddThirdPartyService
                        onAddService={onAddService}
                        selectedService={selectedService}
                        onEditService={onEditService}
                    />
                </Modal.Body>
            </Modal>
            <Modal show={DeleteModal} onHide={deleteClose} centered className="def_modal delete_modal">
                <Modal.Header>
                    <Modal.Title className="fn_s_18 color_blk f-w-700">Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form def_form frmwtpddng">
                        <p className="fn_s_18 f-w-400 text-center mb-10">Are you sure want to delete?</p>
                        <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0">
                            <button type="button" className="btn btn-def btn_pdng mr-3" onClick={deleteClose}>Keep</button>
                            <button type="button" className="btn btn-delete btn_pdng" onClick={onDeleteService}>Yes, Delete</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}


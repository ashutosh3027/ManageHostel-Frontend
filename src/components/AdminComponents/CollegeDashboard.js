import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import CreateHostels from './CreateHostels';
import collegeServices from '../../services/collegeServices';

const CollegeDashboard = () => {
    // const college = {
    //     name: "College G",
    //     description: "first college",
    //     hostels: [
    //         {
    //             buildingName: "Building 1",
    //             collegeId: "647244f5d14bd1125ad903ba",
    //             college: {
    //                 collegeName: "College G",
    //                 id: "647244f5d14bd1125ad903ba"
    //             },
    //             id: "64724a6542da269ab8f62058"
    //         }
    //     ]
    // }
    const temp = {
        name: undefined,
        description: undefined,
        hostels: []
    }
    const [college, setCollege] = useState(temp);
    const [collegeId, setCollegeId] = useState(useParams().id);
    const [isCollegeDataLoading, setIsCollegeDataLoading] = useState(true);
    useEffect(() => {
        (async () => {
            setIsCollegeDataLoading(true);
            const { collegeName } = await collegeServices.getCollege(collegeId)
            const hostels1 = await collegeServices.getAllBuildingsByCollegeId(collegeId);
            console.log(hostels1)
            setCollege({ ...college, name: collegeName, hostels: [...hostels1] });
            setIsCollegeDataLoading(false);
        })()
    }, [collegeId]);
    console.log(college)
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [editedName, setEditedName] = useState(college.name);
    const [editedDescription, setEditedDescription] = useState(college.description);
    const handleEditNameClick = () => {
        setIsEditingName(true);
    };

    const handleEditDescriptionClick = () => {
        setIsEditingDescription(true);
    };

    const handleSaveNameClick = () => {
        // Perform save operation or API call to update the college name
        // You can use the editedName value

        setIsEditingName(false);
    };

    const handleSaveDescriptionClick = () => {
        // Perform save operation or API call to update the college description
        // You can use the editedDescription value

        setIsEditingDescription(false);
    };

    const handleCancelNameClick = () => {
        setIsEditingName(false);
        setEditedName(college.name);
    };

    const handleCancelDescriptionClick = () => {
        setIsEditingDescription(false);
        setEditedDescription(college.description);
    };

    const handleNameChange = (e) => {
        setEditedName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setEditedDescription(e.target.value);
    };

    return (

        <div className='mt-5'>
            {isCollegeDataLoading ? <Spinner animation='border' role='status'>
                <span className='visually-hidden'>Loading...</span>
            </Spinner> :
                <>
                    <h2>College Dashboard</h2>
                    <div className=" card p-2">
                        <div className='row'>
                            <label className='col text-start font-weight-bold' > <h4>Name:</h4></label>
                            {isEditingName ? (
                                <div className='col'>
                                    < input type="text" value={editedName} onChange={handleNameChange} />
                                    <FontAwesomeIcon icon={faPen} className="edit-icon" onClick={handleSaveNameClick} />
                                    <FontAwesomeIcon icon={faTimes} className="edit-icon" onClick={handleCancelNameClick} />

                                </div>
                            ) : (
                                <div className='col'>
                                    <span className='text-start text-md-start'>{college.name}</span>
                                    <FontAwesomeIcon icon={faPen} className="edit-icon" onClick={handleEditNameClick} />
                                </div>
                            )}
                        </div>
                        <div className='row'>
                            <label className='col text-start font-weight-bold'><h4>Description:</h4></label>
                            {isEditingDescription ? (
                                <div className='col'>
                                    <textarea value={editedDescription} onChange={handleDescriptionChange} />
                                    <FontAwesomeIcon icon={faPen} className="edit-icon" onClick={handleSaveDescriptionClick} />
                                    <FontAwesomeIcon icon={faTimes} className="edit-icon" onClick={handleCancelDescriptionClick} />
                                </div>
                            ) : (
                                <div className='col'>
                                    <span className='text-start'>{college.description}</span>
                                    <FontAwesomeIcon icon={faPen} className="edit-icon" onClick={handleEditDescriptionClick} />
                                </div>
                            )}
                        </div>
                        <div className='row'>
                            <label className='col text-start font-weight-bold'><h4>Hostels:</h4></label>
                            <div className='col'>
                                <span className='text-start'>{college.hostels.length}</span>
                            </div>

                        </div>
                    </div>
                    <CreateHostels college={college} setCollege={setCollege} />
                </>}
        </div >
    );
};

export default CollegeDashboard;




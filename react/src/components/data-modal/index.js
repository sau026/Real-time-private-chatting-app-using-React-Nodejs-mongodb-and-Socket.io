import React, {useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSelectToDoData, selectToDo } from '../../redux/actions/todoAction'
import './index.scss';

const DataModal = (props) => {
    const userDetails = useSelector(state => state.todoDataReducer)
    const dispatch = useDispatch()

    useEffect(() => {
            getUserData()
    }, [])

    const getUserData = () => {
        dispatch(getSelectToDoData(userDetails.selectedTodoListData.userId))
    }

    const closeModal = () => {
        dispatch(selectToDo(null))
    }

    const getModalJSX = () => {
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <span className="close" onClick={() => closeModal()}>&times;</span>
                    <h3>Data Model</h3>
                </div>
                <div className="modal-body">
                    <div className="modal-body-data">
                        <div>ToDo ID:-</div>
                        <div>{userDetails.selectedTodoListData.id}</div>
                    </div>
                    <div className="modal-body-data">
                        <div>ToDo Title:-</div>
                        <div>{userDetails.selectedTodoListData.title}</div>
                    </div> 
                    <div className="modal-body-data">
                        <div>User ID:-</div>
                        <div>{userDetails.selectedTodoListData.userId}</div>
                    </div> 
                    <div className="modal-body-data">
                        <div>Name:- </div>
                        <div>{userDetails.selectedTodoApiData && userDetails.selectedTodoApiData.name}</div>
                    </div> 
                    <div className="modal-body-data">
                        <div>Email:-</div>
                        <div>{userDetails.selectedTodoApiData && userDetails.selectedTodoApiData.email}</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div  id="myModal" className="modal">
                {getModalJSX()}
            </div>
        </div>
    );
}

export default DataModal;


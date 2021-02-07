import React, { useState, useEffect } from 'react'
import { todoList, selectToDo } from '../../redux/actions/todoAction'
import { useSelector, useDispatch } from 'react-redux'
import './index.scss';

const Table = (props) => {
    const allToDo = useSelector(state => state.todoDataReducer)
    const dispatch = useDispatch()
    const [allToDoData, setAllToDoData] = useState(null)
    const [sortDataOrder, setSortDataOrder] = useState('asc')

    useEffect(() => {
        dispatch(todoList())
    }, [])

    useEffect(() => {
        setAllToDoData(allToDo.todoData);
    }, [allToDo])

    const sortById = () => {
        if (sortDataOrder === 'asc') {
            let sortedData = allToDo.todoData.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
            setAllToDoData(sortedData);
            setSortDataOrder('dsc')
        }
        if (sortDataOrder === 'dsc') {
            let sortedData = allToDo.todoData.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
            setAllToDoData(sortedData);
            setSortDataOrder('asc')
        }
    }

    const searchTodo = (data) => {
        const newArray = allToDo.todoData.filter(o => {
            return Object.keys(o).some(k => {
                let val = o[k];
                return String(val)
                    .toLowerCase()
                    .includes(data.toLowerCase());
            });
        });
        setAllToDoData(newArray)
    }

    const selectModalData = (data) => {
        dispatch(selectToDo(data))
    }

    const getTableJSX = () => {
        return (
            <div className="table-container-main">
                <div className="search-container"><input placeholder="Search" onChange={(e) => searchTodo(e.target.value)}></input></div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => sortById()} style={{cursor:'pointer'}}>ToDo ID&nbsp;<i className="fas fa-sort"></i></th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allToDo.todoData.length > 0 && allToDoData.map((element, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{element.id}</td>
                                        <td>{element.title}</td>
                                        <td>{element.completed ? 'Complete' : 'Incomplete'}</td>
                                        <td>
                                            <button className="messenger-batch"
                                                onClick={() => selectModalData(element)}>
                                                Action
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    const getSpinnerJSX = () => {
        return (
            <div className="spinner">
                <i className="fas fa-spinner fa-spin icon"></i>
            </div>
        )
    }

    return (
        <>
            {allToDo.isLoading && getSpinnerJSX()}
            {getTableJSX()}
        </>
    );
}

export default Table;


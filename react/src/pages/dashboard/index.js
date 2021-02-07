import React from 'react'
import Sidebar from '../../components/sidebar-left'
import Header from '../../components/header'
import { useSelector } from 'react-redux'
import DataModal from '../../components/data-modal'
import Table from '../../components/data-table'
import './index.scss';

const Dashboard = (props) => {
  const userDetails = useSelector(state => state.todoDataReducer)

  const getAppHeaderJSX = () => {
    return (
      <>
        <Header headerTitle={'Settings > Dialogues'} />
      </>
    )
  }

  const getAppSidebarJSX = () => {
    return (
      <div className="side-panel">
        <Sidebar></Sidebar>
      </div>
    )
  }

  const getTableJSX = () => {
    return (
      <>
        <Table/>
      </>
    )
  }

  return (
    <div className="dashboard__page-conatiner -site-text-size">
      {userDetails.selectedTodoListData ? <DataModal /> : null }
      {getAppSidebarJSX()}
      <div className="main-body">
        {getAppHeaderJSX()}
        {getTableJSX()}
      </div>
    </div>
  );
}

export default Dashboard;



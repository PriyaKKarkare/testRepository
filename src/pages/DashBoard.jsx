import React from 'react'
import Sidebar from '../components/SideBar/Sidebar'
import Header from '../components/Header/Header'

const DashBoard = () => {
	return (
		<>
			<Sidebar />
			<div style={{ marginLeft: '250px', background: "#F6F5FD", minHeight: "100vh" }}>
				<Header />
			</div>
		</>
	)
}

export default DashBoard

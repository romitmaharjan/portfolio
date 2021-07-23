import React from 'react'
import Sidebar from '../Sidebar/Sidebar'

const Home = (props) => {
    return(
        <div className="mainContent avoidTop">
        <Sidebar />
        <main>This is Home Page</main>
        </div>
    )
}

export default Home;
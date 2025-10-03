import React from "react";
import './home.scss'
// Go up to 'src/core' first, then into components
import Navbar from "../../components/common-components/navbar/navbar";
import Sidebar from "../../components/common-components/sidebar/sidebar";
import BreadcrumbReact from "../../components/common-components/breadcrumb/Breadcrumb";
import Widget from "../../components/dashboard/widget/widget";
import Featured from "../../components/dashboard/featured/Featured";
import Table from "../../components/dashboard/table/Table";
import DateFilter from "../../components/dashboard/dateFilter/DateFilter";
import ChartComponent from "../../components/dashboard/chart/Chart";
import ChatBot from "../../components/common-components/ai-chatbot/Chatbot";

// If DateFilter is here
const Home = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <BreadcrumbReact
                    items={[
                        { label: 'Dashboard', url: '/' },
                        'Admin Dashboard',
                    ]}
                />

                <DateFilter onDateChange={(range) => console.log("Date Range Changed:", range)} />
                <div className="widgets">
                    <Widget type="user" />
                    <Widget type="order" />
                    <Widget type="earning" />
                    <Widget type="balance" />

                </div>
                <div className="charts">
                    <Featured />
                    <ChartComponent title="Last 6 Month (Revenue)" height="300px" />

                </div>
                <div className="listContainer">
                    <div className="listTitle">Latest Transactions</div>
                    <Table />
                </div>
            </div>
            <ChatBot />
        </div>
    )
}
export default Home
import React from "react";
import "./featured.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Featured = () => {
    return (
        <div className="featured">
            <div className="top">
                <h1 className="title">Total Revenue</h1>
                <FontAwesomeIcon icon={faEllipsisV} />
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
                </div>
                <p className="title">Total Sales made today</p>
                <p className="amount">$42500</p>
                <p className="desc">
                    Previous transaction processing. Last payment may not be included.
                </p>
                <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Target</div>
                        <div className="itemResult negative">
                            <div className="resultAmount">
                                <FontAwesomeIcon icon={faArrowDown} /> $12.4k
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Week</div>
                        <div className="itemResult positive">
                            <div className="resultAmount">
                                <FontAwesomeIcon icon={faArrowUp} /> $12.4k
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Month</div>
                        <div className="itemResult positive">
                            <div className="resultAmount">
                                <FontAwesomeIcon icon={faArrowUp} /> $12.4k
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;

import React, { useEffect, useState } from "react";
import "./widget.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faShoppingCart,
    faWallet,
    faMoneyBillWave,
    faArrowUp,
    faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

const Widget = ({ type }) => {
    // amount and diff per type
    let targetAmount = 0;
    let diff = 0;

    // Widget content by type
    let data;
    switch (type) {
        case "user":
            targetAmount = 850;
            diff = 10;
            data = {
                title: "USERS",
                isMoney: false,
                link: "See all users",
                icon: (
                    <FontAwesomeIcon
                        icon={faUser}
                        className="icon"
                        style={{ color: "crimson", backgroundColor: "rgba(255, 0, 0, 0.2)" }}
                    />
                ),
            };
            break;
        case "order":
            targetAmount = 320;
            diff = -5;
            data = {
                title: "ORDERS",
                isMoney: false,
                link: "View all orders",
                icon: (
                    <FontAwesomeIcon
                        icon={faShoppingCart}
                        className="icon"
                        style={{ color: "goldenrod", backgroundColor: "rgba(218, 165, 32, 0.2)" }}
                    />
                ),
            };
            break;
        case "earning":
            targetAmount = 3723;
            diff = 20;
            data = {
                title: "EARNINGS",
                isMoney: true,
                link: "View net earnings",
                icon: (
                    <FontAwesomeIcon
                        icon={faMoneyBillWave}
                        className="icon"
                        style={{ color: "green", backgroundColor: "rgba(0, 128, 0, 0.2)" }}
                    />
                ),
            };
            break;
        case "balance":
            targetAmount = 2450;
            diff = 15;
            data = {
                title: "BALANCE",
                isMoney: true,
                link: "See details",
                icon: (
                    <FontAwesomeIcon
                        icon={faWallet}
                        className="icon"
                        style={{ color: "purple", backgroundColor: "rgba(128, 0, 128, 0.2)" }}
                    />
                ),
            };
            break;
        default:
            break;
    }

    const [amount, setAmount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const steps = 60;
        const increment = targetAmount / steps;
        const intervalTime = duration / steps;

        const interval = setInterval(() => {
            start += increment;
            if (start >= targetAmount) {
                start = targetAmount;
                clearInterval(interval);
            }
            setAmount(Math.round(start));
        }, intervalTime);

        return () => clearInterval(interval);
    }, [targetAmount]);

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">
                    {data.isMoney && "$"} {amount}
                </span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className={`percentage ${diff >= 0 ? "positive" : "negative"}`}>
                    <FontAwesomeIcon icon={diff >= 0 ? faArrowUp : faArrowDown} />
                    {diff}%
                </div>
                {data.icon}
            </div>
        </div>
    );
};

export default Widget;

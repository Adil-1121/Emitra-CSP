import React, { useState, useRef } from "react";
import "./dateFilter.scss";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

const DateFilter = ({ onDateChange }) => {
    const filterOptions = [
        { label: "Today", value: "Today" },
        { label: "Yesterday", value: "Yesterday" },
        { label: "This Week", value: "This Week" },
        { label: "Last Week", value: "Last Week" },
        { label: "This Month", value: "This Month" },
        { label: "Last Month", value: "Last Month" },
        { label: "This Quarter", value: "This Quarter" },
        { label: "Last Quarter", value: "Last Quarter" },
        { label: "This Year", value: "This Year" },
        { label: "Last Year", value: "Last Year" }
    ];

    const [selectedOption, setSelectedOption] = useState(filterOptions[5]); // Last Month
    const [fromDate, setFromDate] = useState(dayjs("2025-08-01").toDate());
    const [toDate, setToDate] = useState(dayjs("2025-08-31").toDate());
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef(null);

    const handleOptionChange = (e) => {
        const value = e.value;
        setSelectedOption(value);

        let newFrom = dayjs("2025-09-01");
        let newTo = dayjs("2025-09-22");

        if (value.value === "Last Month") {
            newFrom = dayjs("2025-08-01");
            newTo = dayjs("2025-08-31");
        }
        setFromDate(newFrom.toDate());
        setToDate(newTo.toDate());

        onDateChange && onDateChange({
            from: newFrom.format("DD/MMM/YYYY"),
            to: newTo.format("DD/MMM/YYYY")
        });
    };

    const selectedOptionTemplate = (option, props) => {
        if (option) return <div>{option.label}</div>;
        return <span>{props.placeholder}</span>;
    };

    const optionTemplate = (option) => {
        return <div>{option.label}</div>;
    };

    return (
        <div className="dateFilterContainer">
            <div className="selectWrapper">
                <Dropdown
                    value={selectedOption}
                    options={filterOptions}
                    onChange={handleOptionChange}
                    optionLabel="label"
                    placeholder="Filter By"
                    className="p-dropdown-sm"
                    style={{ width: "100%" }}
                    valueTemplate={selectedOptionTemplate}
                    itemTemplate={optionTemplate}
                    filter
                    filterPlaceholder="Search..."
                />
            </div>

            <div className="dateBox">
                <span>{dayjs(fromDate).format("DD/MMM/YYYY")} – {dayjs(toDate).format("DD/MMM/YYYY")}</span>
                <div className="calendarWrapper">
                    <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="calendarIcon"
                        onClick={() => setShowCalendar(!showCalendar)}
                    />
                    {showCalendar && (
                        <div className="calendarPopup">
                            <Calendar
                                value={[fromDate, toDate]}
                                onChange={(e) => {
                                    setFromDate(e.value[0]);
                                    setToDate(e.value[1]);
                                    onDateChange && onDateChange({
                                        from: dayjs(e.value[0]).format("DD/MMM/YYYY"),
                                        to: dayjs(e.value[1]).format("DD/MMM/YYYY")
                                    });
                                }}
                                selectionMode="range"
                                inline
                                ref={calendarRef}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DateFilter;

export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "user",
        headerName: "User",
        width: 230,
        body: (rowData) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={rowData.img} alt="avatar" />
                    {rowData.userName}
                </div>
            );
        },
    },
    { field: "email", headerName: "Email", width: 230 },
    { field: "date", headerName: "Joined", width: 100 },
    {
        field: "status",
        headerName: "Status",
        width: 160,
        align: "center",
        body: (rowData) => {
            return <div className={`cellWithStatus ${rowData.status}`}>{rowData.status}</div>;
        },
    },
];

export const userRows = [
    {
        id: 1,
        userName: "Ahmed",
        img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
        status: "active",
        email: "ahmed@example.com",
        date: "2022-01-15",
    },
    {
        id: 2,
        userName: "Omar",
        img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
        status: "active",
        email: "omar@example.com",
        date: "2021-12-10",
    },
    {
        id: 3,
        userName: "Yusuf",
        img: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
        status: "inactive",
        email: "yusuf@example.com",
        date: "2020-07-21",
    },
    {
        id: 4,
        userName: "Hassan",
        img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
        status: "active",
        email: "hassan@example.com",
        date: "2023-03-03",
    },
    {
        id: 5,
        userName: "Bilal",
        img: "https://images.pexels.com/photos/146421/pexels-photo-146421.jpeg",
        status: "pending",
        email: "bilal@example.com",
        date: "2023-11-19",
    },
    {
        id: 6,
        userName: "Imran",
        img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
        status: "inactive",
        email: "imran@example.com",
        date: "2019-06-30",
    },
    {
        id: 7,
        userName: "Salman",
        img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
        status: "pending",
        email: "salman@example.com",
        date: "2020-02-28",
    },
    {
        id: 8,
        userName: "Zayd",
        img: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        status: "active",
        email: "zayd@example.com",
        date: "2022-09-12",
    },
    {
        id: 9,
        userName: "Khalid",
        img: "https://images.pexels.com/photos/2379003/pexels-photo-2379003.jpeg",
        status: "inactive",
        email: "khalid@example.com",
        date: "2021-01-20",
    },
    {
        id: 10,
        userName: "Tariq",
        img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
        status: "active",
        email: "tariq@example.com",
        date: "2023-05-09",
    },
];



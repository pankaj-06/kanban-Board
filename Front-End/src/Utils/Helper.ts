

export const setTitle = (title: string) => {
    document.title = title;
}


export const statusColor: any = {
    Backlog: "#b39ddb",
    Todo: "#ff9800",
    Ongoing: "#ffcc80",
    Done: '#69f0ae'
}

export const prioritiesArr = [
    { lable: "High", value: "high" },
    { lable: "Medium", value: "medium" },
    { lable: "Low", value: "low" }
];

export const stagesArray = [
    { lable: "Backlog", value: "0" },
    { lable: "Todo", value: "1" },
    { lable: "Ongoing", value: "2" },
    { lable: "Done", value: "3" },
];

export const getStageName = (stage: 0 | 1 | 2 | 3) => {
    switch (stage) {
        case 0:
            return "Backlog";
        case 1:
            return "Todo";
        case 2:
            return "Ongoing"
        case 3:
            return "Done"
    }
}


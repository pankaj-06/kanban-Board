import { Box, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Loader from "../../Components/loader/loader";
import { setTitle, statusColor } from "../../Utils/Helper";
import './dashboard.css';

type TaksStatus = "BACKLOG" | "TODO" | "ONGOING" | "DONE"


const Dashboard = () => {
  setTitle("Dashboard");
  const [loading, isLoading] = useState(false);

  const numberArr: any = [
    { status: "DONE", taskName: "123" },
    { status: "ONGOING", taskName: "9876" },
    { status: "BACKLOG", taskName: "4657" },
    { status: "TODO", taskName: "4657" },
    { status: "DONE", taskName: "123" },
    { status: "ONGOING", taskName: "9876" },
    { status: "BACKLOG", taskName: "4657" },
    { status: "TODO", taskName: "4657" },
  ];





  const getTaskStatusBox = (taskDetailsArr: { status: TaksStatus, taskName: string }[], filterByStatusDone: boolean) => {
    const filteredArr = filterByStatusDone ? taskDetailsArr.filter((val) => val.status === "DONE") : taskDetailsArr.filter((val) => val.status !== "DONE");
    return filteredArr.map((taskDetails, idx: number) => {
      return (
        <div key={idx} className="task-status-box">
          {taskDetails.taskName}
          {!filterByStatusDone && <span className="task-status" style={{ backgroundColor: statusColor[taskDetails.status] }} >{taskDetails.status}</span>}
        </div>
      )
    })
  }
  return (
    <Container component="div" maxWidth="lg" className="dashboard-container" >
      <div className='dashboard-child-1'>
        <Typography component="h1" variant="h6" >
          Total Task : {numberArr.length}
        </Typography>
      </div>
      <Grid container className='dashboard-child-2'>
        <Grid item xs={12} md={6} sm={6}>
          <div className="task-conatiner">
            <div className="task-container-header">
              Completed Task's
            </div>
            <div className="task-container-body">
              {getTaskStatusBox(numberArr, true)}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <div className="task-conatiner">
            <div className="task-container-header">
              Pending Task's
            </div>
            <div className="task-container-body">
              {getTaskStatusBox(numberArr, false)}
            </div>
          </div>
        </Grid>
      </Grid>
      {loading && <Loader />}
    </Container>
  )
};

export default Dashboard;
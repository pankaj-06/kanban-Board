import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { getApiCall } from "../../Api/service";
import { DONE, getTasks } from "../../AppConfig";
import Loader from "../../Components/loader/loader";
import { ITaskDetails, setTasksAction } from "../../Redux/Actions/TaskActions";
import { RootState } from "../../Redux/Store";
import { getStageName, setTitle, stageColor } from "../../Utils/Helper";
import './dashboard.css';



const Dashboard = () => {
  setTitle("Dashboard");
  const [loading, isLoading] = useState(true);
  const { addToast } = useToasts();
  //Redux Hooks
  const dispatch = useDispatch();
  const tasksData: ITaskDetails[] | undefined = useSelector((state: RootState) => state.taskReducer.tasks);

  useEffect(() => {
    if (!tasksData) {
      getApiCall(getTasks).then((res) => {
        if (res.data) {
          isLoading(false);
          dispatch(setTasksAction(res.data));
        }
      }).catch((err) => {
        isLoading(false);
        addToast(err.message, { appearance: "error" });
      });
    }
    isLoading(false);
  }, [tasksData]);


  const getTaskStatusBox = (taskDetailsArr: ITaskDetails[] = [], filterByStatusDone: boolean) => {
    const filteredArr = filterByStatusDone ? taskDetailsArr.filter((val) => val.stage === DONE) : taskDetailsArr.filter((val) => val.stage !== DONE);
    return filteredArr.map((taskDetails, idx: number) => {
      const styleObj = { backgroundColor: stageColor[getStageName(taskDetails.stage)], justifyContent: filterByStatusDone ? "center" : "space-between" };
      return (
        <div key={idx} className="task-status-box" style={styleObj}>
          <div style={{ marginLeft: "50px" }}>
            {taskDetails.taskName}
          </div>
          {
            !filterByStatusDone && (
              <div className="task-stage-box" >{getStageName(taskDetails.stage)}</div>
            )
          }
        </div>
      )
    })
  }
  return (
    <Container component="div" maxWidth="lg" className="dashboard-container" >
      <div className='dashboard-child-1'>
        <Typography component="h1" variant="h6"  >
          {tasksData ? `Total Task : ${tasksData.length}` : null}
        </Typography>
      </div>
      <Grid container className='dashboard-child-2'>
        <Grid item xs={12} md={6} sm={6}>
          <div className="task-conatiner">
            <div className="task-container-header">
              Completed Task's
            </div>
            <div className="task-container-body">
              {getTaskStatusBox(tasksData, true)}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <div className="task-conatiner">
            <div className="task-container-header">
              Pending Task's
            </div>
            <div className="task-container-body">
              {getTaskStatusBox(tasksData, false)}
            </div>
          </div>
        </Grid>
      </Grid>
      {loading && <Loader />}
    </Container>
  )
};

export default Dashboard;
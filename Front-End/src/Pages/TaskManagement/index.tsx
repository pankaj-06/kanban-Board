import { Container, Grid } from "@mui/material";
import { useState } from "react";
import Loader from "../../Components/loader/loader";
import { setTitle, statusColor } from "../../Utils/Helper";
import './task-management.css';

const TaskManagement = () => {
    setTitle("Task Management");
    const [loading, isLoading] = useState(false);

    return (
        <Container component="div" maxWidth="lg" className="task-management-container" >
            <div className='task-management-child-1'>
                Add Task
            </div>
            <Grid container className='task-management-child-2'>
                <Grid item xs={3} md={3} sm={3}>
                    <div className="task-conatiner">
                        <div className="task-container-header" style={{backgroundColor:statusColor.BACKLOG}}>
                            Backlog Task's
                        </div>
                        <div className="task-container-body">
                            {/* {getTaskStatusBox(numberArr, true)} */}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3} md={3} sm={3}>
                    <div className="task-conatiner">
                        <div className="task-container-header" style={{backgroundColor:statusColor.TODO}}>
                            Todo Task's
                        </div>
                        <div className="task-container-body">
                            {/* {getTaskStatusBox(numberArr, false)} */}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3} md={3} sm={3}>
                    <div className="task-conatiner">
                        <div className="task-container-header" style={{backgroundColor:statusColor.ONGOING}}>
                            Ongoing Task's
                        </div>
                        <div className="task-container-body">
                            {/* {getTaskStatusBox(numberArr, false)} */}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3} md={3} sm={3}>
                    <div className="task-conatiner">
                        <div className="task-container-header" style={{backgroundColor:statusColor.DONE}}>
                            Completed Task's
                        </div>
                        <div className="task-container-body">
                            {/* {getTaskStatusBox(numberArr, false)} */}
                        </div>
                    </div>
                </Grid>
            </Grid>
            {loading && <Loader />}
        </Container>
    )
};

export default TaskManagement;
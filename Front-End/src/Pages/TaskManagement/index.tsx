import { useEffect, useState } from "react";
import Loader from "../../Components/loader/loader";
import { getStageName, prioritiesArr, setTitle, stagesArray, statusColor } from "../../Utils/Helper";
import CloseIcon from '@mui/icons-material/Close';
import './task-management.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SetRequiredLable from "../../Components/SetRequiredLable";
import BasicSelect from "../../Components/basicSelect";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { messagesObject } from "../../Utils/Messages";
import { RegularExpressions } from "../../Utils/Regex";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import { deleteApiCall, getApiCall, postApiCall, updateApiCall } from "../../Api/service";
import { BACKLOG, taskApi, DONE, getTasks, ONGOING, TODO } from "../../AppConfig";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { createTaskAction, deleteTaskAction, ITaskDetails, setTasksAction, Stage, updateTaskAction } from "../../Redux/Actions/TaskActions";
import { RootState } from "../../Redux/Store";
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormHelperText,
    Grid,
    IconButton,
    styled,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
//Icons
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BorderColorIcon from '@mui/icons-material/BorderColor';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose?: () => void;
}

const taskInitState: ITaskDetails = {
    taskName: "",
    deadline: "",
    priority: "",
    stage: 0
}

const TaskManagement = () => {
    setTitle("Task Management");
    const { addToast } = useToasts();
    const [loading, isLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openConfirmationDialog, setConfirmationDialog] = useState(false);
    const dateFormat = "MM/dd/yyyy";
    const [state, setState] = useState<ITaskDetails>({ ...taskInitState });
    const [errorState, setErrorState] = useState<any>({
        taskName: "",
        priority: "",
        deadline: ""
    });
    const [invalidDate, setInvalidDate] = useState('');
    const [selectedTaskId, setSelectedId] = useState("");
    const [popUpType, setPopupType] = useState<"CREATE" | "UPDATE">();
    //Redux Hooks
    const dispatch = useDispatch();
    const tasks: ITaskDetails[] = useSelector((state: RootState) => state.taskReducer.tasks);

    useEffect(() => {
        getApiCall(getTasks).then((res) => {
            if (res.data) {
                isLoading(false);
                const tasksArray: any = [...tasks, res.data];
                const finaleTaskArr: ITaskDetails[] = Array.from(new Set(tasksArray))[0] as ITaskDetails[];
                dispatch(setTasksAction(finaleTaskArr));
            }
        }).catch((err) => {
            isLoading(false);
            addToast(err.message, { appearance: "error" });
        });
    }, []);

    const onChangeHandler = (e: any) => {
        const newStateObj: any = { ...state, [e.target.name]: e.target.value };
        const newErrorStateObj: any = { ...errorState, [e.target.name]: "" };
        setState(newStateObj);
        setErrorState(newErrorStateObj);
    }

    const onDateSelect = (date: any) => {
        setState({ ...state, deadline: date });
        setErrorState({ ...errorState, deadline: "" });
    }


    useEffect(() => {
        validateDatePicker()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.deadline]);


    const validateDatePicker = () => {
        const date = state.deadline;
        if (date !== '') {
            if (date === null) {
                setInvalidDate(messagesObject.requiredMsg);
            } else if (
                date!.toString() === 'Invalid Date' ||
                !moment(date).format(dateFormat.toUpperCase()).match(RegularExpressions.MM_DD_YYYY)
            ) {
                setInvalidDate(messagesObject.inValidDate);
            } else if (date.toString() !== 'Invalid Date') {
                setInvalidDate('');
            }
        }
    }

    const onSubmitCreateTask = (e: any) => {
        e.preventDefault();
        isLoading(true);
        if (state.taskName && state.priority && state.deadline && !invalidDate) {
            const payload: ITaskDetails = {
                taskName: state.taskName,
                priority: state.priority,
                stage: +state.stage,
                deadline: moment(state.deadline).format("MM/DD/yyyy")
            }

            if (popUpType === "CREATE") {
                payload.id = uuidv4();
                postApiCall(taskApi, payload).then((res) => {
                    if (res.statusText === "Created") {
                        isLoading(false);
                        dispatch(createTaskAction(payload));
                        setState({ ...taskInitState });
                        handleCloseTaskPopup();
                        addToast(messagesObject.taskCreated, { appearance: "success" });
                    }
                }).catch((err) => {
                    isLoading(false);
                    addToast(messagesObject.contactAdmin, { appearance: "error" });
                })
            } else {
                payload.id = selectedTaskId;
                updateTask(payload);
            }

        } else {
            isLoading(false);
            const newErrorObj: any = {};
            const requiredMsg = messagesObject.requiredMsg
            Object.entries(state).map(([key, value]) => {
                if (!value)
                    newErrorObj[key] = requiredMsg;
            });
            setErrorState({ ...errorState, ...newErrorObj });
        }
    }


    //This function is used for update api call for update task in DB.
    const updateTask = (payload: ITaskDetails) => {
        const updateTaskUrl = `${taskApi}/${payload.id}`;
        updateApiCall(updateTaskUrl, payload).then((res) => {
            isLoading(false);
            dispatch(updateTaskAction(payload));
            setState({ ...taskInitState });
            handleCloseTaskPopup();
            addToast(messagesObject.taskUpdated, { appearance: "success" });
        }).catch((err) => {
            isLoading(false);
            addToast(messagesObject.contactAdmin, { appearance: "error" });
        })
    }

    const handleOpenTaskPopup = () => {
        setOpen(true);
    };
    const handleCloseTaskPopup = () => {
        setOpen(false);
    };

    const handleClickOpenConfirmationPopup = (id: string) => {
        setConfirmationDialog(true);
        setSelectedId(id);
    };
    const handleCloseConfirmationPopup = () => {
        setConfirmationDialog(false);
    };


    const BootstrapDialogTitle = (props: DialogTitleProps) => {
        const { children, onClose, ...other } = props;
        return (
            <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    };


    const onDeleteTaskHandler = () => {
        isLoading(true);
        handleCloseConfirmationPopup();
        const deleteTaskUrl = `${taskApi}/${selectedTaskId}`;
        deleteApiCall(deleteTaskUrl).then((res) => {
            isLoading(false);
            dispatch(deleteTaskAction(selectedTaskId));
            addToast(messagesObject.deletedTask, { appearance: "success" });
        }).catch((err) => {
            isLoading(false);
            addToast(err.message, { appearance: "error" });
        })
    }

    const onEditTaskHandler = (taskObject: ITaskDetails) => {
        setPopupType("UPDATE");
        setState({
            taskName: taskObject.taskName,
            deadline: taskObject.deadline,
            priority: taskObject.priority,
            stage: taskObject.stage
        })
        setSelectedId(taskObject.id!);
        handleOpenTaskPopup();
    }

    const backForwardHandler = (taskObject: ITaskDetails, type: "PREVIOUS" | "NEXT") => {
        const newPayload: ITaskDetails = {
            ...taskObject,
            stage: type === "PREVIOUS" ? taskObject.stage - 1 : taskObject.stage + 1
        }
        updateTask(newPayload);
    }

    const taskCard = (tasksArray: ITaskDetails[] = [], stage: Stage) => {
        const filteredArr = tasksArray.filter((taskObj) => taskObj.stage === stage);
        return filteredArr.map((taskObj: ITaskDetails) => (
            <div key={taskObj.id}
                className="task-card"
                style={{ backgroundColor: statusColor[getStageName(taskObj.stage)] }}
            >
                <div className="task-card-child-1">
                    <div>
                        {taskObj.taskName}
                    </div>
                    <div>
                        {taskObj.deadline}
                    </div>
                </div>
                <div className="task-card-child-2">
                    <Tooltip title="Back">
                        <IconButton
                            disabled={taskObj.stage === BACKLOG ? true : false}
                            aria-label="back"
                            color="inherit"
                            size="small"
                            onClick={() => backForwardHandler(taskObj, "PREVIOUS")}>
                            <ArrowBackIosIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton
                            aria-label="edit"
                            color="inherit"
                            size="small"
                            onClick={() => onEditTaskHandler(taskObj)}>
                            <BorderColorIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            aria-label="delete"
                            color="inherit"
                            size="small"
                            onClick={() => handleClickOpenConfirmationPopup(taskObj.id!)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Forward">
                        <IconButton
                            disabled={taskObj.stage === DONE ? true : false}
                            aria-label="forward"
                            color="inherit"
                            size="small"
                            onClick={() => backForwardHandler(taskObj, "NEXT")}>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        ))
    }

    return (
        <Container component="div" maxWidth="lg" className="task-management-container" >
            <div className='task-management-child-1'>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{ width: "200px" }}
                    onClick={() => {
                        setPopupType("CREATE");
                        handleOpenTaskPopup();
                    }}
                >
                    Add Task
                </Button>
            </div>
            <Grid container className='task-management-child-2'>
                <Grid item lg={3} md={6} sm={12}>
                    <div className="task-conatiner">
                        <div className="task-container-header" style={{ backgroundColor: statusColor.Backlog }}>
                            Backlog Task's
                        </div>
                        <div className="task-container-body">
                            {taskCard(tasks, BACKLOG)}
                        </div>
                    </div>
                </Grid>
                <Grid item lg={3} md={6} sm={12}>
                    <div className="task-conatiner">
                        <div className="task-container-header" style={{ backgroundColor: statusColor.Todo }}>
                            Todo Task's
                        </div>
                        <div className="task-container-body">
                            {taskCard(tasks, TODO)}
                        </div>
                    </div>
                </Grid>
                <Grid item lg={3} md={6} sm={12}>
                    <div className="task-conatiner">
                        <div className="task-container-header" style={{ backgroundColor: statusColor.Ongoing }}>
                            Ongoing Task's
                        </div>
                        <div className="task-container-body">
                            {taskCard(tasks, ONGOING)}
                        </div>
                    </div>
                </Grid>
                <Grid item lg={3} md={6} sm={12}>
                    <div className="task-conatiner">
                        <div className="task-container-header" style={{ backgroundColor: statusColor.Done }}>
                            Completed Task's
                        </div>
                        <div className="task-container-body">
                            {taskCard(tasks, DONE)}
                        </div>
                    </div>
                </Grid>
            </Grid>


            {/* Create Task Popup */}
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseTaskPopup}>
                    {popUpType === "CREATE" ? "Create Task" : "Update Task"}
                </BootstrapDialogTitle>
                <DialogContent dividers >
                    <div style={{ width: "350px", padding: "10px" }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} sm={12}>
                                <TextField
                                    name="taskName"
                                    label={SetRequiredLable("Task Name")}
                                    variant="standard"
                                    inputProps={{ maxLength: 30 }}
                                    fullWidth
                                    value={state?.taskName || ""}
                                    onChange={onChangeHandler}
                                    helperText={errorState.taskName}
                                    error={errorState.taskName ? true : false}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} sm={12}>
                                <BasicSelect
                                    name="stage"
                                    label="Stage"
                                    options={stagesArray}
                                    required
                                    value={`${state.stage}`}
                                    onChange={onChangeHandler}
                                    readonly={popUpType === "CREATE" ? true : false}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} sm={12}>
                                <BasicSelect
                                    name="priority"
                                    label="Priority"
                                    options={prioritiesArr}
                                    required
                                    value={state?.priority || ""}
                                    onChange={onChangeHandler}
                                    error={errorState.priority ? true : false}
                                />
                                <FormHelperText style={{ color: "red" }}>
                                    {errorState.priority}
                                </FormHelperText>
                            </Grid>
                            <Grid item xs={12} md={12} sm={12}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label={SetRequiredLable("Due Date")}
                                        value={state.deadline || null}
                                        inputFormat={dateFormat}
                                        disablePast
                                        onChange={onDateSelect}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                size={"small"}
                                                fullWidth
                                                name="deadline"
                                                variant={'standard'}
                                                error={errorState.deadline ? true : invalidDate ? true : false}
                                                helperText={errorState.deadline ? errorState.deadline : invalidDate ? invalidDate : null}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="button"
                        fullWidth
                        autoFocus
                        variant="contained"
                        style={{ width: "150px" }}
                        onClick={onSubmitCreateTask}
                    >
                        {popUpType === "CREATE" ? "Create Task" : "Update Task"}
                    </Button>
                </DialogActions>
                {loading && <Loader />}
            </BootstrapDialog>

            {/* Confirmation Popup */}
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={openConfirmationDialog}
            >
                <BootstrapDialogTitle id="customized-dialog-title" >
                    <div style={{ textAlign: "center" }}>
                        Delete Task
                    </div>
                </BootstrapDialogTitle>
                <DialogContent dividers >
                    <Typography gutterBottom>
                        Are you sure you want to delete this Task?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="button"
                        fullWidth
                        autoFocus
                        variant="contained"
                        style={{ width: "80px" }}
                        onClick={handleCloseConfirmationPopup}
                    >
                        No
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        autoFocus
                        variant="contained"
                        style={{ width: "80px" }}
                        onClick={onDeleteTaskHandler}
                    >
                        Yes
                    </Button>
                </DialogActions>
                {loading && <Loader />}
            </BootstrapDialog>
            {loading && <Loader />}
        </Container>
    )
};

export default TaskManagement;
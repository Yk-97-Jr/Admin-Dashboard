import React, { useState, useEffect, useRef } from "react";
import Radio from "@mui/material/Radio";
import RadioButton from "./components/RadioButton";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    RadioGroup,
    FormControlLabel,
} from "@mui/material";
import Header from "../../Components/Header";
import { tokens } from "../../Theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import img from "../../../public/wp5123300.jpg";
import ColorPicker from "./components/ColorPicker";

const Calendar = () => {
    const [currentEvents, setCurrentEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [bgColor, setBgColor] = useState("");
    const [coloredText, setColoredText] = useState("");
    const [isEventDelete, setIsEventDelete] = useState(false);
    const [selectedEventToDel, setSelectedEventToDel] = useState({});
    const [selectedEventToAdd, setSelectedEventToAdd] = useState({});
    const [selectedEventToEdit, setSelectedEventToEdit] = useState({});
    const [performEditDel, setPerformEditDel] = useState({});
    const [actionOnEvent, setActionOnEvent] = useState(false);
    const [isWeekDay, setIsWeekDay] = useState(false);
    const [isAllDay, setIsAllDay] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editOrDelete, setEditOrDelete] = useState("");
    const calendarRef = useRef(null);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const currentMode = theme.palette.mode;

    useEffect(() => {
        const importCSSBasedOnMode = async (themeMode) => {
            const themeFile =
                themeMode === "light"
                ? "FullCalendarCustomStyleLight.css"
                : "FullCalendarCustomStyleDark.css";
            return import(`./css/${themeFile}?v=${Math.random()}`);
        };

        importCSSBasedOnMode(currentMode);
    }, [currentMode]);

    const formatDate = (date) => {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEventTitle("");
        setEventDescription("");
        setActionOnEvent(false);
        if (isEditing) {
            setIsEditing(false);
        } else {
            setIsEventDelete(false);
        }
    };

    const handleCollapse = (value) => (event, isExpanded) => {
        setIsExpanded(isExpanded ? value : null);
    };

    const handleEventClick = (selected) => {
        setPerformEditDel(selected.event);
        setActionOnEvent(!actionOnEvent);
    };

    const handleEventAdd = () => {
        const calendarApi = selectedEventToAdd.view.calendar;
        calendarApi.unselect();

        if (eventTitle.trim() !== "") {
            const newEvent = {
                id: `${new Date(selectedEventToAdd.start).toISOString()}-${eventTitle}`,
                title: eventTitle,
                description: eventDescription,
                start: selectedEventToAdd.startStr,
                end: selectedEventToAdd.endStr,
                allDay: isAllDay,
                backgroundColor: bgColor,
                borderColor: bgColor,
                textColor: coloredText,
            };

            calendarApi.addEvent(newEvent);
            setCurrentEvents([...currentEvents, newEvent]);
            closeModal();
            setBgColor("");
            setColoredText("");
        }
    };

    const handleEventEdit = () => {
        console.log(bgColor);
        const updatedEvents = currentEvents.map((event) => {
            if (event.id === selectedEventToEdit.id) {
                return {
                    ...event,
                    title: eventTitle || event.title,
                    description: eventDescription || event.description,
                    backgroundColor: bgColor || event.backgroundColor,
                    textColor: coloredText || event.textColor,
                    allDay: isAllDay,
                };
            }
            return event;
        });

        setCurrentEvents(updatedEvents);

        const calendarApi = calendarRef.current.getApi();
        const eventToEdit = calendarApi.getEventById(selectedEventToEdit.id);
        if (eventToEdit) {
            eventToEdit.setProp("title", eventTitle || eventToEdit.title);
            eventToEdit.setProp("description", eventDescription || eventToEdit.description);
            eventToEdit.setProp("backgroundColor", bgColor || eventToEdit.backgroundColor);
            eventToEdit.setProp("borderColor", bgColor || eventToEdit.backgroundColor);
            eventToEdit.setProp("textColor", coloredText || eventToEdit.textColor);
            eventToEdit.setAllDay(isAllDay);
        }

        closeModal();
    };

    const calendarEventDelete = (event) => {
        event.remove();
        const tempEvents = currentEvents.filter((e) => e.id !== event.id);
        setCurrentEvents(tempEvents);
        closeModal();
    };

    const handleEventDrop = (eventDropInfo) => {
        const updatedEvent = {
            ...eventDropInfo.event,
            title: eventDropInfo.event.title,
            description: eventDropInfo.event.extendedProps.description,
            id: eventDropInfo.event.id,
            start: eventDropInfo.event.start,
            end: eventDropInfo.event.end,
        };

        const updatedEvents = currentEvents.map((event) => {
            if (event.id === updatedEvent.id) {
                return updatedEvent;
            } else {
                return event;
            }
        });
        setCurrentEvents(updatedEvents);
    };

    const handleEditDelete = (e) => {
        if (e === "edit") {
            setIsEditing(true);
            openModal(true);
            setSelectedEventToEdit(performEditDel);
        } else {
            setIsEventDelete(true);
            setSelectedEventToDel(performEditDel);
        }
    };

    return (
        <div className="mx-5 space-y-10">
            <Header title={"CALENDAR"} subtitle={"Full Calendar Interactive Page"} />

            <div className="flex justify-between space-x-4 max-h-[46rem] scrollbar-none">
                {/* Events */}
                <Box
                flex="1 1 20%"
                sx={{ position: "relative" }}
                p="15px"
                borderRadius={"4px"}>
                    <div className="flex justify-between items-center">
                        <Typography
                        variant="h4"
                        sx={{ color: colors.blueAccent[200], fontWeight: "bold" }}>
                            {" "}
                            Events{" "}
                        </Typography>

                        <Typography variant="h3" sx={{ color: colors.blueAccent[200] }}>
                            {" "}
                            {currentEvents.length}{" "}
                        </Typography>
                    </div>

                    {/* Event img */}
                    <Box
                        sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${img})`,
                        backgroundSize: "cover",
                        opacity: 0.4,
                        zIndex: -1,
                        }}>
                    </Box>

                    {/* Event list */}
                    <div className="overflow-y-auto scrollbar-none max-h-[42.2rem] mt-2">
                        <List>
                            {currentEvents.length > 0 ? (
                                currentEvents.map((event, index) => (
                                <ListItem
                                key={index}
                                sx={{
                                    backgroundColor: colors.blueAccent[600],
                                    mt: "10px",
                                    borderRadius: "10px",
                                    minHeight: "6rem",
                                }}>
                                    <ListItemText
                                    primary={
                                        //event title and description
                                        <Typography
                                        variant="h5"
                                        sx={{ color: colors.greenAccent[200] }}>
                                            {event.title && event.description && (
                                                <Accordion
                                                expanded={isExpanded === index}
                                                onChange={handleCollapse(index)}
                                                sx={{ maxWidth: "15rem", overflow: "hidden" }}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    sx={{
                                                        backgroundColor: colors.greenAccent[700],
                                                        color: colors.greenAccent[200],
                                                        overflowY: "auto",
                                                        pl: ".5rem",
                                                    }}>
                                                        {event.title}
                                                    </AccordionSummary>

                                                    <AccordionDetails
                                                    sx={{
                                                        backgroundColor: colors.greenAccent[200],
                                                        color: colors.greenAccent[700],
                                                        overflowY: "auto",
                                                        fontWeight: "bold",
                                                    }}>
                                                        {event.description}
                                                    </AccordionDetails>
                                                </Accordion>
                                            )}

                                            {!event.description && (
                                                <Typography
                                                sx={{ maxWidth: "15rem", overflow: "auto" }}>
                                                    {event.title}
                                                </Typography>
                                            )}
                                        </Typography>
                                    }
                                    secondary={
                                        //event date
                                        <Typography
                                        variant="h6"
                                        sx={{
                                            color: colors.blueAccent[200],
                                            fontSize: ".95rem",
                                            fontWeight: "bold",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}>
                                            {formatDate(event.start)}
                                        </Typography>
                                    }
                                    />
                                </ListItem>
                                ))
                            ) : (
                                <Typography
                                variant="h1"
                                sx={{ color: colors.greenAccent[200] }}>
                                    Currently no events are available
                                </Typography>
                            )}
                        </List>
                    </div>
                </Box>

                {/* Full Calendar */}
                <div className="w-full">
                    <FullCalendar
                        ref={calendarRef}
                        height={"46rem"}
                        buttonText={{
                            today: "Today",
                            month: "Month",
                            week: "Week",
                            day: "Day",
                            list: "List",
                        }}
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                            listPlugin,
                        ]}
                        headerToolbar={{
                            left: "prevYear prev today next nextYear",
                            center: "title",
                            right: "dayGridMonth timeGridWeek timeGridDay listMonth",
                        }}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        select={(selected) => {
                            openModal();
                            setSelectedEventToAdd(selected);
                        }}
                        eventClick={(e) => handleEventClick(e)}
                        viewDidMount={(viewType) => {
                            const currentViewType = viewType.view.type;
                            if (currentViewType === "dayGridMonth") {
                                setIsWeekDay(false);
                                setIsAllDay(true);
                            } else {
                                setIsWeekDay(true);
                                setIsAllDay(false);
                            }
                        }}
                        eventDrop={handleEventDrop}
                    />

                    {actionOnEvent && (
                        <Dialog
                        open={actionOnEvent}
                        onClose={closeModal}
                        PaperProps={{
                            sx: {
                                backgroundColor: colors.greenAccent[400],
                                color: colors.greenAccent[800],
                                fontWeight: "bold",
                                fontSize: "1.1rem",
                            }
                        }}>
                            <DialogTitle>
                                <Typography variant="h4">
                                    What do you want to do with "{performEditDel.title}" ?
                                </Typography>
                            </DialogTitle>

                            <DialogContent>
                                <RadioGroup
                                onChange={(e) => 
                                    setTimeout(() => {
                                        handleEditDelete(e.target.value)
                                    }, 90)
                                    }>
                                    <FormControlLabel
                                        value={"edit"}
                                        control={<Radio sx={{
                                            color: '#0061FF',  
                                            scale: '1.2',
                                            '&.Mui-checked': {
                                                color: '#0061FF',
                                            } 
                                        }} />}
                                        label={<Box sx={{fontWeight: 'bold', fontSize: '1rem' }}>EDIT</Box>}
                                    />
                                    <FormControlLabel
                                        value={"delete"}
                                        control={<Radio sx={{ 
                                            color: "#FF1F00", 
                                            scale: '1.2',
                                            '&.Mui-checked': {
                                                color: '#FF1F00'
                                            }
                                        }}/>}
                                        label={<Box sx={{fontWeight: 'bold', fontSize: '1rem' }}>DELETE</Box>}
                                    />
                                </RadioGroup>
                            </DialogContent>
                        </Dialog>
                    )}

                    {isEventDelete && (
                        <Dialog
                        open={isEventDelete}
                        onClose={closeModal}
                        PaperProps={{
                            sx: {
                                backgroundColor: colors.greenAccent[300],
                                color: colors.greenAccent[700],
                                fontWeight: "bold",
                                fontSize: "1.1rem",
                            }
                        }}>
                            <>
                                <DialogContent
                                sx={{ display: "flex", flexDirection: "row", gap: ".5rem" }}>
                                    <Typography fontWeight={"bold"} fontSize="1.1rem">
                                        Are you sure you want to delete
                                    </Typography>

                                    <div className="flex gap-x-1">
                                        <Typography
                                        sx={{
                                            maxWidth: "10rem",
                                            overflowX: "auto",
                                            fontWeight: "bold",
                                            fontSize: "1.1rem",
                                            color: colors.redAccent[600],
                                        }}>
                                            {selectedEventToDel.title}
                                        </Typography>

                                        <Typography fontWeight={"bold"} fontSize="1.1rem">
                                            ?
                                        </Typography>
                                    </div>
                                </DialogContent>

                                <DialogActions sx={{ mx: "1rem" }}>
                                    <Button
                                    onClick={() => (
                                        calendarEventDelete(selectedEventToDel),
                                        setIsEventDelete(false)
                                    )}
                                    sx={{
                                    backgroundColor: colors.redAccent[600],
                                    color: colors.redAccent[200],
                                    ":hover": {
                                        backgroundColor: colors.redAccent[700],
                                    },
                                    }}>
                                        Delete
                                    </Button>

                                    <Button
                                    onClick={() => (setIsEventDelete(false), closeModal())}
                                    sx={{
                                        backgroundColor: colors.greenAccent[700],
                                        color: colors.greenAccent[200],
                                        ":hover": {
                                            backgroundColor: colors.greenAccent[800],
                                        }
                                    }}>
                                        Cancel
                                    </Button>

                                    <Button
                                    onClick={() => (
                                        setIsEventDelete(false),
                                        setActionOnEvent(true),
                                        setEditOrDelete("")
                                    )}
                                    sx={{
                                    backgroundColor: colors.blueAccent[700],
                                    color: colors.blueAccent[200],
                                    ":hover": {
                                        backgroundColor: colors.blueAccent[800],
                                    },
                                    }}>
                                        Back
                                    </Button>
                                </DialogActions>
                            </>
                        </Dialog>
                    )}
                </div>
            </div>

            {/* Event Title Description Input */}
            <Dialog
            PaperProps={{ sx: {backgroundColor: colors.greenAccent[700]} }}
            open={isModalOpen}
            onClose={closeModal}>
                <div className="flex justify-between">
                    <DialogTitle
                    sx={{
                        color: colors.greenAccent[200],
                        fontWeight: "bold",
                        fontSize: "1.7rem",
                    }}>
                        {isEditing ? "Edit event" : "Enter Event"}
                    </DialogTitle>

                    {isEditing && <DialogTitle
                    sx={{
                        backgroundColor: bgColor,
                        color: coloredText,
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        display: 'flex',
                        my: 'auto',
                        mr: '.3rem',
                        borderRadius: '10px', 
                    }}>
                        {bgColor && 'Selected Color'}
                    </DialogTitle>}
                </div>

                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="eventTitle"
                        label="Event Title"
                        type="text"
                        fullWidth
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        sx={{
                            backgroundColor: colors.greenAccent[800],
                            color: colors.blueAccent[200],
                            borderRadius: "4px",
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: colors.blueAccent[200],
                                border: "none",
                                fontSize: "1rem",
                            },
                        }}
                        InputLabelProps={{ sx: {color: colors.greenAccent[200]} }}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="eventDescription"
                        label="Event Description"
                        type="text"
                        fullWidth
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        sx={{
                            backgroundColor: colors.greenAccent[800],
                            color: colors.blueAccent[200],
                            borderRadius: "4px",
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: colors.blueAccent[200],
                                border: "none",
                                fontSize: "1rem",
                            },
                        }}
                        InputLabelProps={{ sx: {color: colors.greenAccent[200]} }}
                    />
                </DialogContent>

                {isWeekDay && (
                    <DialogActions
                    sx={{
                        display: "flex",
                        lignItems: "center",
                        justifyContent: "center",
                        paddingX: "1.5rem",
                    }}>
                        <RadioButton
                            isAllDay={isAllDay}
                            setIsAllDay={setIsAllDay}
                            label1={"ALL DAY EVENT"}
                            label2={"TIME SPANNED EVENT"}
                        />
                    </DialogActions>
                )}

                <DialogActions sx={{ display: "flex", flexDirection: "column" }}>
                    <div className="w-full mx-4 mb-2 flex items-center justify-between">
                        <ColorPicker bgColor={bgColor} setBgColor={setBgColor} setColoredText={setColoredText} coloredText={coloredText}/>

                        <div className="space-x-2">
                            <Button
                            variant="contained"
                            onClick={() => isEditing ? handleEventEdit() : handleEventAdd()}
                            sx={{
                                fontWeight: "bold",
                                color: colors.greenAccent[100],
                                backgroundColor: colors.blueAccent[700],
                                "&:hover": {
                                    backgroundColor: colors.greenAccent[300],
                                    color: colors.greenAccent[700],
                                    boxShadow: "none",
                                },
                            }}>
                                {isEditing ? "Save" : "Add"}
                            </Button>

                            <Button
                            variant="contained"
                            onClick={closeModal}
                            sx={{
                                fontWeight: "bold",
                                color: colors.greenAccent[100],
                                backgroundColor: colors.blueAccent[700],
                                "&:hover": {
                                    backgroundColor: colors.greenAccent[300],
                                    color: colors.greenAccent[700],
                                    boxShadow: "none",
                                },
                            }}>
                                Cancel
                            </Button>

                            {isEditing && (
                                <Button
                                variant="contained"
                                onClick={() => (closeModal(), setActionOnEvent(true))}
                                sx={{
                                    fontWeight: "bold",
                                    color: colors.greenAccent[100],
                                    backgroundColor: colors.blueAccent[700],
                                    "&:hover": {
                                        backgroundColor: colors.greenAccent[300],
                                        color: colors.greenAccent[700],
                                        boxShadow: "none",
                                    },
                                }}>
                                    Back
                                </Button>
                            )}
                        </div>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Calendar;
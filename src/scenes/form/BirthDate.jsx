import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs/index";
import {
  pickersLayoutClasses,
  PickersLayoutContentWrapper,
  PickersLayoutRoot,
  usePickerLayout,
} from "@mui/x-date-pickers/PickersLayout";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DatePickerToolbar } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { useTheme } from "@mui/material";
import { tokens } from "../../Theme";
import { createContext } from "react";

function LayoutWithKeyboardView(props) {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const { value, onChange } = props;
    const [showKeyboardView, setShowKeyboardView] = React.useState(false);

    const { toolbar, tabs, content, actionBar } = usePickerLayout({
        ...props,
        slotProps: {
            ...props.slotProps,
            toolbar: {
                ...props.slotProps?.toolbar,
                // @ts-ignore
                showKeyboardViewSwitch: props.wrapperVariant === "mobile",
                showKeyboardView,
                setShowKeyboardView,
            },
        },
    });

    return (
        <PickersLayoutRoot ownerState={props} sx={{backgroundColor: colors.greenAccent[800]}}>
            {toolbar}
            {actionBar}
            <PickersLayoutContentWrapper 
            className={pickersLayoutClasses.contentWrapper} 
            sx={{
                backgroundColor: colors.greenAccent[700],
                color: colors.greenAccent[200],
                fontSize: '1rem',
                borderTop: "1px solid ",
                borderBottom: "1px solid ",
            }}>
                {tabs}
                {showKeyboardView ? (
                    <Box sx={{ mx: 3, my: 2, width: '17rem' }}>
                        <DateField
                            value={value}
                            onChange={onChange}
                            sx={{ width: "100%" }}
                        />
                    </Box>
                ) : (
                    content
                )}
            </PickersLayoutContentWrapper>
        </PickersLayoutRoot>
    );
}

function ToolbarWithKeyboardViewSwitch(props) {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const {
        showKeyboardViewSwitch,
        showKeyboardView,
        setShowKeyboardView,
        ...other
    } = props;

    if (showKeyboardViewSwitch) {
        return (
            <Stack
            spacing={2}
            direction={other.isLandscape ? "column" : "row"}
            alignItems="center"
            sx={
                other.isLandscape
                ? {
                    gridColumn: 1,
                    gridRow: "1 / 3", 
                }
                : { 
                    gridColumn: "1 / 4", 
                    gridRow: 1, 
                    pr: 2, 
                }
            }>
                <DatePickerToolbar {...other} 
                    sx={{ 
                        flex: "1 1 100%", 
                        color: colors.greenAccent[300],
                    }}
                />

                <IconButton
                color="inherit"
                onClick={() => setShowKeyboardView((prev) => !prev)}
                sx={{
                    backgroundColor: colors.greenAccent[400],
                    color: colors.greenAccent[800],
                    ':hover': {backgroundColor: colors.greenAccent[200]}
                }}>
                    {showKeyboardView ? <CalendarMonthIcon /> : <ModeEditIcon />}
                </IconButton>
            </Stack>
        );
    }

    return <DatePickerToolbar {...other} />;
}

export default function BirthDate({onDateChange}) {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
                onChange={(date) => onDateChange(date)}
                sx={{
                    backgroundColor: colors.blueAccent[800],
                    color: colors.blueAccent[200],
                    border: 'none',
                    borderRadius: '5px',
                    width: '100%',
                }}
                slots={{
                    layout: LayoutWithKeyboardView,
                    toolbar: ToolbarWithKeyboardViewSwitch,
                }}
            />
        </LocalizationProvider>
    );
}

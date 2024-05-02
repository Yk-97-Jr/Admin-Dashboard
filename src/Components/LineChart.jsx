import {
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { tokens } from "../Theme";
import { mockLineData as data, randomLineData } from "../data/mockData";
import { ResponsiveLine } from "@nivo/line";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const LineChart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const currentMode = theme.palette.mode;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [colorScheme, setColorScheme] = useState("nivo");
    const [lineWidth, setLineWidth] = useState(2);
    const [isAreaEnabled, setIsAreaEnabled] = useState(true);
    const [areaOpacity, setAreaOpacity] = useState(1);
    const [enablePoints, setEnablePoints] = useState(true);
    const [pointSize, setPointSize] = useState(10);
    const [pointBorderWidth, setPointBorderWidth] = useState(1);
    const [enablePointLabel, setEnablePointLabel] = useState(isDashboard ? false : true);
    const [fixCurve, setFixCurve] = useState("catmullRom");
    const [anchorPosition, setAnchorPosition] = useState("bottom-right");
    const [baselineValue, setBaselineValue] = useState(0);
    const [isCrosshairEnabled, setIsCrosshairEnabled] = useState(true);
    const [changeData, setChangeData] = useState(false);

    const sliderSpace = 2;

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const menuItem = [
        { value: "basis" },
        { value: "cardinal" },
        { value: "catmullRom" },
        { value: "linear" },
        { value: "monotoneX" },
        { value: "monotoneY" },
        { value: "natural" },
        { value: "step" },
        { value: "stepBefore" },
        { value: "stepAfter" },
    ];

    const legendPositionData = [
        { value: "top-right", title: "Top Right" },
        { value: "right", title: "Right" },
        { value: "bottom-right", title: "Bottom Right" },
    ];

    const lineColorData = [
        { color: "nivo", name: "Nivo" },
        { color: "category10", name: "Category 10" },
        { color: "accent", name: "Accent" },
        { color: "dark2", name: "Dark 2" },
        { color: "paired", name: "Paired" },
        { color: "pastel1", name: "Pastel 1" },
        { color: "pastel2", name: "Pastel 2" },
        { color: "set1", name: "Set 1" },
        { color: "set2", name: "Set 2" },
        { color: "set3", name: "Set 3" },
        { color: "brown_blueGreen", name: "Brown → Blue Green" },
        { color: "purpleRed_green", name: "Purple Red → Green" },
        { color: "pink_yellowGreen", name: "Pink → Yellow Green" },
        { color: "purple_orange", name: "Purple → Orange" },
        { color: "red_blue", name: "Red → Blue" },
        { color: "red_yellow_blue", name: "Red → Yellow → Blue" },
        { color: "red_yellow_green", name: "Red → Yellow → Green" },
        { color: "spectral", name: "Spectral" },
        { color: "blues", name: "Blues" },
        { color: "greens", name: "Greens" },
        { color: "oranges", name: "Oranges" },
        { color: "purples", name: "Purples" },
        { color: "reds", name: "Reds" },
        { color: "purple_red", name: "Purple → Red" },
        { color: "red_purple", name: "Red → Purple" },
        { color: "purple_blue_green", name: "Purple → Blue → Green" },
        { color: "yellow_green_blue", name: "Yellow → Green → Blue" },
        { color: "yellow_orange_red", name: "Yellow → Orange → Red" },
        { color: "orange_red", name: "Orange → Red" },
    ];

    const CustomTooltip = ({ data }) => {
        return (
            <Box
            sx={{
                px: "1.5rem",
                py: "1rem",
                backgroundColor: colors.primary[500],
                border: "2px solid",
                color: data.point.serieColor,
                borderColor: data.point.serieColor,
            }}>
                <p>ID: {data.point.serieId}</p>
                <p>Value: {data.point.index}</p>
                <p>Color: {data.point.serieColor}</p>
                <p>Border Color: {data.point.serieColor}</p>
            </Box>
        );
    };

    useEffect(() => {
        if (changeData) {
            randomLineData();
            setChangeData(false);
        }
    }, [changeData]);

    const handleGenerateClick = () => {
        setChangeData(true);
    };

    const handleResetAll = () => {
        setIsModalOpen(false);
        setColorScheme("nivo");
        setLineWidth(2);
        setIsAreaEnabled(true);
        setAreaOpacity(1);
        setEnablePoints(true);
        setPointSize(10);
        setPointBorderWidth(1);
        setEnablePointLabel(true);
        setFixCurve("catmullRom");
        setAnchorPosition("bottom-right");
        setBaselineValue(0);
        setIsCrosshairEnabled(true);
        setChangeData(false);
    };

    return (
        <div className={`${isDashboard ? "h-full" : "h-[80vh]"}`}>
            <ResponsiveLine
                data={data}
                theme={{
                    text: {
                        fontSize: 14,
                        fill: "#5712ab",
                        outlineWidth: 2,
                        outlineColor: "transparent",
                    },
                    axis: {
                        domain: {
                            line: { stroke: colors.grey[100] },
                        },
                        legend: {
                            text: {
                                fill: colors.grey[100],
                                fontSize: "1rem",
                            }
                        },
                        ticks: {
                            line: {
                                stroke: colors.grey[100],
                                strokeWidth: 1,
                            },
                            text: { fill: colors.greenAccent[200] },
                        },
                    },
                    legends: {
                        text: {
                            fill: colors.blueAccent[100],
                            fontSize: ".8rem",
                        },
                    },
                    labels: {
                        text: {
                            fontSize: isDashboard ? '.67rem' : '.9rem',
                        }
                    }
                }}
                colors={{ scheme: colorScheme }}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: true,
                    reverse: false,
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 8,
                    tickRotation: 0,
                    legend: isDashboard ? undefined : "transportation",
                    legendOffset: 36,
                    legendPosition: "middle",
                }}
                axisLeft={{
                    orient: "left",
                    tickValues: 5,
                    tickSize: 5,
                    tickPadding: 8,
                    tickRotation: 0,
                    legend: isDashboard ? undefined : "count",
                    legendOffset: -40,
                    legendPosition: "middle",
                }}
                tooltip={(lineData) => <CustomTooltip data={lineData} />}
                curve={fixCurve}
                lineWidth={lineWidth}
                enablePoints={enablePoints}
                enablePointLabel={enablePointLabel}
                enableArea={isAreaEnabled}
                enableCrosshair={isCrosshairEnabled}
                areaBaselineValue={baselineValue}
                areaOpacity={areaOpacity}
                enableGridX={!isDashboard}
                enableGridY={!isDashboard}
                pointSize={pointSize}
                pointColor={{
                    from: "color",
                    modifiers: currentMode === "light" ? [["darker", 2]] : [["darker", 1]],
                }}
                pointBorderWidth={pointBorderWidth}
                pointBorderColor={{
                    from: "serieColor",
                    modifiers: currentMode === "light" ? [["darker", 1]] : [["darker", 2]],
                }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: anchorPosition,
                        direction: "column",
                        justify: false,
                        translateX: 100,
                        translateY: -25,
                        itemsSpacing: 0,
                        itemDirection: "left-to-right",
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: "circle",
                        symbolBorderColor: "rgba(0, 0, 0, .5)",
                        effects: [{
                            on: "hover",
                            style: {
                                itemBackground: "rgba(0, 0, 0, .03)",
                                itemOpacity: 1,
                            },
                        }],
                    },
                ]}
            />

            <div className={`${isDashboard ? "flex items-center justify-center" : ""}`}>
                <div className={`absolute flex items-center ${ isDashboard ? "-top-6 text-[.8rem]" : "" }`}>
                    {!isDashboard && (
                        <div
                        className={`bg-blue-800 text-blue-300 cursor-pointer rounded-full active:scale-95 transition-all font-semibold px-3 py-2 text-[.95rem]`}
                        onClick={handleGenerateClick}>
                            <button>Generate</button>
                        </div>
                    )}

                    <div className="w-[3rem] h-[2rem] flex justify-center items-center cursor-pointer">
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            className={`${isDashboard ? "text-[1rem]" : "text-[1.2rem]"} ${!isDashboard ? "text-blue-300 bg-blue-800" : "text-green-300 bg-green-900" } p-2 rounded-full active:scale-95 transition-all`}
                            onClick={() => setIsModalOpen(!isModalOpen)}
                        />
                    </div>

                    {!isDashboard && (
                        <div
                        className={`bg-blue-800 text-blue-300 cursor-pointer rounded-full active:scale-95 transition-all font-semibold px-3 py-2 text-[.95rem]`}
                        onClick={handleResetAll}>
                            <button>Reset All</button>
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <Dialog
                PaperProps={{
                    sx: {
                        backgroundColor: colors.blueAccent[700],
                        color: colors.blueAccent[100],
                        position: "relative",
                    },
                }}
                open={isModalOpen}
                onClose={closeModal}>
                    <DialogTitle
                    sx={{
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        Edit Line Chart Functionalities
                    </DialogTitle>

                    <DialogActions>
                        <div className="w-full space-y-3">
                            {/* Switches */}
                            <div className="w-full flex flex-col items-center justify-center bg-blue-950 text-green-300 px-3 py-1 rounded-md">
                                <div className="flex items-center justify-between text-[1rem] w-full">
                                    <p className="w-[11rem]">
                                        Area {isAreaEnabled ? "enabled" : "disabled"}
                                    </p>
                                    
                                    <Switch
                                        checked={isAreaEnabled}
                                        onChange={() => setIsAreaEnabled(!isAreaEnabled)}
                                        color="secondary"
                                    />
                                </div>

                                <div className="flex items-center justify-between text-[1rem] w-full">
                                    <p className="w-[11rem]">
                                        Points {enablePoints ? "enabled" : "disabled"}
                                    </p>
                                    <Switch
                                        checked={enablePoints}
                                        onChange={() => setEnablePoints(!enablePoints)}
                                        color="secondary"
                                    />
                                </div>

                                {enablePoints && (
                                    <div className="flex items-center justify-between text-[1rem] w-full">
                                        <p className="w-[11rem]">
                                            Point Label {enablePointLabel ? "enabled" : "disabled"}
                                        </p>

                                        <Switch
                                            checked={enablePointLabel}
                                            onChange={() => setEnablePointLabel(!enablePointLabel)}
                                            color="secondary"
                                        />
                                    </div>
                                )}

                                <div className="flex items-center justify-between text-[1rem] w-full">
                                    <p className="w-[11rem]">
                                        Crosshair {isCrosshairEnabled ? "enabled" : "disabled"}
                                    </p>

                                    <Switch
                                        checked={isCrosshairEnabled}
                                        onChange={() => setIsCrosshairEnabled(!isCrosshairEnabled)}
                                        color="secondary"
                                    />
                                </div>
                            </div>

                            {/* Sliders */}
                            <div className={`w-full space-y-2 text-[.9rem] bg-blue-950 rounded-md px-3 py-2`}>
                                <div className="w-full flex items-center justify-">
                                    <input
                                        type="range"
                                        value={lineWidth}
                                        onChange={(e) => setLineWidth(e.target.value)}
                                        min={0}
                                        max={20}
                                        step={0.05}
                                        className="w-[12rem]"
                                    />
                                    <div className="w-[8rem] ml-3 flex gap-x-3">
                                        Line Width
                                        <p className="w-10">{lineWidth}</p>
                                    </div>
                                </div>

                                {isAreaEnabled && (
                                    <div className={`space-y-${sliderSpace}`}>
                                        <div className="w-full flex items-center justify-between">
                                            <input
                                                type="range"
                                                value={areaOpacity}
                                                onChange={(e) => setAreaOpacity(e.target.value)}
                                                min={0}
                                                max={1}
                                                step={0.01}
                                                className="w-[12rem]"
                                            />

                                            <div className="w-[8rem] ml-3  flex gap-x-3">
                                                Area Opacity
                                                <p className="w-5">{areaOpacity}</p>
                                            </div>
                                        </div>

                                        <div className="w-full flex items-center justify-between">
                                            <input
                                                type="range"
                                                value={baselineValue}
                                                onChange={(e) => setBaselineValue(e.target.value)}
                                                min={0}
                                                max={500}
                                                step={1}
                                                className="w-[12rem]"
                                            />

                                            <div className="w-[8rem] ml-3  flex gap-x-3">
                                                Baseline Value
                                                <p className="w-5">{baselineValue}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {enablePoints && (
                                    <div className={`w-full space-y-${sliderSpace}`}>
                                        <div className="w-full flex items-center justify-between">
                                            <input
                                                type="range"
                                                value={pointSize}
                                                onChange={(e) => setPointSize(e.target.value)}
                                                min={0}
                                                max={20}
                                                step={0.05}
                                                className="w-[12rem]"
                                            />
                                            <div className="w-[8rem] ml-3 flex gap-x-3">
                                                Point Size
                                                <p className="w-10">{pointSize}</p>
                                            </div>
                                        </div>

                                        <div className="w-full flex items-center justify-between">
                                            <input
                                                type="range"
                                                value={pointBorderWidth}
                                                onChange={(e) => setPointBorderWidth(e.target.value)}
                                                min={0}
                                                max={20}
                                                step={0.05}
                                                className="w-[12rem]"
                                            />
                                            <div className="w-[8rem] ml-3 flex gap-x-3">
                                                Point Border
                                                <p className="w-4">{pointBorderWidth}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Line Chart Appearance Dropdown */}
                            <div className="w-full">
                                <InputLabel
                                sx={{
                                    fontSize: "1.1rem",
                                    color: colors.blueAccent[200],
                                }}>
                                    Line Chart Appearance
                                </InputLabel>

                                <FormControl sx={{ width: "100%" }}>
                                    <Select
                                    value={fixCurve}
                                    onChange={(e) => setFixCurve(e.target.value)}
                                    sx={{
                                        backgroundColor: colors.blueAccent[800],
                                        color: colors.blueAccent[200],
                                        width: "100%",
                                        fontSize: "1rem",
                                    }}>
                                        {menuItem.map((item, index) => (
                                            <MenuItem
                                            key={index}
                                            value={item.value}
                                            sx={{
                                                backgroundColor: colors.greenAccent[800],
                                                color: colors.greenAccent[200],
                                                ":hover": {
                                                    backgroundColor: colors.greenAccent[700],
                                                },
                                                "&.Mui-selected": {
                                                    backgroundColor: colors.greenAccent[700],
                                                },
                                            }}>
                                                {item.value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>

                            {/* Line chart color */}
                            <div className="w-full">
                                <InputLabel
                                sx={{
                                    fontSize: "1.1rem",
                                    color: colors.blueAccent[200],
                                }}>
                                    Line Chart Color
                                </InputLabel>

                                <FormControl sx={{ width: "100%" }}>
                                    <Select
                                    value={colorScheme}
                                    onChange={(e) => setColorScheme(e.target.value)}
                                    sx={{
                                        backgroundColor: colors.blueAccent[800],
                                        color: colors.blueAccent[200],
                                        width: "100%",
                                        fontSize: "1rem",
                                    }}>
                                        {lineColorData.map((data, index) => (
                                            <MenuItem
                                            value={data.color}
                                            sx={{
                                                backgroundColor: colors.greenAccent[800],
                                                color: colors.greenAccent[200],
                                                ":hover": {
                                                    backgroundColor: colors.greenAccent[700],
                                                },
                                                "&.Mui-selected": {
                                                    backgroundColor: colors.greenAccent[700],
                                                },
                                            }}>
                                                {data.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>

                            {/* Legend position Dropdown */}
                            <div className="w-full">
                                <InputLabel
                                sx={{
                                    fontSize: "1.1rem",
                                    color: colors.blueAccent[200],
                                }}>
                                    Legend Position
                                </InputLabel>

                                <FormControl sx={{ width: "100%" }}>
                                    <Select
                                    value={anchorPosition}
                                    onChange={(e) => setAnchorPosition(e.target.value)}
                                    sx={{
                                        backgroundColor: colors.blueAccent[800],
                                        color: colors.blueAccent[200],
                                        width: "100%",
                                        fontSize: "1rem",
                                    }}>
                                        {legendPositionData.map((data, index) => (
                                            <MenuItem
                                            value={data.value}
                                            sx={{
                                                backgroundColor: colors.greenAccent[800],
                                                color: colors.greenAccent[200],
                                                ":hover": {
                                                    backgroundColor: colors.greenAccent[700],
                                                },
                                                "&.Mui-selected": {
                                                    backgroundColor: colors.greenAccent[700],
                                                },
                                            }}>
                                                {data.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default LineChart;

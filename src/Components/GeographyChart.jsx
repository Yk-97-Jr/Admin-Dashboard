import React, { useState } from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import { mockGeographyData as data } from "../data/mockData";
import {
    Box,
    Dialog,
    DialogActions,
    DialogTitle,
    FormControl,
    MenuItem,
    Select,
    Switch,
    useTheme,
} from "@mui/material";
import { tokens } from "../Theme";
import { geoFeatures } from "../data/mockGeoFeatures";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const GeographyChart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [colorSchemes, setColorSchemes] = useState("nivo");
    const [legendPosition, setLegendPosition] = useState("bottom-left");
    const [borderWidth, setBorderWidth] = useState(0.5);
    const [translateX, setTranslateX] = useState(20);
    const [translateY, setTranslateY] = useState(-100);
    const [projectionTranslateX, setProjectionTranslateX] = useState(0.5);
    const [projectionTranslateY, setProjectionTranslateY] = useState(0.5);
    const [itemWidth, setItemWidth] = useState(94);
    const [itemsSpacing, setItemsSpacing] = useState(5);
    const [symbolSize, setSymbolSize] = useState(18);
    const [projectionScale, setProjectionScale] = useState(130);
    const [lambdaScale, setLambdaScale] = useState(0);
    const [phiScale, setPhiScale] = useState(0);
    const [gammaScale, setGammaScale] = useState(0);

    const [isGraticulesEnabled, setIsGraticulesEnabled] = useState(false);
    const [isTooltipEnabled, setIsTooltipEnabled] = useState(isDashboard ? false : true);
    const [direction, setDirection] = useState(true);
    const [legendSymbolShape, setLegendSymbolShape] = useState(true);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const CustomTooltip = ({ data }) => {
        return (
            <Box
            sx={{
                backgroundColor: colors.primary[500],
                px: "2rem",
                py: "1rem",
                color: data.feature.color,
                border: "2px solid",
                borderColor: data.feature.color,
            }}>
                {!isDashboard ? (
                    <div>
                        <div>ID: {data.feature.id}</div>
                        <div>Country: {data.feature.label}</div>
                        <div>Value: {data.feature.value}</div>
                        <div>Color: {data.feature.color}</div>
                    </div>
                ) : (
                    <div className="flex gap-x-3">
                        <Box 
                        sx={{
                            width: '1.5rem',
                            height: '1rem',
                            borderRadius: '10px',
                            backgroundColor: data.feature.color
                        }}></Box>
                        <div>Country: {data.feature.label}</div>
                    </div>
                )}
            </Box>
        );
    };

    const mapColorData = [
        { color: "nivo", name: "Nivo" },
        { color: "BrBG", name: "Brown → Blue Green" },
        { color: "PRGn", name: "Purple Red → Green" },
        { color: "PiYG", name: "Pink → Yellow Green" },
        { color: "PuOr", name: "Purple → Orange" },
        { color: "RdBu", name: "Red → Blue" },
        { color: "GnBu", name: "Green → Blue" },
        { color: "RdPu", name: "Red → Purple" },
        { color: "OrRd", name: "Orange → Red" },
        { color: "RdYlBu", name: "Red → Yellow → Blue" },
        { color: "RdYlGn", name: "Red → Yellow → Green" },
        { color: "YlGnBu", name: "Yellow → Green → Blue" },
        { color: "YlOrRd", name: "Yellow → Orange → Red" },
        { color: "PuBuGn", name: "Purple → Blue → Green" },
        { color: "spectral", name: "Spectral" },
        { color: "blues", name: "Blues" },
        { color: "greens", name: "Greens" },
        { color: "oranges", name: "Oranges" },
        { color: "purples", name: "Purples" },
        { color: "reds", name: "Reds" },
    ];

    const legendPositionData = [
        { position: "top-left", title: "Top-Left" },
        { position: "top", title: "Top" },
        { position: "top-right", title: "Top-Right" },
        { position: "right", title: "Right" },
        { position: "bottom-right", title: "Bottom-Right" },
        { position: "bottom", title: "Bottom" },
        { position: "bottom-left", title: "Bottom-Left" },
        { position: "left", title: "Left" },
        { position: "center", title: "Center" },
    ];

    const sliderData = [
        {
            title: "translateX",
            value: translateX,
            min: "-200",
            max: "400",
            function: setTranslateX,
        },
        // {
        //     title: 'translateY', 
        //     value: translateY, 
        //     min: '-200', 
        //     max: '200', 
        //     function: setTranslateY
        // },
        {
            title: "Border Width",
            value: borderWidth,
            min: "0",
            max: "20",
            function: setBorderWidth,
        },
        {
            title: "Item Width",
            value: itemWidth,
            min: "10",
            max: "200",
            function: setItemWidth,
        },
        // {
        //     title: 'Item Spacing', 
        //     value: itemsSpacing, 
        //     min: '0', 
        //     max: '60', 
        //     function: setItemsSpacing
        // },
        {
            title: "Symbol Size",
            value: symbolSize,
            min: "2",
            max: "60",
            function: setSymbolSize,
        },
        {
            title: "Projection Scale",
            value: projectionScale,
            min: "0",
            max: "700",
            function: setProjectionScale,
        },
        {
            title: "Projection translateX",
            value: projectionTranslateX,
            min: "-1",
            max: "1",
            function: setProjectionTranslateX,
        },
        {
            title: "Projection translateY",
            value: projectionTranslateY,
            min: "-1",
            max: "1",
            function: setProjectionTranslateY,
        },
        {
            title: "Lambda Scale",
            value: lambdaScale,
            min: "-360",
            max: "360",
            function: setLambdaScale,
        },
        {
            title: "Phi Scale",
            value: phiScale,
            min: "-360",
            max: "360",
            function: setPhiScale,
        },
        {
            title: "Gamma Scale",
            value: gammaScale,
            min: "-360",
            max: "360",
            function: setGammaScale,
        },
    ];

    const switchData = [
        {
            title: "Graticule Lines",
            value: isGraticulesEnabled,
            function: setIsGraticulesEnabled,
            enableValue: "enabled",
            disableValue: "disabled",
        },
        {
            title: "Tooltip",
            value: isTooltipEnabled,
            function: setIsTooltipEnabled,
            enableValue: "enabled",
            disableValue: "disabled",
        },
        {
            title: "Legend Direction",
            value: direction,
            function: setDirection,
            enableValue: "column",
            disableValue: "row",
        },
        {
            title: "Legend Symbol",
            value: legendSymbolShape,
            function: setLegendSymbolShape,
            enableValue: "square",
            disableValue: "circle",
        },
    ];

    const handleResetAll = () => {
        setColorSchemes("nivo");
        setLegendPosition("bottom-left");
        setBorderWidth(0.5);
        setTranslateX(20);
        setTranslateY(-100);
        setProjectionTranslateX(0.5);
        setProjectionTranslateY(0.5);
        setItemWidth(94);
        setItemsSpacing(5);
        setSymbolSize(18);
        setProjectionScale(130);
        setLambdaScale(0);
        setPhiScale(0);
        setGammaScale(0);
        setIsGraticulesEnabled(false);
        setIsTooltipEnabled(true);
        setDirection(true);
        setLegendSymbolShape(true);
    };

    return (
        <div className={`${isDashboard ? "h-full" : "h-[80vh]"}`}>
            <ResponsiveChoropleth
                data={data}
                theme={{
                    axis: {
                        domain: {
                            line: {stroke: colors.greenAccent[100]},
                        },
                        legend: {
                            text: {fill: colors.grey[100]},
                        },
                        ticks: {
                            line: {
                                stroke: colors.grey[100],
                                strokeWidth: 1,
                            },
                            text: {
                                fill: colors.grey[100],
                            },
                        },
                    },
                    legends: {
                        text: {fill: colors.grey[100]},
                    },
                }}
                tooltip={ isTooltipEnabled ? (value) => <CustomTooltip data={value} /> : undefined }
                isInteractive={isTooltipEnabled ? undefined : false}
                features={geoFeatures.features}
                colors={colorSchemes}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                domain={[0, 1000000]}
                unknownColor="#666666"
                label="properties.name"
                valueFormat=".2s"
                projectionScale={isDashboard ? 40 : projectionScale}
                projectionTranslation={ isDashboard ? [0.49, 0.6] : [projectionTranslateX, projectionTranslateY] }
                projectionRotation={[lambdaScale, phiScale, gammaScale]}
                borderWidth={borderWidth}
                borderColor="#ffffff"
                enableGraticule={isGraticulesEnabled}
                defs={[
                {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "#38bcb2",
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "#eed312",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
                {
                    id: "gradient",
                    type: "linearGradient",
                    colors: [
                        {
                            offset: 0,
                            color: "#000",
                        },
                        {
                            offset: 100,
                            color: "inherit",
                        },
                    ],
                },
                ]}
                fill={[
                    {
                        match: { id: "CAN" },
                        id: "dots",
                    },
                    {
                        match: { id: "CHN" },
                        id: "lines",
                    },
                    {
                        match: { id: "ATA" },
                        id: "gradient",
                    },
                ]}
                legends={
                    !isDashboard ?
                    [{
                        anchor: legendPosition,
                        direction: direction ? "column" : "row",
                        justify: true,
                        translateX: translateX,
                        translateY: translateY,
                        itemsSpacing: itemsSpacing,
                        itemWidth: itemWidth,
                        itemHeight: 18,
                        itemDirection: "left-to-right",
                        itemTextColor: colors.grey[100],
                        itemOpacity: 0.85,
                        symbolSize: symbolSize,
                        symbolShape: legendSymbolShape ? "square" : "circle",
                        effects: [{
                            on: "hover",
                            style: {
                                itemTextColor: "#ffffff",
                                itemOpacity: 1,
                            },
                        }],
                    }]
                    : undefined
                }
            />

            <div className={`${isDashboard ? "flex items-center justify-center" : ""}`}>
                {!isDashboard && (
                    <div className={`absolute flex items-center ${ isDashboard ? "top-2 right-1 text-[.8rem]" : "" }`}>
                        <div className="w-[3rem] h-[2rem] flex justify-center items-center cursor-pointer">
                            <FontAwesomeIcon
                                icon={faPenToSquare}
                                className={`${isDashboard ? "text-[1rem]" : "text-[1.2rem]"} ${!isDashboard ? "text-blue-300 bg-blue-800" : "text-green-300 bg-green-900" } p-2 rounded-full active:scale-95 transition-all`}
                                onClick={() => setIsModalOpen(!isModalOpen)}
                            />
                        </div>

                        <div
                        className={`bg-blue-800 text-blue-300 cursor-pointer rounded-full active:scale-95 transition-all font-semibold px-3 py-2 text-[.95rem]`}
                        onClick={handleResetAll}>
                            <button>Reset All</button>
                        </div>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <Dialog
                PaperProps={{
                    sx: {
                        backgroundColor: colors.blueAccent[600],
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
                        Edit Map Appearance
                    </DialogTitle>

                    {/* Slider */}
                    {!isDashboard && (
                        <DialogActions>
                            <div className="w-full space-y-1 bg-blue-950 px-2 py-1 rounded-md">
                                {sliderData.map((data, index) => (
                                    <div
                                    key={index}
                                    className="flex items-center justify-between w-full text-blue-300">
                                        <p className="w-[12rem] text-[1rem] text-blue-200">
                                            {data.title}
                                        </p>

                                        <input
                                            type="range"
                                            value={data.value}
                                            min={data.min}
                                            max={data.max}
                                            onChange={(e) => data.function(e.target.value)}
                                            step={0.01}
                                            className="w-[12rem]"
                                        />
                                        
                                        <p className="w-16 flex justify-end text-[.94rem]">{data.value}</p>
                                    </div>
                                ))}
                            </div>
                        </DialogActions>
                    )}
                    
                    {/* DropDown options (color, legend position) */}
                    <DialogActions>
                        <div className="w-full flex flex-col gap-y-4">
                            {/* color */}
                            <div className="w-full">
                                <p className="text-[1rem]"> Map Theme </p>
                                <FormControl sx={{ width: "100%" }}>
                                    <Select
                                    value={colorSchemes}
                                    onChange={(e) => setColorSchemes(e.target.value)}
                                    sx={{
                                        backgroundColor: colors.blueAccent[800],
                                        color: colors.blueAccent[200],
                                        width: "100%",
                                        fontSize: "1rem",
                                    }}>
                                        {mapColorData.map((item, index) => (
                                            <MenuItem
                                            key={index}
                                            value={item.color}
                                            sx={{
                                                backgroundColor: colors.greenAccent[800],
                                                color: colors.greenAccent[200],
                                            }}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>

                            {/* legend position */}
                            {!isDashboard && (
                                <div className="w-full">
                                    <p className="text-[1rem]"> Legend Alignment </p>
                                    <FormControl sx={{ width: "100%" }}>
                                        <Select
                                        value={legendPosition}
                                        onChange={(e) => setLegendPosition(e.target.value)}
                                        sx={{
                                            backgroundColor: colors.blueAccent[800],
                                            color: colors.blueAccent[200],
                                            width: "100%",
                                            fontSize: "1rem",
                                        }}>
                                            {legendPositionData.map((item, index) => (
                                                <MenuItem
                                                key={index}
                                                value={item.position}
                                                sx={{
                                                    backgroundColor: colors.greenAccent[800],
                                                    color: colors.greenAccent[200],
                                                }}>
                                                    {item.title}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            )}
                        </div>
                    </DialogActions>

                    {/* Switch */}
                    {!isDashboard && (
                        <DialogActions>
                            <div className="flex flex-col items-start justify-center w-full text-[1rem] bg-blue-950 text-violet-300 rounded-md px-2 pb-2">
                                {switchData.map((data, index) => (
                                    <div
                                    className="flex items-center justify-between w-full"
                                    key={index}>
                                        <p className="w-[13rem]">
                                            {data.title}{" "}
                                            {data.value ? data.enableValue : data.disableValue}
                                        </p>
                                        <Switch
                                            checked={data.value}
                                            onChange={() => data.function(!data.value)}
                                            inputProps={{ "aria-label": "controlled" }}
                                            color="secondary"
                                        />
                                    </div>
                                ))}
                            </div>
                        </DialogActions>
                    )}
                </Dialog>
            )}
        </div>
    )
};

export default GeographyChart;
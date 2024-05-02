import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import { generateRandomPieData, mockPieData } from '../data/mockData'
import { useTheme } from '@emotion/react'
import { tokens } from '../Theme'
import { useState } from 'react'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Box, Dialog, DialogActions, DialogTitle, MenuItem, Select, Switch } from '@mui/material'
import { blue } from '@mui/material/colors'
import { patternSquaresDef, patternDotsDef, patternLinesDef, linearGradientDef } from '@nivo/core'

const PieChart = ({isDashboard = false}) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode);
    const currentMode = theme.palette.mode;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isArcLabelEnabled, setIsArcLabelEnabled] = useState(true);
    const [isSortByValueEnabled, setIsSortByValueEnabled] = useState(false);
    const [isArcLinkLabelEnabled, setIsArcLinkLabelEnabled] = useState(true);
    const [innerRadiusOffset, setInnerRadiusOffset] = useState(4);
    const [innerRadius, setInnerRadius] = useState(0.5);
    const [outerRadiusOffset, setOuterRadiusOffset] = useState(14);
    const [padAngle, setPadAngle] = useState(0.6);
    const [cornerRadius, setCornerRadius] = useState(1);
    const [borderWidth, setBorderWidth] = useState(2);
    const [legendItemWidth, setLegendItemWidth] = useState(40);
    const [legendItemSpacing, setLegendItemSpacing] = useState(50);
    const [legendSymbolSize, setLegendSymbolSize] = useState(17);
    const [legendDirection, setLegendDirection] = useState(true);
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(70);
    const [legendAnchor, setLegendAnchor] = useState('bottom');
    const [arcLinkOffset, setArcLinkOffset] = useState(0);
    const [arcLinkDiagonalLength, setArcLinkDiagonalLength] = useState(20);
    const [arcLinkStraightLength, setArcLinkStraightLength] = useState(25);
    const [arcLinkTextOffset, setArcLinkTextOffset] = useState(11);
    const [arcLinkThickness, setArcLinkThickness] = useState(2);
    const [legendShape, setLegendShape] = useState('square');
    const [changeData, setChangeData] = useState(false);
    const [data, setData] = useState(mockPieData)

    const closeModal = () => {
        setIsModalOpen(false);
    }
    
    useEffect(() => {
        if (changeData) {
            const newData = generateRandomPieData();
            setChangeData(false);
            setData(newData)
        }
    }, [changeData]);
    
    const handleGenerateClick = () => {
        setChangeData(true);
    };

    const sliderData = [
        {title: 'Outer Radius', value: outerRadiusOffset, min: 2, max: 50, function: setOuterRadiusOffset},
        {title: 'Inner Radius Offset', value: innerRadiusOffset, min: 2, max: 50, function: setInnerRadiusOffset},
        {title: 'Inner Radius', value: innerRadius, min: 0, max: 0.95, function: setInnerRadius},
        {title: 'Pad Angle', value: padAngle, min: 0, max: 45, function: setPadAngle},
        {title: 'Corner Radius', value: cornerRadius, min: 0, max: 45, function: setCornerRadius},
        {title: 'Border Width', value: borderWidth, min: 0, max: 20, function: setBorderWidth},
        {title: 'Item Width', value: legendItemWidth, min: 15, max: 150, function: setLegendItemWidth},
        {title: 'Item Spacing', value: legendItemSpacing, min: 15, max: 150, function: setLegendItemSpacing},
        {title: 'Symbol Size', value: legendSymbolSize, min: 2, max: 50, function: setLegendSymbolSize},
        {title: 'Translate X', value: translateX, min: -1000, max: 1000, function: setTranslateX},
        {title: 'Translate Y', value: translateY, min: -1000, max: 1000, function: setTranslateY},
        {title: 'Arc Link Label', value: arcLinkOffset, min: -24, max: 24, function: setArcLinkOffset},
        {title: 'Arc Link Diagonal', value: arcLinkDiagonalLength, min: 0, max: 50, function: setArcLinkDiagonalLength},
        {title: 'Arc Link Straight', value: arcLinkStraightLength, min: 0, max: 100, function: setArcLinkStraightLength},
        {title: 'Arc Link Text Offset', value: arcLinkTextOffset, min: 5, max: 36, function: setArcLinkTextOffset},
        {title: 'Arc Link Label Thickness', value: arcLinkThickness, min: 0, max: 20, function: setArcLinkThickness},
    ]

    const switchData = [
        {title: 'Arc Label', value: isArcLabelEnabled, function: setIsArcLabelEnabled},
        {title: 'Arc Link Label', value: isArcLinkLabelEnabled, function: setIsArcLinkLabelEnabled},
        {title: 'Sort By Value', value: isSortByValueEnabled, function: setIsSortByValueEnabled},
        {title: 'Legend Alignment', value: legendDirection, function: setLegendDirection},
    ]

    const CustomTooltip = ({ data }) => {
        return (
            <Box 
            sx={{
                px: '1.5rem',
                py: '1rem',
                backgroundColor: colors.primary[500],
                color: data.datum.color,
                border: '2px solid',
                borderColor: data.datum.color
            }}>
                <p>ID: {data.datum.id}</p>
                <p>Value: {data.datum.value}</p>
                <p>Label: {data.datum.label}</p>
                <p>Color: {data.datum.color}</p>
            </Box>
        );
    };
    
    const handleResetAll = () => {
        setIsArcLabelEnabled(true);
        setIsSortByValueEnabled(false);
        setIsArcLinkLabelEnabled(true);
        setInnerRadiusOffset(4);
        setInnerRadius(0.5);
        setOuterRadiusOffset(14);
        setPadAngle(0.6);
        setCornerRadius(1);
        setBorderWidth(2);
        setLegendItemWidth(40);
        setLegendItemSpacing(50);
        setLegendSymbolSize(17);
        setLegendDirection(true);
        setTranslateX(0);
        setTranslateY(70);
        setLegendAnchor('bottom');
        setArcLinkOffset(0);
        setArcLinkDiagonalLength(20);
        setArcLinkStraightLength(25);
        setArcLinkTextOffset(11);
        setArcLinkThickness(2);
        setLegendShape('square');
        setChangeData(false);
        setData(mockPieData);
    };
      

    return (
        <div className={`${isDashboard ? "h-full" : "h-[80vh]"}`}>
            <ResponsivePie
                data={data}
                theme={{
                    axis: {
                        domain: {
                            line: {stroke: colors.grey[100]},
                        },
                        legend: {
                            text: {fill: colors.grey[100]},
                        },
                        ticks: {
                            line: {
                                stroke: colors.grey[100],
                                strokeWidth: 1,
                            },
                            text: {fill: colors.grey[100]},
                        },
                    },
                    labels: {
                        text: {
                            fontSize: 14, // Increase the font size for labels
                        },
                    },
                }}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={innerRadius}
                padAngle={padAngle}
                cornerRadius={cornerRadius}
                borderWidth={borderWidth}
                borderColor={{
                    from: 'color',
                    modifiers: [['darker', 0.2]]
                }}
                tooltip={(pieData) => <CustomTooltip data={pieData}/>}
                enableArcLabels={isArcLabelEnabled}
                sortByValue={isSortByValueEnabled}
                enableArcLinkLabels={isDashboard ? false : isArcLinkLabelEnabled}
                activeInnerRadiusOffset={innerRadiusOffset}
                activeOuterRadiusOffset={outerRadiusOffset}
                isInteractive={true}
                arcLinkLabelsOffset={arcLinkOffset}
                arcLinkLabelsDiagonalLength={arcLinkDiagonalLength}
                arcLinkLabelsStraightLength={arcLinkStraightLength}
                arcLinkLabelsTextOffset={arcLinkTextOffset}
                arcLinkLabelsThickness={arcLinkThickness}
                arcLinkLabelsSkipAngle={13}
                arcLinkLabelsColor={{ 
                    from: 'color',
                    modifiers: (currentMode === 'light' ? [['darker', 1]] : []),
                }}
                arcLinkLabelsTextColor={{ 
                    from: 'color', 
                    modifiers: (currentMode === 'light' ? [['darker', 1]] : []),
                }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [['darker', 3]]
                }}
                defs={[
                    patternSquaresDef('squares', {background: 'inherit', color: 'rgba(255, 255, 255, 0.4)'}),
                    patternDotsDef('dots', {background: 'inherit', color: 'rgba(255, 255, 255, 0.4)'}),
                    patternLinesDef('lines', {background: 'inherit', color: 'rgba(255, 255, 255, 0.4)'}),
                    linearGradientDef('gradientA', [
                        { offset: 0, color: 'inherit' },
                        { offset: 100, color: 'inherit', opacity: 0.4 },
                    ]),
                    linearGradientDef('gradientB', [
                        { offset: 0, color: 'inherit',  },
                        { offset: 100, color: 'inherit', opacity: 0.5 },
                    ]),
                    linearGradientDef('gradientC', [
                        { offset: 0, color: 'inherit', opacity: 0.5  },
                        { offset: 100, color: 'inherit', },
                    ]),
                ]}
                fill={[
                    { match: d => d.id === 'React', id: 'squares' },
                    { match: d => d.id === 'Typescript', id: 'squares' },
                    { match: d => d.id === 'Go', id: 'squares' },
                    { match: d => d.id === 'Pascal', id: 'lines' },
                    { match: d => d.id === 'Clojure', id: 'lines' },
                    { match: d => d.id === 'Javascript', id: 'lines' },
                    { match: d => d.id === 'Angular', id: 'lines' },
                    { match: d => d.id === 'CSS', id: 'lines' },
                    { match: d => d.id === 'Swift', id: 'lines' },
                    { match: d => d.id === 'MATLAB', id: 'dots' },
                    { match: d => d.id === 'HTML', id: 'dots' },
                    { match: d => d.id === 'Ruby', id: 'dots' },
                    { match: d => d.id === 'Python', id: 'dots' },
                    { match: d => d.id === 'Perl', id: 'gradientA' },
                    { match: d => d.id === 'Lua', id: 'gradientB' },
                    { match: d => d.id === 'PHP', id: 'gradientC' },
                    { match: d => d.id === 'Java', id: 'squares' },
                    { match: d => d.id === 'C++', id: 'squares' },
                    { match: d => d.id === 'Rust', id: 'squares' },
                    { match: d => d.id === 'Objective-C', id: 'lines' },
                    { match: d => d.id === 'Haskell', id: 'lines' },
                    { match: d => d.id === 'Fortran', id: 'lines' },
                    { match: d => d.id === 'Elixir', id: 'lines' },
                    { match: d => d.id === 'Groovy', id: 'lines' },
                    { match: d => d.id === 'Scheme', id: 'dots' },
                    { match: d => d.id === 'Prolog', id: 'dots' },
                    { match: d => d.id === 'SQL', id: 'dots' },
                    { match: d => d.id === 'Ruby on Rails', id: 'gradientA' },
                    { match: d => d.id === 'Vue.js', id: 'gradientB' },
                    { match: d => d.id === 'Node.js', id: 'gradientC' },
                    { match: d => d.id === 'Lisp', id: 'gradientA' },
                    { match: d => d.id === 'Assembly', id: 'gradientB' },
                    { match: d => d.id === 'Bash', id: 'gradientC' },
                    { match: d => d.id === 'Delphi', id: 'squares' },
                    { match: d => d.id === 'VHDL', id: 'squares' },
                    { match: d => d.id === 'Verilog', id: 'squares' },
                    { match: d => d.id === 'PL/SQL', id: 'lines' },
                    { match: d => d.id === 'Ada', id: 'lines' },
                    { match: d => d.id === 'COBOL', id: 'lines' },
                    { match: d => d.id === 'Julia', id: 'dots' },
                ]}
                transitionMode="pushIn"
                legends={
                    isDashboard 
                    ? undefined 
                    : [{
                    anchor: legendAnchor,
                    direction: legendDirection ? 'row' : 'column',
                    justify: false,
                    translateX: translateX,
                    translateY: translateY,
                    itemsSpacing: 18,
                    itemWidth: legendItemWidth,
                    itemsSpacing: legendItemSpacing,
                    itemHeight: 0,
                    itemTextColor: colors.greenAccent[300],
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: legendSymbolSize,
                    symbolShape: legendShape,
                    effects: [{
                        on: 'hover',
                        style: {
                            itemTextColor: colors.redAccent[400],
                            fontSize: '22px',
                        }
                    }]
                }]}
            />

            <div className='absolute flex items-center'>
                <div className='bg-blue-800 text-blue-300 cursor-pointer px-3 py-2 rounded-full active:scale-95 transition-all font-semibold text-[.95rem]'
                onClick={handleGenerateClick}>
                    <button>Generate</button>
                </div>
            
                <div className='w-[3rem] h-[2rem] flex justify-center items-center cursor-pointer'>
                    <FontAwesomeIcon 
                    icon={faPenToSquare} 
                    className='text-[1.2rem] text-blue-300 bg-blue-800 p-2 rounded-full active:scale-95 transition-all'
                    onClick={() => setIsModalOpen(!isModalOpen)}/>
                </div>

                <div className='bg-blue-800 text-blue-300 cursor-pointer px-3 py-2 rounded-full active:scale-95 transition-all font-semibold text-[.95rem]'
                onClick={handleResetAll}>
                    <button>Reset All</button>
                </div>
            </div>

            {isModalOpen && (
                <Dialog 
                PaperProps={{ 
                    sx: {
                        backgroundColor: colors.blueAccent[600],
                        color: colors.blueAccent[100],
                        position: 'relative'
                    } 
                }}
                open={isModalOpen}
                onClose={closeModal}>
                    <DialogTitle
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        Edit Pie Chart Functionalities
                    </DialogTitle>

                    <DialogActions>
                        <div className='flex flex-col items-start justify-center gap-y-2'>
                            {/* Sliders */}
                            <div className='w-full space-y-1 text-[1rem] bg-cyan-900 text-green-300 rounded-md px-2 py-2.5'>
                                {sliderData.map((slider, index) => (
                                    <div 
                                    className=' flex items-center justify-between gap-x-2 w-full'
                                    key={index}>
                                        <p>{slider.title}</p> 
                                        <input 
                                            type="range"
                                            value={slider.value}
                                            min={slider.min}
                                            max={slider.max}
                                            step={slider.title === 'Inner Radius' ? 0.01 : 1}
                                            onChange={(e) => slider.function(parseFloat(e.target.value))}
                                            className='w-[12rem]'
                                        />
                                    </div>
                                ))}                           
                            </div>

                            {/* Switches */}
                            <div className='flex flex-col items-start justify-center w-full text-[1rem] bg-blue-950 text-violet-300 rounded-md px-2 pb-2'>
                                {switchData.map((data, index) => (
                                    <div 
                                    className='flex items-center justify-between w-full'
                                    key={index}>
                                        <p>{data.title} {data.value ? (index == 3 ? 'row' : 'enabled') : (index == 3 ? 'column' : 'disabled') }</p>
                                        <Switch
                                            checked={data.value}
                                            onChange={() => data.function(!data.value)}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            color='secondary'
                                        />
                                    </div>
                                ))}

                                <div className='flex flex-col items-center justify-between gap-y-1 w-full'>
                                    <p>Legend</p>
                                    <div className='w-full flex items-center justify-between'>
                                        <div className='flex items-center justify-start gap-x-2'>
                                            <p>Position</p>
                                            <Select
                                            value={legendAnchor}
                                            onChange={(e) => setLegendAnchor(e.target.value)}
                                            sx={{color: blue[200]}}>
                                                <MenuItem value='top'>Top</MenuItem>
                                                <MenuItem value='top-right'>Top Right</MenuItem>
                                                <MenuItem value='right'>Right</MenuItem>
                                                <MenuItem value='bottom-right'>Bottom Right</MenuItem>
                                                <MenuItem value='bottom'>Bottom</MenuItem>
                                                <MenuItem value='bottom-left'>Bottom Left</MenuItem>
                                                <MenuItem value='left'>Left</MenuItem>
                                                <MenuItem value='top-left'>Top Left</MenuItem>
                                                <MenuItem value='center'>Center</MenuItem>
                                            </Select>
                                        </div>

                                        <div className='flex items-center justify-start gap-x-2'>
                                            <p>Shape</p>
                                            <Select
                                            value={legendShape}
                                            onChange={(e) => setLegendShape(e.target.value)}
                                            sx={{color: blue[200]}}>
                                                <MenuItem value='square' sx={{width: '8rem'}}>Square</MenuItem>
                                                <MenuItem value='circle'>Circle</MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    )
}

export default PieChart
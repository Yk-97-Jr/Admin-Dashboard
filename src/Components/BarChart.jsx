import React, { useEffect, useState } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { mockBarData as data, generateRandomBarData } from '../data/mockData'
import { useTheme } from '@emotion/react'
import { tokens } from '../Theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Dialog, DialogActions, DialogTitle, Switch, Box } from '@mui/material'

const BarChart = ({ isDashboard = false }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode);
    const currentMode = theme.palette.mode;

    const [grpModeChecked, setGrpModeChecked] = useState(true);
    const [grpMode, setGrpMode] = useState('stacked');
    const [layoutModeChecked, setLayoutModeChecked] = useState(true);
    const [layoutMode, setLayoutMode] = useState('vertical');
    const [isReversed, setIsReversed] = useState(false);
    const [outerPaddingSlider, setOuterPaddingSlider] = useState(0.2)
    const [innerPaddingSlider, setInnerPaddingSlider] = useState(0);
    const [borderRadius, setBorderRadius] = useState(0);
    const [borderWidth, setBorderWidth] = useState(0);
    const [tooltipActive, setTooltipActive] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLabelEnabled, setIsLabelEnabled] = useState(isDashboard ? false : true);
    const [changeData, setChangeData] = useState(false);

    useEffect(() => {
        if (currentMode === 'light') {
            setBorderWidth(1)
        } else {
            setBorderWidth(0)
        }
    }, [currentMode])

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleGrpModeAppearance = () => {
        setGrpModeChecked(!grpModeChecked)
        setGrpMode(grpModeChecked ? 'grouped' : 'stacked')
    }

    const handleLayoutModeAppearance = () => {
        setLayoutModeChecked(!layoutModeChecked)
        setLayoutMode(layoutModeChecked ? 'horizontal' : 'vertical')
    }

    const CustomTooltip = ({ data }) => {
        return (
            <Box
            sx={{
                backgroundColor: colors.primary[500],
                px: isDashboard ? '1rem' : '2rem',
                py: isDashboard ? '.4rem' : '1rem',
                color: data.color,
                border: '2px solid',
                borderColor: data.color,
            }}>
                {!isDashboard ? (
                    <div>
                        <div>ID: {data.id}</div>
                        <div>Value: {data.value}</div>
                        <div>Index: {(data.index) + 1}</div>
                        <div>Country: {data.indexValue}</div>
                        <div>Color: {data.color}</div>
                        <div>Label: {data.label}</div>
                    </div>
                ) : (
                    <div className='flex items-center gap-x-2'>
                        <Box 
                        sx={{
                            width: '1.5rem',
                            height: '1rem',
                            borderRadius: '10px',
                            backgroundColor: data.color
                        }}></Box>
                        <div>{data.label}</div>
                    </div>
                )}
            </Box>
        );
    };

    useEffect(() => {
        if (changeData) {
            generateRandomBarData();
            setChangeData(false);
        }
    }, [changeData]);
    
    const handleGenerateClick = () => {
        setChangeData(true);
    };

    const handleResetAll = () => {
        setGrpModeChecked(true);
        setGrpMode('stacked');
        setLayoutModeChecked(true);
        setLayoutMode('vertical');
        setIsReversed(false);
        setOuterPaddingSlider(0.2);
        setInnerPaddingSlider(0);
        setBorderRadius(0);
        setBorderWidth(0);
        setTooltipActive(true);
        setIsModalOpen(false);
        setIsLabelEnabled(true);
        setChangeData(false);
    };

    return (
        <div className={`${isDashboard ? "h-full w-full" : "h-[80vh]"}`}>
            <ResponsiveBar
                data={data}
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: colors.grey[100]
                            }
                        },
                        legend: {
                            text: {
                                fill: colors.blueAccent[200],
                                fontSize: '1rem',
                            }
                        },
                        ticks: {
                            line: {
                                stroke: colors.grey[100],
                                strokeWidth: 1
                            },
                            text: {
                                fill: colors.grey[100]
                            }
                        }
                    },
                    legends: {
                        text: {
                            fill: colors.blueAccent[100],
                            fontSize: '.9rem',
                        }
                    },
                    labels: {
                        text: {
                            fontSize: isDashboard ? '.67rem' : '.9rem',
                        }
                    }
                }}
                tooltip={tooltipActive ? (
                        (bar) => <CustomTooltip data={bar} />
                    ) : (
                        undefined
                    )
                }
                isInteractive={tooltipActive ? undefined : false}
                keys={[
                    'hot dog',
                    'burger',
                    'sandwich',
                    'kebab',
                    'fries',
                    'donut',
                ]}
                groupMode= {grpMode}
                layout= {layoutMode}
                reverse= {isReversed}
                padding= {outerPaddingSlider}
                innerPadding={innerPaddingSlider}
                borderRadius={borderRadius}
                borderWidth={borderWidth}
                indexBy="country"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    },
                    {
                        id: 'clines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#CAA6FF',
                        rotation: 90,
                        lineWidth: 5,
                        spacing: 10
                    },
                ]}
                fill={[
                    {
                        match: {id: 'fries'},
                        id: 'dots'
                    },
                    {
                        match: {id: 'sandwich'},
                        id: 'lines'
                    },
                    {
                        match: {id: 'hot dog'},
                        id: 'clines'
                    }
                ]}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: isDashboard ? undefined : 'country',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend:  isDashboard ? undefined : 'food',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                enableLabel= {isLabelEnabled}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [[ 'darker', 2 ]]
                }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [{ on: 'hover', style: {itemOpacity: 1} }]
                    }
                ]}
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={function (e) {
                    return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
                }}
            />

            <div className={`${isDashboard ? "flex items-center justify-center " : ""}`}>
                <div className={`absolute flex items-center ${ isDashboard ? "-top-1 text-[.8rem]" : "" }`}>
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
                        Edit Bar Chart Appearance
                    </DialogTitle>

                    <DialogActions>
                        {/* Switches */}
                        <div className='flex flex-col items-start justify-center min-w-[15rem] text-[1rem] bg-violet-900 text-violet-300 rounded-md px-2'>
                            <div className='flex items-center justify-between w-full'>
                                <p>Group Mode {grpModeChecked ? 'Stacked' : 'Grouped' }</p>
                                <Switch
                                    checked={grpModeChecked}
                                    onChange={(e) => handleGrpModeAppearance(e.target.value)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    color='secondary'
                                />
                            </div>

                            <div className='flex items-center justify-between w-full'>
                                <p>Layout {layoutModeChecked ? 'Vertical' : 'Horizontal' }</p>
                                <Switch
                                    checked={layoutModeChecked}
                                    onChange={(e) => handleLayoutModeAppearance(e.target.value)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    color='warning'
                                />
                            </div>

                            <div className='flex items-center justify-between w-full'>
                                <p>Reverse {isReversed ? 'on' : 'off'}</p>
                                <Switch
                                    checked={isReversed}
                                    onChange={() => setIsReversed(!isReversed)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    color='warning'
                                />
                            </div>

                            <div className='flex items-center justify-between w-full'>
                                <p>Custom Tooltip {tooltipActive ? 'on' : 'off'}</p>
                                <Switch
                                    checked={tooltipActive}
                                    onChange={() => setTooltipActive(!tooltipActive)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    color='secondary'
                                />
                            </div>

                            <div className='flex items-center justify-between w-full'>
                                <p>Label {tooltipActive ? 'disabled' : 'enabled'}</p>
                                <Switch
                                    checked={isLabelEnabled}
                                    onChange={() => setIsLabelEnabled(!isLabelEnabled)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    color='secondary'
                                />
                            </div>
                        </div>

                        {/* Sliders */}
                        <div className='flex flex-col items-start justify-center text-[1rem] gap-y-3 bg-violet-900 text-violet-300 rounded-md px-2 py-2.5'>
                            <div className=' flex items-center justify-between gap-x-2 w-full'>
                                <p>Outer Padding</p> 
                                <input 
                                    type="range"
                                    defaultValue={0.15}
                                    value={outerPaddingSlider}
                                    min={0}
                                    max={0.9}
                                    step={0.01}
                                    onChange={(e) => setOuterPaddingSlider(e.target.value)}
                                    className='w-[12rem]'
                                />
                            </div>

                            <div className=' flex items-center justify-between gap-x-2 w-full'>
                                <p>Inner Padding</p> 
                                <input 
                                    type="range"
                                    defaultValue={0}
                                    value={innerPaddingSlider}
                                    min={0}
                                    max={10}
                                    step={1}
                                    onChange={(e) => setInnerPaddingSlider(e.target.value)}
                                    className='w-[12rem]'
                                />
                            </div>

                            <div className=' flex items-center justify-between gap-x-2 w-full'>
                                <p>Border Radius</p>
                                <input 
                                    type="range"
                                    defaultValue={0}
                                    value={borderRadius}
                                    min={0}
                                    max={40}
                                    step={1}
                                    onChange={(e) => setBorderRadius(e.target.value)}
                                    className='w-[12rem]'
                                />
                            </div>

                            <div className=' flex items-center justify-between gap-x-2 w-full'>
                                <p>Border Width</p>
                                <input 
                                    type="range"
                                    defaultValue={0}
                                    value={borderWidth}
                                    min={0}
                                    max={20}
                                    step={1}
                                    onChange={(e) => setBorderWidth(e.target.value)}
                                    className='w-[12rem]'
                                />
                            </div>
                        </div>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    )
}

export default BarChart
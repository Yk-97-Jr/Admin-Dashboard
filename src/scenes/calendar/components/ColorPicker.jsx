import { Radio, RadioGroup, FormControlLabel, Box, FormControl } from "@mui/material";

const ColorPicker = ({setBgColor, bgColor, setColoredText}) => {

    const handleColorChange = (event) => {
        const selectedColor = event.target.value;
        console.log(bgColor);

        if (selectedColor === "yellow") {
            setBgColor("#FFF97C");
            setColoredText("#504E10");
        } else if (selectedColor === "violet") {
            setBgColor("#BC9BFF");
            setColoredText("#470E65");
        } else if (selectedColor === "red") {
            setBgColor("#FF988E");
            setColoredText("#961200");
        } else if (selectedColor === "green") {
            setBgColor("#AEFF85");
            setColoredText("#277500");
        } else if (selectedColor === "blue") {
            setBgColor("#88C9FF");
            setColoredText("#00128D");
        }
    };

    return (
        <Box
        sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-evenly",
            gap: ".4rem",
            backgroundColor: '#082F4F',
            py: ".3rem",
            pl: "1.6rem",
            borderRadius: "10px",
            maxWidth: '25rem',
        }}>
            <FormControl>
                <RadioGroup row onChange={handleColorChange}>
                    <FormControlLabel 
                    value="yellow"
                    control={
                        <Radio sx={{ 
                            color: '#FFF97C', 
                            scale: '1.4',
                            '&.Mui-checked': {
                                color: '#FFF97C',
                            } 
                        }}/>
                    }/>

                    <FormControlLabel
                    value="violet"
                    control={
                        <Radio sx={{ 
                            color: "#DE9EFF", 
                            scale: '1.4',
                            '&.Mui-checked': {
                                color: '#DE9EFF',
                            }
                        }}/>
                    }/>

                    <FormControlLabel
                    value="red"
                    control={
                        <Radio sx={{ 
                            color: "#FF7B6E", 
                            scale: '1.4',
                            '&.Mui-checked': {
                                color: '#FF7B6E'
                            }
                        }}/>
                    }/>

                    <FormControlLabel
                    value="green"
                    control={
                        <Radio sx={{ 
                            color: "#99FF53", 
                            scale: '1.4',
                            '&.Mui-checked': {
                                color: '#99FF53'
                            }
                        }}/>
                    }/>

                    <FormControlLabel
                    value="blue"
                    control={
                        <Radio sx={{ 
                            color: "#88C9FF", 
                            scale: '1.4',
                            '&.Mui-checked': {
                                color: '#88C9FF'
                            }
                        }}/>
                    }/>
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export default ColorPicker;
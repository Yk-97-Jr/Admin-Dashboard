import * as React from 'react';
import { orange, pink, red, yellow } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import { FormControlLabel } from '@mui/material';

export default function EventTypeRadioButtons({ isAllDay, setIsAllDay }) {

    const controlProps = (item) => ({
        checked: isAllDay === item,
        onChange: () => setIsAllDay(item),
        value: item,
        name: 'event-type-radio-button',
        inputProps: { 'aria-label': item },
    });

  return (
    <div className='w-full flex items-center justify-between'>
        <FormControlLabel
            control={
                <Radio {...controlProps(true)} 
                sx={{
                    color: red[200],
                    scale: '1.3',
                    '&.Mui-checked': {
                        color: orange[600],
                    }
                }}/>
            }
            label='ALL DAY EVENT'
        />
        <FormControlLabel
            control={
                <Radio {...controlProps(false)} 
                sx={{
                    color: pink[200],
                    scale: '1.3',
                    '&.Mui-checked': {
                        color: yellow[600],
                    }
                }}/>
            }
            label="TIME SPANNED EVENT"
        />
    </div>
  );
}

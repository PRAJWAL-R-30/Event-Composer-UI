//Methods which are shared among unrelated components

import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

//default styling for text Field
export const textFieldStyle = {
  "& label.Mui-focused": {
    color: "#C56E33",
  },
  "& svg.Mui-focused": {
    color: "#C56E33",
  },
  "& input.Mui-focused": {
    color: "#C56E33",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#E6B17E",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E6B17E",
    },
    "&:hover fieldset": {
      borderColor: "#C56E33",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#C56E33",
    },
  },
};

//Method to Convert Integer to Rupee Format (100000 -> 1,00,000)
export const convertToRupeesFormat = (amount) => {
  const formatter = new Intl.NumberFormat("en-IN");
  const rawValue = amount.toString().replace(/[^\d.-]/g, "");
  if (amount === "") {
    return 0;
  } else {
    return formatter.format(parseFloat(rawValue));
  }
};

export const reverseRupeesFormat = (formattedValue) => {
    const num = Number(formattedValue.replace(/,/g, ""));
    return num;
  };
  
//Method to capitalise the first letter of the string
export const capitaliseFirstLetter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const handleTimeChange = (time, date) => {
  const newDate = new Date(date);
  newDate.setHours(time._d.getHours());
  newDate.setMinutes(time._d.getMinutes());
  return newDate;
};

//Common Input field for Budget
export const budgetInput = (label, value, onChange) => (
  <FormControl sx={textFieldStyle} className="text-field">
    <InputLabel htmlFor="outlined-adornment-amount">{label}</InputLabel>
    <OutlinedInput
      id="outlined-adornment-amount"
      startAdornment={
        <InputAdornment position="start">
          <p>&#8377;</p>
        </InputAdornment>
      }
      label={label}
      type="text"
      value={!Number.isNaN(value) ? convertToRupeesFormat(value) : 0}
      onChange={onChange}
    />
  </FormControl>
);

//Common Input field for Date
export const DateInput = (value, onChange) => (
  <DatePicker
    disablePast
    required={false}
    label="Date"
    orientation="landscape"
    openTo="day"
    views={["year", "month", "day"]}
    value={value}
    error={false}
    renderInput={(params) => (
      <TextField
        {...params}
        sx={{ ...textFieldStyle }}
        className="text-field"
      />
    )}
    InputLabelProps={{
      shrink: true,
    }}
    onChange={onChange}
  />
);

//Common Input field for Time
export const TimeInput = (value, onChange) => (
  <TimePicker
    label="Time"
    value={value}
    onChange={onChange}
    renderInput={(params) => (
      <TextField
        {...params}
        sx={{ ...textFieldStyle }}
        className="text-field"
      />
    )}
  />
);

//General time format
export const timeOptions = {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

//Returns date in String format
export const getDate = (date) => {
  let dateObj = new Date(date);
  const dateString = dateObj.toDateString();
  return dateString;
};

//Returns time in timeOptions format
export const getTime = (date) => {
  let dateObj = new Date(date);
  const timeString = dateObj.toLocaleTimeString("en-US", timeOptions);
  return timeString;
};
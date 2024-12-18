import * as React from "react";
import dayjs from "dayjs";
import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";

function TimeDatePicker({ date, setDate }) {
  const [value, setValue] = useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <DateTimePicker
          label="Basic date time picker"
          maxTime={dayjs().set("hour", 18).startOf("hour")}
          minTime={dayjs().set("hour", 9).startOf("hour")}
          selected={date}
          onChange={(e) =>
            setDate(moment(e.toDate()).format("MM/DD/YYYY HH:mm"))
          }
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default TimeDatePicker;

// <div>
//       <TimePicker
// minTime="1:00am"
//           maxTime="4:30pm"
//         onChange={this.handleTimeChange}
//         timeValue={this.state.timeValue}
//         name="timeField"
//       />
//     </div>

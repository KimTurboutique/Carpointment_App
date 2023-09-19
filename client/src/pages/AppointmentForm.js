import { useState, useEffect } from "react";
import Dropdown from "../modules/components/ModelYearSelect";
import DatePicker from "../modules/components/DatePicker.js"
import Typography from '../../src/modules/components/Typography.js';
import Button from '../../src/modules/components/Button.js';
import { useMutation } from "@apollo/client";
import { ADD_APPT } from "../utils/Mutations";

export default function MakeAppt() {

  const [addAppointment, { error }] = useMutation(ADD_APPT);

  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  const [dateState, setDateState] = useState(getDate());
  const [formState, setFormState] = useState({
    startDate: "",
    workRequest: "",
  });

  const [formattedTimestamps, setFormattedTimestamps] = useState({
    start: "08:00:00",
  });

  useEffect(() => {
    const { startDate } = formState;
    if (startDate && dateState) {

      const formattedStart = `${dateState}T${startDate}`;

      setFormattedTimestamps({
        start: formattedStart,
      });
    }
  }, [formState, dateState]);

  function getDate() {
    var now = new Date();
    var month = now.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var day = now.getDate();
    if (day < 10) day = "0" + day;
    var today = now.getFullYear() + "-" + month + "-" + day;
    return today;
  }

  const handleYearChange = (year) => setYear(year);
  const handleModelChange = (model) => setModel(model);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "dateState") {
      setDateState(value);
    }
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await addAppointment({
        variables: {
          startDate: formattedTimestamps.start,
          workRequest: formState.workRequest,
          model,
          year

        }
      })
      console.log(data);
      window.location.assign('/profile')
    } catch (error) {
      console.log(error)
    }
  }

  if (error) return <h2>{error.message}</h2>
  return (
    <>
      <form>
        <DatePicker
        name="dateState"
        value={dateState}
        onChange={handleChange}
        type="date"
        ></DatePicker>
        {/* <input
          name="dateState"
          value={dateState}
          onChange={handleChange}
          type="date"
        /> */}
        <div className="input-group">
          <br />
          <Typography className="input-group-text">Time</Typography>
          <select
            className="form-control"
            onChange={handleChange}
            name="startDate"
            id="exampleFormControlSelect1"
          >
            <option value={`08:00:00`}>8:00am</option>
            <option value={`08:30:00`}>8:30am</option>
            <option value={`09:00:00`}>9:00am</option>
            <option value={`09:30:00`}>9:30am</option>
            <option value={`10:00:00`}>10:00am</option>
            <option value={`10:30:00`}>10:30am</option>
            <option value={`11:00:00`}>11:00am</option>
            <option value={`11:30:00`}>11:30am</option>
            <option value={`12:00:00`}>12:00pm</option>
            <option value={`12:30:00`}>12:30pm</option>
            <option value={`01:00:00`}>1:00pm</option>
            <option value={`01:30:00`}>1:30pm</option>
            <option value={`02:00:00`}>2:00pm</option>
            <option value={`02:30:00`}>2:30pm</option>
            <option value={`03:00:00`}>3:00pm</option>
            <option value={`03:30:00`}>3:30pm</option>
            <option value={`04:00:00`}>4:00pm</option>
            <option value={`04:30:00`}>4:30pm</option>
          </select>
        </div>
        <br />
        <Typography>How Can We Help?</Typography>
        <textarea
          type="text"
          placeholder="Diagnostics, oil change..."
          value={formState.workRequest}
          onChange={handleChange}
          name="workRequest"
        ></textarea>

        <br />
        <Dropdown
          year={year}
          model={model}
          handleYearChange={handleYearChange}
          handleModelChange={handleModelChange}
        />
        <br />
        <Button type='submit' onClick={handleSubmit}
          color="secondary"
          variant="contained"
          size="large"
          sx={{minWidth: 200}}
          component="a"
          >Request Appointment</Button>
      </form>

    </>
  );
}

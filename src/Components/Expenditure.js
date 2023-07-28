import React from "react";
import "./css/Expenditure.css";

import TextField from "@mui/material/TextField";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Button from "@mui/material/Button";

function Expenditure(props) {
  return (
    <div className="Expenditure">
      <p>Expenditure</p>
      <div className="Expenditure-container">
        {props.expenditures.length === 0 ? (
          <p className="note-paragraph">No Expenditures are created</p>
        ) : null}
        {props.expenditures.map((item, index) => (
          <div key={index} className="sub-event-form">
            <p className="serial-number">{index + 1}.</p>
            <TextField
              sx={props.textFieldStyle}
              label="Description"
              variant="outlined"
              className="text-field"
              value={item.description}
              onChange={(e) => {
                props.onExpChange(
                  index,
                  "description",
                  props.capitaliseFirstLetter(e.target.value)
                );
              }}
            />

            {props.budgetInput("Amount", item.amount, (e) => {
              props.onExpChange(
                index,
                "amount",
                props.reverseRupeesFormat(e.target.value)
              );
            })}

            <TextField
              sx={props.textFieldStyle}
              label="Remarks"
              variant="outlined"
              className="text-field"
              value={item.remarks}
              multiline
              onChange={(e) => {
                props.onExpChange(
                  index,
                  "remarks",
                  props.capitaliseFirstLetter(e.target.value)
                );
              }}
            />

            <DeleteOutlinedIcon
              className="delete-icon"
              onClick={() => props.deleteExp(index)}
            />
          </div>
        ))}
        <Button
          className="add-button"
          variant="contained"
          onClick={props.onAddExp}
        >
          + Add Sub-Event
        </Button>
      </div>
    </div>
  );
}

export default Expenditure;

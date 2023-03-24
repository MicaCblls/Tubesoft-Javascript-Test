import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  useTheme,
} from "@material-ui/core";
import * as React from "react";

export function RadioButtonsColorGroup({ color }) {
  const theme = useTheme();
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        Choose a color:{" "}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        {color.split(",").map((color, index) => (
          <FormControlLabel
            key={index}
            value={color}
            control={<Radio />}
            label={color.toUpperCase()}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
export function RadioButtonsSizeGroup({ size }) {
  const theme = useTheme();
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        Choose your size:{" "}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        {size.split(",").map((size, index) => (
          <FormControlLabel
            key={index}
            value={size.trim()}
            control={<Radio />}
            label={size}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

"use client";

import { FilterState } from "@/components/Filters/Filter/Filter";
import { Slider } from "@mui/material";
import styles from "./Range.module.css";

type RangeProps = {
  min: number;
  max: number;
  name: string;
  stepValue: number;
  value: [number, number];
  fieldName: keyof FilterState;
  onChange: (field: keyof FilterState, value: any) => void;
};

export default function Range({
  min,
  max,
  name,
  stepValue,
  value,
  fieldName,
  onChange,
}: RangeProps) {
  return (
    <div>
      <p>
        {name}: {value[0]} - {value[1]}
      </p>
      <Slider
        value={value}
        onChange={(_, val) => onChange(fieldName, val as [number, number])}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        step={stepValue}
        sx={{
          color: "#e50914", // Цвет трека
          height: 4, // Толщина трека
          "& .MuiSlider-thumb": {
            backgroundColor: "#e50914",
            width: 16,
            height: 16,
            border: "2px solid white",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            "&:hover, &.Mui-active": {
              boxShadow: "0 0 0 8px rgba(229, 9, 20, 0.1)",
            },
            "&.Mui-active": {
              boxShadow: "0 0 0 12px rgba(229, 9, 20, 0.2)",
            },
          },
          "& .MuiSlider-rail": {
            backgroundColor: "#ccc",
            opacity: 0.8,
            height: 4,
          },
          "& .MuiSlider-valueLabel": {
            backgroundColor: "#e50914",
            color: "white",
            fontWeight: "bold",
          },
        }}
      />
    </div>
  );
}

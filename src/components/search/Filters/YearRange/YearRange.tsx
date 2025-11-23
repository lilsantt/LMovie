"use client";

import { Slider } from "@mui/material";
import { useState } from "react";

export default function YearRange() {
  const [range, setRange] = useState<[number, number]>([1950, 2025]);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setRange(newValue as [number, number]);
  };

  return (
    <div>
      <p>
        Дата выпуска: {range[0]} - {range[1]}
      </p>
      <Slider
        value={range}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={1950}
        max={2025}
        step={1}
      />
    </div>
  );
}

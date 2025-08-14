"use client";

import { Slider } from "@mui/material";
import { useState } from "react";

export default function RatingRange() {
  const [range, setRange] = useState<[number, number]>([0, 10]);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setRange(newValue as [number, number]);
  };

  return (
    <div>
      <p>
        Рейтинг: {range[0]} - {range[1]}
      </p>
      <Slider
        value={range}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={10}
        step={0.1}
      />
    </div>
  );
}

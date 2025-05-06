import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

interface PriceSliderProps {
  handleChange: (event: Event, value: number[], activeThumb: number) => void;
  value: number[];
}

function valuetext(value: number) {
  return `R${value}`;
}

export default function PriceSlider({ handleChange, value }: PriceSliderProps) {
  return (
    <Box sx={{ width: 300 }}>
      <p>Price: </p>
      <Slider
        getAriaLabel={() => "Minimum Price"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        min={0}
        max={1000}
      />
    </Box>
  );
}

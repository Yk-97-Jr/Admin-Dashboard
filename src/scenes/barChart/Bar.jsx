import { Box } from "@mui/material";
import Header from '../../Components/Header'
import BarChart from "../../Components/BarChart";

const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box>
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;

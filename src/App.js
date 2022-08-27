import "./App.css";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

const socket = io("http://localhost:5000");

function App() {
  const [count, setCount] = useState({
    count1: 0,
    count2: 0,
    count3: 0,
  });
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    socket.on("click", (payload) => {
      setCount({ ...payload });
    });
  }, [count]);
  console.log(isDisabled);
  const handleClick1 = () => {
    setCount({ ...count, count1: count["count1"] + 1 });
    socket.emit("click", { ...count, count1: count.count1 + 1 });
  };
  const handleClick2 = () => {
    setCount({ ...count, count2: count["count2"] + 1 });
    socket.emit("click", { ...count, count2: count.count2 + 1 });
  };
  const handleClick3 = () => {
    setCount({ ...count, count3: count["count3"] + 1 });
    socket.emit("click", { ...count, count3: count.count3 + 1 });
  };
  const handleSubmit = async () => {
    setIsDisabled(true);
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/create-button-click`,
      { count: Object.values(count) }
    );
    if (data.success) {
      setIsDisabled(false);
    }
  };

  return (
    <div className="App" name="click">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={3}>
            <h2>{count.count1}</h2>
            <Button variant="contained" onClick={handleClick1}>
              Button 1
            </Button>
          </Grid>
          <Grid xs={3}>
            <h2>{count.count2}</h2>
            <Button variant="contained" onClick={handleClick2}>
              Button 2
            </Button>
          </Grid>
          <Grid xs={3}>
            <h2>{count.count3}</h2>
            <Button variant="contained" onClick={handleClick3}>
              Button 3
            </Button>
          </Grid>
          <Grid xs={3}>
            <br />
            <br />
            <br />
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isDisabled}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;

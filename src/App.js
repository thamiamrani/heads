import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import './App.css';
import amine from './amine.png';
import anes from './anes.png'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


function App() {
  const [result, setResult] = useState("Heads")
  const [history, setHistory] = useState([])
  const [percentage, setPercentage] = useState([0, 0, 0, 0])
  useEffect(() => {
    computePercentage();
  }, [history]);


  function headsOrTails() {
    var ranResult = Math.floor(Math.random() * 2) === 1 ? "Heads" : "Tails";
    setResult(ranResult);
    appendHistory(ranResult);
  }

  function appendHistory(result) {
    setHistory([...history, { r: result }]);
  }

  function computePercentage() {
    console.log(history)
    let h = 0;
    history.forEach((item) => {
      if (item.r === "Heads") {
        h++;
      }
    })
    const hPercentage = (h * 100) / history.length;
    setPercentage([hPercentage, 100 - hPercentage, h, history.length - h]);
  }

  return (
    <div className="App">
      <h1>Site de Heads</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '-40px', margin: '-50px' }}>
        {
          result === "Heads" ? (<img src={amine} alt='amine' />) : (<img src={anes} alt='anes' />)
        }
      </div>
      <h2>{result}</h2>
      <Button variant="contained" color="success" onClick={headsOrTails}>
        Flip</Button>
      <h2>Percentage</h2>
      <Stack direction="row" spacing={2}
        alignItems="center"
        justifyContent="center">
        <Chip size="medium" label={`Heads: ${percentage[0].toFixed(2)} % | ${percentage[2]}`} color='primary' sx={{ fontSize: '22px', padding: '15px' }} />
        <Chip size="medium" label={`Tails: ${percentage[1].toFixed(2)} % | ${percentage[3]}`} color='warning' sx={{ fontSize: '22px', padding: '15px' }} />
      </Stack>
      <h3>
        Total: {history.length}
      </h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>History</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((h, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  {h.r}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;

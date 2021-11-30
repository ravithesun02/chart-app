import logo from './logo.svg';
import './App.css';
import { Card, CardContent, Grid, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import {getInitialData, updateValue} from './actions/chartActions'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function App() {

  const dispatch = useDispatch();
  const state = useSelector(state => state.chartData);

  useEffect(async()=>{

  dispatch(getInitialData());
  console.log(state);

  },[]);


  const editValue=(itemIndex,arrayIndex,value)=>{

    dispatch(updateValue(itemIndex,arrayIndex,value));

  }

  return (
    <div>
      <Grid container spacing={2}>

        {
          state.loading && <p>
            Loading .....
          </p>
        }
      
      { !state.loading &&
        state.data.map((item,ItemIndex)=>{
          if(item.type === "Bar") {
            return (
              <Grid key={ItemIndex} item xs={12} md={6}>
                <Card variant="outlined">
                 <CardContent>
                   <Grid container item xs={12} md={12}>
                     {
                       item.elements.map((values,ArrayIndex)=>{
                          return(<Grid key={ArrayIndex} item xs={12} md={6}>
                            <TextField onChange={(e)=>{
                              editValue(ItemIndex,ArrayIndex,e.target.value)
                            }} value={values} type="number" />
                          </Grid>)
                       })
                     }

                   </Grid>
                   <Grid container item xs={12} md={12}>
                     <Bar data = {item.data} redraw key={Math.random()} />
                   </Grid>
                 </CardContent>

                </Card>
              </Grid>
            )
          }
          else if(item.type === "Pie") {
            return (
              <Grid key={ItemIndex} item xs={12} md={6}>
                <Card variant="outlined">
                 <CardContent>
                   <Grid container item xs={12} md={12}>
                     {
                       item.elements.map((values,ArrayIndex)=>{
                          return(<Grid key={ArrayIndex} item xs={12} md={6}>
                            <TextField onChange={(e)=>{
                              editValue(ItemIndex,ArrayIndex,e.target.value)
                            }} value={values} type="number" />
                          </Grid>)
                       })
                     }

                   </Grid>
                   <Grid container item xs={12} md={12}>
                     <Pie data={item.data} redraw key={Math.random()} />
                   </Grid>
                 </CardContent>

                </Card>
              </Grid>
            )
          }
        })
      }

      </Grid>

    </div>
  );
}

export default App;

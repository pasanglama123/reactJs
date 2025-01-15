import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News   from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize = 15;
  apiKey = process.env.REACT_APP_NEWS_API;
  state = {
    progress:0
  }

  setProgress = (progress)=> {
    this.setState({progress:progress})
  }

  render() {
    return (
      <div> 
       <Router>
       <Navbar/>
       <LoadingBar
        height= {3}
        color="#f11946"
        progress={this.state.progress}
      />
         <Routes>
           <Route path="/" element={<Navigate to="/sports" replace />} />
           <Route  path ="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} key="business" country="us" category="business"/>}></Route> 
           <Route exact path ="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey}   pageSize={this.pageSize} key="sports" country="us" category="sports"/>}/>
           <Route exact path ="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey}   pageSize={this.pageSize} key="technology" country="us" category="technology"/>}/>
           <Route exact path ="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey}   pageSize={this.pageSize} key="science" country="us" category="science"/>}/>
           <Route exact path ="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey}   pageSize={this.pageSize} key="health" country="us" category="health"/>}/>
           <Route exact path ="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey}   pageSize={this.pageSize} key="entertainment" country="us" category="entertainment"/>}/>

        </Routes>
       </Router>
      </div>
    )
  }
} 




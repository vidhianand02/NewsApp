
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


export default class App extends Component {
  apiKey=process.env.REACT_APP_NEWS_API
  render() {
    return (
      <BrowserRouter>
       <Navbar/>
      <div>
       
      <Routes>
        <Route exact path="/" element={<News apiKey={this.apiKey} key='general' pageSize={8} country = 'in' category = 'general'/>} />
        <Route exact path="/business" element={<News apiKey={this.apiKey} key='business' pageSize={8} country = 'in' category = 'business'/>} />
        <Route exact path="/entertainment" element={<News apiKey={this.apiKey} key='entertainment' pageSize={8} country = 'in' category = 'entertainment'/>} />
        <Route exact path="/health" element={<News apiKey={this.apiKey} key='health' pageSize={8} country = 'in' category = 'health'/>} />
        <Route exact path="/science" element={<News apiKey={this.apiKey} key='science' pageSize={8} country = 'in' category = 'science'/>} />
        <Route exact path="/sports" element={<News apiKey={this.apiKey} key='sports' pageSize={8} country = 'in' category = 'sports'/>} />
        <Route exact path="/technology" element={<News apiKey={this.apiKey} key='technology' pageSize={8} country = 'in' category = 'technology'/>} />
        </Routes>
        </div>
       </BrowserRouter> 
    )
  }
}


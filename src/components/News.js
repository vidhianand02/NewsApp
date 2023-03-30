import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps={
    country:'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
   capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
} 
  constructor(props) {
    super(props);
    console.log("Hello vidhi!");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewsTurtle`;
  }
  async updateNews(pageNo){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ articles: parsedData.articles,
       totalResults: parsedData.totalResults,
      loading: false })

  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=64932b755ffd4fb8b0db54b21438587d&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ articles: parsedData.articles,
       totalResults: parsedData.totalResults,
      loading: false })
  }
  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=64932b755ffd4fb8b0db54b21438587d&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })



  }
  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) ){
   
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=64932b755ffd4fb8b0db54b21438587d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json()
     
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })

    }


  }

  fetchMoreData =  async () => {   
    this.setState({page: this.state.page+1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=64932b755ffd4fb8b0db54b21438587d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
       articles: this.state.articles.concat(parsedData.articles),
       totalResults: parsedData.totalResults
     })
  };


  render() {
    return (
     <>
        <h1 className="text-center" style={{margin:'35px 0px'}}>NewsTurtle - Top  {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
       {this.state.loading && <Spinner />}

        <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                > 
              <div className="container">

        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {

            return <div className="col md-4" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author=
              {element.author} date={element.publishedAt} />
            </div>
          })}
        </div>
       </div>
        </InfiniteScroll>

      </>
    )
  }
}

export default News
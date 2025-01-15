import React, { Component } from 'react'
import NewsItem from './NewsItem.js'
import Spinner from './Spinner.js';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: 'us',
    pageSize: 6,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }


  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    }
    document.title = `${this.capitalizeCharacter(this.props.category)} - NewsMonkeyf`;
  }

  capitalizeCharacter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async updateNews() {
    this.props.setProgress(7)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true }) 
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json();
    this.props.setProgress(60)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e64742add9aa4b3c9a1e7856751e5c65&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData =await  data.json();
    // this.setState({
    //   articles: parsedData.articles, 
    //   totalResults :parsedData.totalResults,
    //   loading: false
    // });
    this.updateNews();
  }

  handlePreviousClick = async () => {
    // console.log("Previous click");

    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e64742add9aa4b3c9a1e7856751e5c65&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData =await  data.json();
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // });
    this.setState({
      page: this.state.page - 1
    });
    this.updateNews();
  }


  handleNextClick = async () => {
    // if(this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize)) {

    // }else {
    //      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e64742add9aa4b3c9a1e7856751e5c65&page=${this.state.page + 1 }&pageSize=${this.props.pageSize}`;
    //      this.setState({loading: true});
    //      let data = await fetch(url);
    //      let parsedData =await  data.json();
    //      console.log(parsedData);
    //      this.setState({
    //        page: this.state.page + 1,
    //        articles: parsedData.articles,
    //        loading: false
    //   }); 
    // }
    this.setState({
      page: this.state.page + 1
    });
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({page:this.state.page + 1});
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true }) spinner is load through the  infiniteScroll so it is disabled
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      // loading: false
    });
  }


  render() {
    return (
      <>
        <h2 className='text-center my-4'>NewsMonkey -  {this.capitalizeCharacter(this.props.category)} Top Headlines</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length} 
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
          {/* {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key = {element.url}>
              <NewsItem title={element.title} description={element.description} imgUrl={!element.urlToImage?"https://thehill.com/wp-content/uploads/sites/2/2025/01/AP20021521632889-e1736261655802.jpg?w=${this.state.page}280":element.urlToImage} newsUrl={element.url} author={element.author}  date={element.publishedAt} source={element.source.name}/>
            </div> 
            })} */}

          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title} description={element.description} imgUrl={!element.urlToImage ? "https://thehill.com/wp-content/uploads/sites/2/2025/01/AP20021521632889-e1736261655802.jpg?w=${this.state.page}280" : element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
          })}
        </div>
        </div>
        </InfiniteScroll> 
        {/* <div className="container d-flex justify-content-between">
           <button type="button" disabled = {this.state.page <= 1} className="btn btn-dark" onClick={this.handlePreviousClick} >&larr; Previous</button>
           
           <button type="button" disabled = {this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News
import React, { Component } from 'react'

export class NewsItem extends Component {


  render() {
    let { title, description, newsSource, imageUrl, newsUrl,author,date } = this.props;

    return (

      <div className="card" style={{ width: '18rem', backgroundColor: '#2b3035', color: 'white', border: '4px solid white' }}>
          <img src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown": author} on {new Date (date).toGMTString()}</small></p>

            <p className="card-text"><small className="text-white" >Source: {newsSource}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-secondary">Get Details!</a>
          </div>
        </div>
     
    )
  }
}

export default NewsItem
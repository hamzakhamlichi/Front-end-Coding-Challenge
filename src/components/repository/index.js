import React from 'react'
import fetch from 'isomorphic-fetch'
import Repository from './Repository'

class ReposListe extends React.Component {
  state = {
    items: [],
    per_page: 10,
    page: 1,
    sort: 'stars',
    order: 'DESC',
    totalPages: 10,
    scrolling: false,
    
  }
  
  componentWillMount() {
    this.loadRepos()
    this.scrollListener = window.addEventListener('scroll', (e) => {
      this.handleScroll(e)
    })
  }
  
  handleScroll = () => {
    const { scrolling,page,totalPages} = this.state
    if (scrolling) return
    if (totalPages <= page) return
    var lastLi = document.querySelector('ul.repositories > li:last-child')
    var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight
    var pageOffset = window.pageYOffset + window.innerHeight
    var bottomOffset = 20
    if (pageOffset > lastLiOffset - bottomOffset) {
      this.loadMore()
    }
    
  }

  loadRepos = () => {
    let currentDate = new Date(),
        day   = ('0'+(currentDate.getDate())).slice(-2),
        month = ('0'+(currentDate.getMonth())).slice(-2),
        year  = currentDate.getFullYear()
    const dateNewFormat = year+'-'+month+'-'+day,
          { per_page, page, items , sort ,order } = this.state,
          url = `https://api.github.com/search/repositories?q=created:>${dateNewFormat}&per_page=${per_page}&page=${page}&sort=${sort}&order=${order}`
    fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server ");
        }
        return response.json();
      })
      .then(json => this.setState({
        items: [...items, ...json.items],
        scrolling: false
      }))
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      scrolling: true,
    }), this.loadRepos)
  }
  
  render() {
    return(
      <section className="section">
        <div className="container">
          <div className="row">
             <ul className="repositories">
              {
                this.state.items.map(item => <li key={item.id}>
                  <Repository {...item} />
                </li>)
              }
             </ul>
          </div>
        </div>
      </section>
    )
  }
}

export default ReposListe
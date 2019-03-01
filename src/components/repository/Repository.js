import React from 'react'

const Repository = (props) => {
  let createdAt =  props.created_at.substring(0, 10).replace(new RegExp('-', 'g'), '/'),
      currentDate = new Date(),
      day   = ('0'+(currentDate.getDate())).slice(-2),
      month = ('0'+(currentDate.getMonth()+1)).slice(-2),
      year  = currentDate.getFullYear(),
      dateNewFormat = year+'/'+month+'/'+day
  return(
    <>
      <div className="col-md-3">
        <div className="img-owner">
            <a href={props.owner.html_url} target="_blank" rel="noopener noreferrer">
              <img src={props.owner.avatar_url} className="img-responsive" alt={props.owner.login}/>
            </a>
        </div>
      </div>
      <div className="col-md-9">
        <h2 className="h2-1" title={props.full_name}><a href={props.html_url} target="_blank" rel="noopener noreferrer">{props.full_name}</a></h2>
        <p>{props.description}</p>
        <div className="footer-repository">
          <span className="starts-number">Starts : <b>{props.stargazers_count}</b></span> 
          <span className="issues-number">Issues : <b>{props.open_issues}</b></span>
          <span className="info-txt">Submitted <b>{datediff(parseDate(dateNewFormat), parseDate(createdAt))}</b> days ago by <a href={props.owner.html_url} target="_blank" rel="noopener noreferrer"><b>{props.owner.login}</b></a> </span>
        </div>
      </div>
    </>
  )

}
export default Repository

const parseDate = (str) => {
  var mdy = str.split('/');
  return new Date(mdy[0], mdy[1]-1,mdy[2] );
}
const datediff = (second,first) => {
  return Math.round((second - first)/(1000*60*60*24));
}


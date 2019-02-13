import React, {Component} from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'
import {prevpage, nextpage} from '../actions'

class SearchResult extends Component {
	prevpage = () => {
		this.props.dispatch(prevpage())
	}

	nextpage = () => {
		this.props.dispatch(nextpage())
	}

  render () {
    const {issues, currPageIndex} = this.props
    return (
      <div>
        <ul className="list-group mb-4">
          { issues ? issues.map(issue => issue === null ? '' : (
           <li key={issue.id} className="list-group-item d-flex justify-content-between align-items-center">
						<Link href={{ 
													pathname: '/details', 
													query: { title: `${issue.title}`, 
													date: `${issue.created_at}`, body: `${issue.body}`}}} >
							<a>{issue.title}</a>
						</Link>
						<span className="badge badge-success badge-pill">{issue.state}</span>
					 </li>
          ))
          : <p>{'No issues selected'}</p>
          }
        </ul>  
				<div className="card border-primary mb-3">
					<ul className="list-group">
						<li className="list-group-item d-flex justify-content-between align-items-center">
							<div className="card-header">
							<a className="page-link" href="#" onClick={this.prevpage}>&laquo; Prev</a>
							</div>
							<div> 
								<h2>Page {currPageIndex}</h2>
							</div>	
							<div className="card-header">
							<a className="page-link" href="#" onClick={this.nextpage}>&raquo; Next</a>
							</div>
						 </li>
					  </ul>
				 </div>
      </div>
    )
  }
}

const mapStateToProps = ({issues, currPageIndex}) => ({issues, currPageIndex})
export default connect(mapStateToProps)(SearchResult)

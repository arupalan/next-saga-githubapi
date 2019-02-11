import {withRouter} from 'next/router'
import Link from 'next/link'

const Details = withRouter((props) => (

    <div>
			<button type='submit' className="btn btn-info mt-4 mb-4">
        <Link href='/'>
				&laquo;  Back to search result
				</Link>
			</button>
			<div className="card border-secondary mb-3">
        <ul className="list-group mb-4">
           <li className="list-group-item d-flex justify-content-between align-items-center">
							<div className="card-header">
								 {props.router.query.title}
							</div>
							<div className="card-header">
								 {props.router.query.date}
							</div>
					</li>
				 </ul>	
  			<div className="card-body">
           <p className="card-text"> {props.router.query.body} </p>
				</div>
			</div>		
    </div>
))

export default Details;

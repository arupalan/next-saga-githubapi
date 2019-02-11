import Link from 'next/link'
import {connect} from 'react-redux'

import SearchForm from '../components/search-form'
import SearchResult from '../components/search-result'

function Page ({error, title}) {
  return (
    <div>
      <h1>{title}</h1>
      <SearchForm />
			<SearchResult />
      {error &&
        <p style={{color: 'red'}}>
          Error: {error.message}
        </p>}
    </div>
  );
}

export default connect(state => state)(Page)

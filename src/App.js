import React, { useState, useEffect } from 'react'
import { useFetch } from './useFetch'
import Follower from './Follower'
function App() {
  const {loading, data} = useFetch()
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);
  // console.log(data, loading)

  useEffect(() => {
    if(loading) return;
    setFollowers(data[page])
  }, [loading,page]);

  const nextPage =() => {
    setPage((oldPage) => {
      let newPage = oldPage + 1;
      if (newPage > data.length - 1) {
        newPage = data.length - 1;
      }
      return newPage
    })
  }

  const prevPage =() => {
     setPage((oldPage) => {
      let newPage = oldPage - 1;
      if (newPage < 0) {
        newPage = 0;
      }
      return newPage
    })
  }

  return <main>
    <div className="section-title">
      <h1>{loading? 'Loadinng ...': 'Pagination'}</h1>
      <div className="underline"></div>
    </div>
    <section className="followers">
      <div className="container">
        {followers.map((follower) => {
          return <Follower key={follower.id} {...follower}/>
        })}
      </div>
      {!loading && <div className="btn-container">
        <button className={'prev-btn'} onClick={prevPage}>Prev</button>
        {data.map((item, index) => {
          return <button key={index} className={`${index === page?'page-btn active-btn': 'page-btn'}`}
                         onClick={() => setPage(index)}>
            {index + 1}
          </button>
        })}
        <button className={'next-btn'} onClick={nextPage}>Next</button>
      </div>}
    </section>
  </main>
}

export default App

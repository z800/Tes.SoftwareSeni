import React, { useState, useRef } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux'
import { userActions } from './redux/actions'

const Cari = (props) => {

   const [repoList, setRepoList] = useState([]);
   const [user, setUser] = useState([]);
   const usernamecari = useRef(null);

   const findUser = () => {
      let cari = usernamecari.current.value
       Axios.get(`https://api.github.com/users/${cari}/repos`)
       .then((res) => {
         console.log( res )
          localStorage.setItem('ignatius',res.data[0].owner.login)
          props.userActions(res.data[0].owner.login)
          setRepoList( res.data )
          setUser( res.data.owner )
       }).catch((err) => {
          console.log(err)
       })
   }

   return (
      <div>
          <div>
              <br />
              <input style={{width:'200px', textAlign:'center'}} ref={usernamecari} className="form-control" type="text" placeholder="Search Github Username" aria-label="Search" />
              <button type="button" onClick={findUser}>Search</button>
          </div>
          {
              repoList.length?
              <div>
                  <h3><strong>Repositories</strong></h3>
                  <table style={{marginLeft:'35vh'}} className="table table-bordered">
                      <thead>
                          <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Name</th>
                              <th scope="col">Full Name</th>
                              <th scope="col">HTML</th>
                          </tr>
                      </thead>
                      <tbody>
                          {
                            repoList.map((val,index) =>
                              <tr key={index}>
                                  <td>{val.id}</td>
                                  <td>{val.name}</td>
                                  <td>{val.full_name}</td>
                                  <td>{val.html_url}</td>
                              </tr>
                            )
                          }
                      </tbody>
                  </table>
              </div>
              :
              null
          }
      </div>
   );

}

const MapstateToprops = (state) =>{
    return{
      usernameR: state.usernameR
    }
  }

export default connect(MapstateToprops, {userActions})(Cari);

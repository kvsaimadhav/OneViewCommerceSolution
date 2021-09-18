import { match } from 'assert';
import React, {useEffect} from 'react';
import {useState} from 'react';
import { BrowserRouter as Router, Route, Link, useParams } from "react-router-dom";

function App() {
  const [items, setItems] = useState([]);
  const [searchTerm,setSearchTerm] = useState('');
  const Page = () => {
    const {id,name} = useParams();
    var url = "https://jsonplaceholder.typicode.com/posts?userId=" + id;
    const [userData, setUserData] = useState([]);
    useEffect(() => {
      getUserWithFetch();
    }, [])
    const getUserWithFetch = async () => {
      const response = await fetch(url);
      const jsonData = await response.json();
      setUserData(jsonData);
    };
    return (
      <div>
        <h3>{name}'s Posts:</h3>
        <table border ="1" cellpadding="0" cellspacing ="0" width="200px">
          <thead>
            <tr>
                <th>Title</th>
                <th>Body</th>
            </tr>
          </thead>
          {userData.map((iPage =>{
            return (
            <tbody>
              <tr>
                <td>{iPage.title}</td>
                <td>{iPage.body}</td>
              </tr>
            </tbody>
            );
          }))}
        </table>
      </div>
    );
  }
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
        }
      )
  }, [])
   return (
      <Router>
      <div>
        <center>
          <h2>One View Commerce Interview test</h2>
          <input type="text" placeholder="Search Name ..." onChange = {(event) => {setSearchTerm(event.target.value); }}/>
          <table border ="1" cellpadding="0" cellspacing ="0" width="200px">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>City</th> 
                <th>Company</th>
                <th>User Details</th>
              </tr>
            </thead>
          {items.filter((user) => {
            if(searchTerm === ''){
              return user
            }
            else if(user.name.toLowerCase().includes(searchTerm.toLowerCase())){
              return user
            }
          }).map((user=>{
            return( 
              <tbody>
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td> 
                  <td>{user.address.city}</td>
                  <td>{user.company.name}</td>
                  <td><Link to ={`/${user.id}/${user.name}`} >Page {user.id}</Link></td>
                </tr>
              </tbody>
                );
              })
            )}
          </table>
        </center>
        <center>
          <a href= "/">Refresh</a>
        </center>
        <center>
          <Route path='/:id/:name' component={Page} />
        </center>
      </div>
      </Router>
    );
}

export default App;

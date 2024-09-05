import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { orderBy } from 'lodash';

function App() {
  const [facts, setFacts] = useState([]);
  const [filterDate, setFilterDate] = useState('');

  // Palindrome code
  const demo = () => {
    let str = "fazil" //madam //malayalam
    let strCopy = str.toLowerCase();

    strCopy = strCopy.split('').reverse().join("")
    console.log("strCopy", strCopy);

    if (strCopy == str) {
      console.log("palindrome")
    } else {
      console.log("not palindrome");

    }
  }

  useEffect(() => {
    getData();
  }, []);

  //Get data from API
  const getData = () => {
    const url = "https://cat-fact.herokuapp.com/facts"
    axios.get(url).then((res) => {
      console.log("res", res.data);

      let apiResponse = [];

      if (res.data && res.data.length) {
        apiResponse = orderBy(res.data, 'createdAt', 'asc');
      }

      setFacts(apiResponse);

    }).catch((err) => console.log(err)
    )
  }

  //Checking the date handlers
  const dateHandler = () => {
    console.log("dateHandler");

    const filteredFacts = facts.filter(fact => {

      if (filterDate != '') {

        const factDate = moment(fact.createdAt).format('DD-MMM-YYYY');
        const filterDateMoment = moment(filterDate).format('DD-MMM-YYYY');

        return factDate == filterDateMoment;
      } else {
        return true;
      }
    });
    return filterDate ? filteredFacts : facts;
  }


  return (
    <div className="App">

      <div>
        <label htmlFor="filter-date">Filter by Date (YYYY-MM-DD): </label>
        <input
          id="filter-date"
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />

        <table >
          <thead>
            <tr>
              <th>S.No</th>
              <th>Fact</th>
              <th>Created Date</th>
            </tr>
          </thead>  
          <tbody>
            {dateHandler().map((fact, index) => (
              <tr key={fact._id}>
                <td>{index + 1}.</td>
                <td>{fact.text}</td>
                <td>{moment(fact.createdAt).format('DD-MM-YYYY')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
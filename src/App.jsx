import { useState, useEffect } from 'react';

const API_KEY = '609c6c02a83e2f0521051bed0d6da340';
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

// const cities = [
//   { name: 'Cairns', id: 2172797 },
//   { name: 'Los Angeles', id: 1705545 },
//   { name: 'Linjiang', id: 1796228 },
// ];

function App() {
  const [weathers, setWeaters] = useState([]);
  const [keyword, setKeyword] = useState('Cairns');

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    // Promise.all(cities.map(async(city)=>{
    //   const data1 = await fetch(`${BASE_URL}?id=${city.id}&appid=${API_KEY}`);
    //   const data11 = await data1.json();
    // }))

    const data1 = await fetch(`${BASE_URL}?id=2172797&appid=${API_KEY}`);
    const data11 = await data1.json();

    const data2 = await fetch(`${BASE_URL}?id=1705545&appid=${API_KEY}`);
    const data21 = await data2.json();

    const data3 = await fetch(`${BASE_URL}?id=1796228&appid=${API_KEY}`);
    const data31 = await data3.json();

    setWeaters([data11, data21, data31]);
  };

  console.log(weathers);
  return (
    <div className='App'>
      <h1>Weather App!!</h1>
      <select name='' id=''>
        <option value=''>select</option>
      </select>
      <div>
        <h3>table view</h3>
        {weathers
          .filter((a) => a.name === keyword)
          .map((a) => (
            <li>
              {a.name},{a.main.temp}
            </li>
          ))}
      </div>
    </div>
  );
}

export default App;

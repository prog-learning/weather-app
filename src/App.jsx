import { useState, useEffect } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&';

const cities = ['aomori', 'tokyo', 'saitama', 'aiti', 'nagasaki'];

function App() {
  const [weathers, setWeaters] = useState([]);
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const result = [];
    await Promise.all(
      cities.map(async (city) => {
        const fetchData = await fetch(`${BASE_URL}&q=${city}&appid=${API_KEY}`);
        const data = await fetchData.json();
        result.push(data);
      })
    );
    setWeaters(result);
  };

  const addKeyword = (value) => {
    if (keywords.includes(value)) return;
    setKeywords([...keywords, value]);
  };

  console.log(weathers);
  return (
    <div className='App'>
      <h1>Weather App!!</h1>
      <div>
        <h3>Filter keywords</h3>
        {weathers.map((weather) => {
          const { name, id } = weather;
          return (
            <button key={id} onClick={() => addKeyword(name)}>
              {name}
            </button>
          );
        })}
        <button onClick={() => setKeywords([])}>reset</button>
      </div>
      <br />
      <div>
        <span>Selected: </span>
        {keywords.map((keyword) => (
          <button id={keyword} disabled>
            {keyword}
          </button>
        ))}
      </div>
      <h3>Today's weather</h3>
      <table border='1'>
        <tbody>
          <tr align='center'>
            <td>場所</td>
            <td>天気</td>
            <td>気温</td>
            <td>湿度</td>
          </tr>
          {weathers
            .filter((weather) => {
              if (!keywords.length) return true;
              return keywords.includes(weather.name);
            })
            .map((weather) => (
              <tr key={weather.id}>
                <td>{weather.name}</td>
                <td>{weather.weather[0].main}</td>
                <td>{weather.main.temp}</td>
                <td>{weather.main.humidity}%</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={fetchAll}>reload</button>
    </div>
  );
}

export default App;

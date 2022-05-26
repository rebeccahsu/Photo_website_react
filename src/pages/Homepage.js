import React, {useState, useEffect} from 'react';
import Search from "../components/Search";
import Pics from "../components/Pics";

const Homepage = () => {
  const [input, setInput] = useState("");
  let [data, setData] = useState(null);
  let [page, setPage] = useState(1);
  // 為解決input有文字時，按下load more會依據input的值顯示
  let [currentSearch, setCurrentSearch] = useState("");
  const auth = "563492ad6f9170000100000174685cd75b3c4a419ed56a4999db0c47";
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const searchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=1`;

  // fetch data from pexels API
  const search = async(url) => {
    setPage(2);
    // 最一開始顯示的是 page=1，這裡先改成 2，按下 load more 才會抓到 page=2 的照片
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      }
    });
    let parsedData = await dataFetch.json();
    setData(parsedData.photos);
  };

  // load more picture
  const morepic = async () => {
    // 一種是原始狀態下load more，一種是search狀態下 load more
    let newURL;
    if (currentSearch === ""){
      newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    }
    setPage(page + 1);
    const dataFetch = await fetch(newURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      }
    });
    let parsedData = await dataFetch.json();
    setData(data.concat(parsedData.photos));
  };

  // fetch data when the page loads up 重新整理頁面會自動抓取照片
  useEffect(() => {
    search(initialURL);
  }, []);

  useEffect(() => {
    if (currentSearch === ""){
      search(initialURL);
    } else{
      search(searchURL);
    }
  }, [currentSearch]);
  
  return (
    <div style={{minHeight: "100vh"}}>
        <Search search={() => {
          // JS Closure 的影響
          setCurrentSearch(input);
          // console.log(currentSearch); //這邊會是還沒更新的input
          }}
          setInput={setInput}/>
        <div className="pics">
          {data &&
            data.map(d => {
              return <Pics data={d} key={d.id}/> 
          })}
        </div>

        <div className="morePic">
          <button onClick={morepic}>Load More</button>
        </div>
    </div>
  )
};

export default Homepage;
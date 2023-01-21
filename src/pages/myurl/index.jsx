import { useState,useEffect } from "react";
import postUrl from "../api/url";
import a from "../../styles/Home.module.css";
import ParticlesBack from "../particles";
export default function MyUrl() {
  const [url, setUrl] = useState();
  const [newUrl, setNewUrl] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encodedParams = new URLSearchParams();
    encodedParams.append("url", url);
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "d925b10bfemsh6fdd5b15f4ed795p1d61d2jsn6c66401d77ed",
        "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
      },
      body: encodedParams,
    };
    // const endpoint = `${process.env.NEXT_PUBLIC_HOST}`;
    // const response = await postUrl(endpoint, options);
    // console.log(response);

    fetch("https://url-shortener-service.p.rapidapi.com/shorten", options)
      .then((response) => response.json())
      .then((response) =>{ setNewUrl(response.result_url)})
      .catch((err) => console.error(err));
      console.log(newUrl)
  };
  const handleCopyButtonClick = () => {
    navigator.clipboard.writeText(newUrl);
  };
  return (
    <div className={a.homeContainer}>
 <ParticlesBack/>
      <div className={a.urlContainer}>
        <div className={a.head}>MyMiniUrl</div>
        <form onSubmit={handleSubmit} className={a.form}>
          <input
            type="text"
            required
            placeholder="Paste your url here"
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit">Short Url</button>
        </form>
{newUrl==undefined  ? (
  <>
  <div className={a.text}>Welcome, click on the button for a new url</div>
  </>
) :
   (
        <div className={a.form}>
          <input
            type="text"
            disabled
            placeholder="New url will appear here"
            value={newUrl}
          ></input>
          <button onClick={handleCopyButtonClick}>Copy Url</button>
        </div>
  )
}   
      </div>
    </div>
  );
}

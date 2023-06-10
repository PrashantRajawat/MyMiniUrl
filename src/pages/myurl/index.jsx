import { useState, useEffect } from "react";
import a from "../../styles/Home.module.css";
import ParticlesBack from "./particles";
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
        "X-RapidAPI-Key": `${process.env.NEXT_PUBLIC_APIKEY}`,
        "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
      },
      body: encodedParams,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}`, options);
      const data = await response.json();
      // console.log(data.result_url);
      setNewUrl(data.result_url);
    } catch (err) {
      console.error(err);
    }
  };
  const handleCopyButtonClick = () => {
    navigator.clipboard.writeText(newUrl);
    alert("Yoohoo!  🎉  Url Copied");
  };
  return (
    <div className={a.homeContainer}>
      <ParticlesBack />
      <div className={a.cloud}>
        <div>
          <div className={a.head}>Shortify</div>
          <form onSubmit={handleSubmit} className={a.form}>
            <input
              type="text"
              required
              className={a.input}
              placeholder="Paste your url here"
              onChange={(e) => setUrl(e.target.value)}
            />

            <button className={a.button} type="submit">
              Click Me!
            </button>
          </form>
          {newUrl === undefined ? (
            <>
              <div className={a.text}>
                Welcome, click on the button for a new url !
              </div>
            </>
          ) : (
            <div className={a.resultData}>
              <input
                type="text"
                disabled
                value={newUrl}
                className={a.input}
              ></input>
              <button className={a.button} onClick={handleCopyButtonClick}>
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

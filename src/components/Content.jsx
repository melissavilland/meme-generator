import { useState, useEffect } from "react";

export default function Content() {
  const [memeData, setMemeData] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    memeImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [memes, setMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => setMemes(data.data.memes));
  }, []);

  function handleChange(event) {
    const { name, value } = event.currentTarget;
    setMemeData((prevMemeData) => ({
      ...prevMemeData,
      [name]: value,
    }));
  }

  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * memes.length);
    const randomMemeImage = memes[randomIndex].url;
    setMemeData((prevMemeData) => ({
      ...prevMemeData,
      memeImage: randomMemeImage,
    }));
  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="One does not simply"
            name="topText"
            onChange={handleChange}
            value={memeData.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
            onChange={handleChange}
            value={memeData.bottomText}
          />
        </label>
        <button onClick={getRandomImage}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={memeData.memeImage} />
        <span className="top">{memeData.topText}</span>
        <span className="bottom">{memeData.bottomText}</span>
      </div>
    </main>
  );
}

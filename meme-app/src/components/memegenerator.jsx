import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function MemeGenerator(props) {
  const toptext = useFormInput("");
  const bottomtext = useFormInput("");
  const [image, setImage] = useState("http://i.imgflip.com/1bij.jpg");
  const [memeImages, setImagememes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await Axios.get("https://api.imgflip.com/get_memes").then((response) => {
        const { memes } = response.data.data;
        setImagememes(memes);
      });
    }
    fetchData();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const randNum = Math.floor(Math.random() * memeImages.length);
    const randMeme = memeImages[randNum].url;
    setImage(randMeme);
  }

  return (
    <div>
      <form className="meme-form" onSubmit={handleSubmit}>
        <input placeholder="Top text" {...toptext} />
        <input placeholder="Bottom text" {...bottomtext} />
        <button>Gen</button>
      </form>
      <div className="meme">
        <img src={image} alt="" />
        <h2 className="top">{toptext.value}</h2>
        <h2 className="bottom">{bottomtext.value}</h2>
      </div>
    </div>
  );
}

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(event) {
    setValue(event.target.value);
  }

  return {
    value,
    onChange: handleChange,
  };
}

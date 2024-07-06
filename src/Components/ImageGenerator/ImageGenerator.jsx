import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import img1 from '../Assets/default_image.jpg';

function ImageGenerator() {

  const [imageUrl, setImageUrl] = useState("/");
  let inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const imageGenerator = async () => {
    if (inputRef?.current?.value === "") {
      return 0;
    }

    setLoading(true);

    const response = await fetch("https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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",
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef?.current?.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );

    let data = await response.json();

    if (!data) {
      // Handle API response error (display error message)
      console.error("Error fetching image data");
      return;
    }

    console.log(data);

    let data_array = data.data;
    setImageUrl(data_array[0]?.url);
    setLoading(false);
  }


  return (
    <div className='container'>
      <div className='header'>AI Image <span>Generator</span></div>
      <div className='header-1'>Paint a picture with your words of something you'd love to experience.</div>
      <div className="imageLoading">
        <div className="image">
          <img src={imageUrl === "/" ? img1 : imageUrl} alt="img" />
        </div>
        <div className="loading">
          <div className={loading ? "loadingBarFull" : "loadingBar"}></div>
          <div className={loading ? "loadingText" : "displayNone"}>Loading...</div>
        </div>
      </div>
      <div className='searchBox'>
        <input type="text" ref={inputRef} className='searchInput' placeholder='Describe What You Want To See' />
        <button className="generateButton" onClick={imageGenerator}>Generate</button>
      </div>
    </div>
  )
}

export default ImageGenerator;

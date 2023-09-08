/* I haven't used any script to extract URL from given link.
I have extracted from Inspecting the webpage. */
import { useState, useEffect } from "react";

const useTypewriter = (text, delay) => {
  const [gotText, setText] = useState("");
  const [ind, setind] = useState(0);

  useEffect(() => {
    if (ind < text.length) {
      const timeout = setTimeout(() => {
        setText(gotText + text[ind]);
        setind(ind + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [text, gotText, ind, delay]);

  return gotText;
};

export default function App() {
  const [flag, setflag] = useState(null);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    fetch(
      "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/776173"
    )
      .then((res) => res.text())
      .then((data) => {
        setflag(data);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
      });
  }, []);
  //let output = JSON.stringify(data);
  const typedflag = useTypewriter(flag || "", 500);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <ul>
          {typedflag.split("").map((char, ind) => (
            <li key={ind}>{char}</li>
          ))}
        </ul>
      )}
    </>
  );
}

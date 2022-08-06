import { useState } from 'react'
import './App.css'

const greekLetters = [
  ["Α", "α", "άλφα", "A", "Alpha"],
  ["Β", "β", "βήτα	", "B", "Bêta"],
  ["Γ", "γ", "γάμμα", "G", "Gamma"],
  ["Δ", "δ", "δέλτα", "D", "Delta"],
  ["Ε", "ε", "έψιλον", "E", "Epsilon"],
  ["Ζ", "ζ", "ζήτα", "Z", "Zêta"],
  ["Η", "η", "ήτα", "Ê", "Êta"],
  ["Θ", "θ", "θήτα", "TH", "Thêta"],
  ["Ι", "ι", "ιώτα", "I", "Iota"],
  ["Κ", "κ", "κάππα", "K", "Kappa"],
  ["Λ", "λ", "λάμβδα", "L", "Lambda"],
  ["Μ", "μ", "μυ", "M", "Mu"],
  ["Ν", "ν", "νυ", "N", "Nu"],
  ["Ξ", "ξ", "ξι", "X", "Xi"],
  ["Ο", "ο", "όμικρον", "O", "Omicron"],
  ["Π", "π", "πι", "P", "Pi"],
  ["Ρ", "ρ", "ρω", "R", "Rhô"],
  ["Σ", ["σ", "ς"], "σίγμα", "S", "Sigma"],
  ["Τ", "τ", "ταυ", "T", "Tau"],
  ["Υ", "υ", "ύψιλον", "U", "Upsilon"],
  ["Φ", "φ", "φι", "PH", "Phi"],
  ["Χ", "χ", "χι", "KH", "Khi"],
  ["Ψ", "ψ", "ψι", "PS", "Psi"],
  ["Ω", "ω", "ωμέγα", "Ô", "Ôméga"]
];

const lettersToDisplayQty = greekLetters.map(
  function ([,lcLetter]) {
    if (Array.isArray(lcLetter)) {
      return 1 + parseInt(lcLetter.length);
    } else {
      return 2;
    }
  }
).reduce((acc, value) => acc + value, 0);

function pickRandomLetter(usedLetters) {
  let letterToDisplay = null;

  let letterIndex, ucLetter, lcLetter, greekName, romanLetter, romanName;

  do {
    letterIndex = Math.round(Math.random() * (greekLetters.length - 1));
    [ucLetter, lcLetter, greekName, romanLetter, romanName] = greekLetters[letterIndex];

    let finalLcLetter;
    if (Array.isArray(lcLetter)) {
      finalLcLetter = lcLetter[Math.round(Math.random() * 1)];
    } else {
      finalLcLetter = lcLetter;
    }
    letterToDisplay = [ucLetter, finalLcLetter][Math.round(Math.random() * 1)];

  } while (usedLetters.includes(letterToDisplay));

  return {
    letterToDisplay,
    ucLetter,
    lcLetter: Array.isArray(lcLetter) ? lcLetter.join(" ") : lcLetter,
    greekName,
    romanLetter,
    romanName
  }
}

function App() {

  const [letter, setLetter] = useState(pickRandomLetter([]));
  const [reveal, setReveal] = useState(false);
  const [usedLetters, setUsedLetters] = useState([]);

  function tryAnotherLetter() {
    let newUsedLetters;
    if ((usedLetters.length + 1) >= lettersToDisplayQty) {
      newUsedLetters = [];
    } else {
      newUsedLetters = [...usedLetters, letter.letterToDisplay];
    }
    setUsedLetters(newUsedLetters);

    const newLetter = pickRandomLetter(newUsedLetters);
    setReveal(false);
    setLetter(newLetter);
  }

  return <div className="app">
    <div>Guess the Greek letter!</div>
    <div className="letter">
      {letter.letterToDisplay}
      <span className="serif">{letter.letterToDisplay}</span>
    </div>
    
    <div className="buttons">
      { reveal ? null : <button type="button" onClick={() => setReveal(true)}>Reveal</button> }
      { reveal ? (
      <div className="revealed">
        <div className="greekLetter">{letter.ucLetter} {letter.lcLetter}</div>
        <div className="greekName">{letter.greekName}</div>
        <div className="romanLetter">{letter.romanLetter}</div>
        <div className="romanName">{letter.romanName}</div>
      </div>
      ) : null }
      <button type="button" onClick={tryAnotherLetter}>Try another letter</button>
    </div>
  </div>
}

export default App

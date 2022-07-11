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
  ["Σ", "σ ς", "σίγμα", "S", "Sigma"],
  ["Τ", "τ", "ταυ", "T", "Tau"],
  ["Υ", "υ", "ύψιλον", "U", "Upsilon"],
  ["Φ", "φ", "φι", "PH", "Phi"],
  ["Χ", "χ", "χι", "KH", "Khi"],
  ["Ψ", "ψ", "ψι", "PS", "Psi"],
  ["Ω", "ω", "ωμέγα", "Ô", "Ôméga"]
];

function createLetterIndex() {
  return Math.round(Math.random() * (greekLetters.length - 1));
}

function App() {
  const [letterIndex, setLetterIndex] = useState(createLetterIndex());
  const [caseIndex, setCaseIndex] = useState(Math.round(Math.random() * 1));
  const [reveal, setReveal] = useState(false);
  const [ucLetter, lcLetter, greekName, romanLetter, romanName] = greekLetters[letterIndex];

  const letterToDisplay = [ucLetter, lcLetter][caseIndex];

  function tryAnotherLetter() {
    setReveal(false);
    setCaseIndex(Math.round(Math.random() * 1));
    setLetterIndex(createLetterIndex());
  }

  return <div className="app">
    <div>Guess the Greek letter!</div>
    <div className="letter">{letterToDisplay}</div>
    
    <div className="buttons">
      { reveal ? null : <button type="button" onClick={() => setReveal(true)}>Reveal</button> }
      { reveal ? (
      <div className="revealed">
        <div className="greekLetter">{ucLetter} {lcLetter}</div>
        <div className="greekName">{greekName}</div>
        <div className="romanLetter">{romanLetter}</div>
        <div className="romanName">{romanName}</div>
      </div>
      ) : null }
      <button type="button" onClick={tryAnotherLetter}>Try another letter</button>
    </div>
  
  </div>
}

export default App

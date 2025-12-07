import { useState } from 'react'
import { FaRegCopy } from 'react-icons/fa';
import '../css/App.css' // css file


function PasswordGenerator() {

  const [pass, setPass] = useState("");

  const [msg, setMsg] = useState("");
  const [copiedMsg, setCopiedMsg] = useState(null);

  const [len, setLen] = useState(0);

  const [lowercase, setLowercase] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [digits, setDigits] = useState(false);
  const [specialChars, setSpecialChars] = useState(false);
  const [spaces, setSpaces] = useState(false);
  const [disguise, setDisguise] = useState(false);

  const GeneratePassword = () => {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
    const num = "0123456789";
    const special = "@$!%*?&#";
    const spacing = "_";

    // checks which requirements have been selected
    let req = "";
    if (lowercase) req += lower;
    if (uppercase) req += upper;
    if (num) req += num;
    if (specialChars) req += special;
    if (spaces) req += spacing;

    if (!req) return setPass(""); // if none have been checked, return password as-is

    // length recognition + generation 
    let passLength = "";
    for (let l = 0; l < len; l++) {
      passLength += req[Math.floor(Math.random() * req.length)];
    }

    setPass(passLength);
  };

  const GetStrength = (passwrd) => {
    if (!passwrd) {
      return {
        level: 0,
        msg: ""
      };
    }

    let strength = 0;

    /* Length scoring */
    if (passwrd.length >= 8) strength++;
    if (passwrd.length >= 12) strength++;
    if (passwrd.length >= 16) strength++;

    /* Character variety scoring */
    if (/[a-z]/.test(passwrd)) strength++;
    if (/[A-Z]/.test(passwrd)) strength++;
    if (/\d/.test(passwrd)) strength++;
    if (/[^A-Za-z0-9]/.test(passwrd)) strength++;

    /* Convert to levels 0–4 */
    let level = 0;
    if (strength <= 2) level = 1;
    else if (strength <= 4) level = 2;
    else if (strength <= 6) level = 3;
    else level = 4;

    /* Level messages */
    let msg = "Too Weak";
    if (level === 1) msg = "Weak";
    if (level === 2) msg = "Medium";
    if (level === 3) msg = "Strong";
    if (level === 4) msg = "Very Strong";

    return { level, msg };
  };

  const passStrength = GetStrength(pass);
  const disguisedPass = disguise ? "•".repeat(pass.length) : pass;

  return (
    <div className="container">
      <div className="input-display-container">
          <input 
            type="text"
            value={disguise ? disguisedPass : pass}
            readOnly
          />

          <button 
          className="copy-btn" 
          onClick=
              {() =>
              navigator.clipboard.writeText(pass) // copies name to system clipboard
                .then(() => { setCopiedMsg(pass); setMsg("Copied") }) // if successful, the copied text will pass
                .catch(() => { setCopiedMsg(pass); setMsg("Copy failed.") }) // else, the text isn't copied
                .finally(() => setTimeout(() => setMsg(""), 1400))}
              disabled={!pass}
            >
            <FaRegCopy />
            {copiedMsg === pass && msg && (
                <small className="copy-text" aria-live="polite">{msg}</small>
            )}
          </button>
        </div>

        <div className="strength-wrapper">
            <header className="strength-header">
            <h3 className="strength-title">
              Password Strength
            </h3>
          </header>
        </div>
        <div className="strength-display-container">
          <div className="strength-bars-container">
            {[1, 2, 3, 4].map((bar) => (
              <span key={bar} className={`strength-bar ${bar <= passStrength.level ? `filled level-${passStrength.level}` : ""}`}>
              </span>
            ))}
          </div>
          <div className="strength-label-row">
            <div className={`strength-msg level-${passStrength.level}`}>{passStrength.msg}</div>
          </div>
        </div>
        
        <div className="range-slider-container">
          <input
            type="range"
            min={0}
            max={30}
            value={len}
            onChange={(e) => setLen(e.target.value)}
          />
          {len}
        </div>
        <div className="checkbox-fields">
          <label htmlFor="lowercase">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={(e) => setLowercase(e.target.checked)}
            />
            Lowercase <small className="category">(a-z)</small>
          </label>

           <label htmlFor="uppercase">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
            />
            Uppercase <small className="category">(A-Z)</small>
          </label>

          <label htmlFor="digits">
            <input
              type="checkbox"
              checked={digits}
              onChange={(e) => setDigits(e.target.checked)}
            />
            Digits <small className="category">(0-9)</small>
          </label>

          <label htmlFor="symbols">
            <input
              type="checkbox"
              checked={specialChars}
              onChange={(e) => setSpecialChars(e.target.checked)}
            />
            Special <small className="category">(@$!%*?&#)</small>
          </label>

          <label htmlFor="spaces">
            <input
              type="checkbox"
              checked={spaces}
              onChange={(e) => setSpaces(e.target.checked)}
            />
            Spaces <small className="category">(_)</small>
          </label>

          <label htmlFor="spaces">
            <input
              type="checkbox"
              checked={disguise}
              onChange={(e) => setDisguise(e.target.checked)}
            />
            Disguise <small className="category">(•)</small>
          </label>
        </div>
         <button 
          className="generate-btn" 
          type="button" 
          onClick={GeneratePassword}
          disabled={!lowercase && !uppercase && !digits && !specialChars && !spaces && !disguise}
         >
          Generate Password
         </button>
    </div>
  );
}

export default PasswordGenerator
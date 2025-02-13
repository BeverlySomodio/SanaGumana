import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import ReactConfetti from "react-confetti";
import "./App.css";
import Envelope from './pics/Envelope.svg'; // Path to envelope image
import No from './pics/No.jpeg'; // Replace with your "No" image path
import Flowers from './pics/FlowersForYou.gif'; // Updated image import
import GogiImage from './pics/Gogi.jpg'; // Replace with your pop-up image path
import CAT from './pics/CAT.gif'; // CAT GIF import
import No3 from './pics/No3.gif';
import No4 from './pics/No4.gif';

const App = () => {
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [showProposal, setShowProposal] = useState(false);
  const [response, setResponse] = useState(null);
  const [moveNoButton, setMoveNoButton] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: "0px", left: "0px" });
  const [noClicks, setNoClicks] = useState(0); // Track the number of "No" clicks
  const [showBouquet, setShowBouquet] = useState(false); // State for showing bouquet
  const [showNextButton, setShowNextButton] = useState(false); // State for showing next button
  const [showPopUp, setShowPopUp] = useState(false); // State for showing pop-up image
  const [showNoPopUp, setShowNoPopUp] = useState(false); // State for showing No image pop-up
  const [proceedToNextScreen, setProceedToNextScreen] = useState(false); // Track if YES was clicked to proceed
  const [showGogiPopUp, setShowGogiPopUp] = useState(false); // State for showing Gogi pop-up after next button
  const [showModal, setShowModal] = useState(false); // State for the "Hi Mahal" modal
  const [showNo3PopUp, setShowNo3PopUp] = useState(false); // State for showing No3 pop-up
  const [showNo4PopUp, setShowNo4PopUp] = useState(false); // State for showing No4 pop-up

  const [buttonDisabled, setButtonDisabled] = useState(false); // To track if the "No" button is disabled
const [errorMessage, setErrorMessage] = useState(""); // To store the error message


  // Envelope opening animation using react-spring
  const envelopeAnimation = useSpring({
    opacity: showEnvelope ? 1 : 0,
    transform: showEnvelope ? "scale(1) rotate(0deg)" : "scale(0.8) rotate(180deg)",
    config: { tension: 200, friction: 12 },
  });

  // Bouquet animation using react-spring
  const bouquetStyle = useSpring({
    opacity: showBouquet ? 1 : 0,
    transform: showBouquet ? "scale(1) translateY(0)" : "scale(0.5) translateY(-200px)",
    config: { tension: 200, friction: 12 },
  });

  // Handle envelope click to show modal
  const handleEnvelopeClick = () => {
    setShowEnvelope(false); // Trigger envelope closing animation
    setTimeout(() => {
      setShowModal(true); // Show the modal after envelope closes
    }, 1000); // Wait for envelope animation to finish before showing modal
  };

  // Handle closing modal
  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setShowProposal(true); // Proceed to the proposal after the modal closes
  };

  const handleYesClick = () => {
    setResponse("YES");
    setShowBouquet(true); // Show the bouquet when "YES" is clicked
    setTimeout(() => {
      setProceedToNextScreen(true); // Proceed to next screen after bouquet
    }, 2000); // Transition after bouquet
  };

  const handleNoClick = () => {
    setNoClicks(noClicks + 1); // Increment the "No" click count
  
    if (noClicks === 0) {
      setResponse("NO");
      setShowNoPopUp(true); // Show the "No" pop-up after the first click
    } else if (noClicks === 1) {
      setResponse("TOO MANY NOs");
      setShowNoPopUp(false);
      setShowPopUp(true); // Show the CAT pop-up instead
    } else if (noClicks === 2) {
      setResponse("NO3");
      setShowPopUp(false);
      setShowNoPopUp(false);
      setShowNo3PopUp(true); // Show the "No3" GIF pop-up
    } else if (noClicks === 3) {
      setResponse("NO4");
      setShowPopUp(false);
      setShowNoPopUp(false);
      setShowNo3PopUp(false);
      setShowNo4PopUp(true); // Show the "No4" GIF pop-up
    } else if (noClicks === 4) {
      // On the 5th click, disable the button and show the error message
      setButtonDisabled(true); // Disable the "No" button
      setErrorMessage("BAWAL NA MAG NO SAPILITAN NA 'TO"); // Show error message
    }
  
    // When "No" is clicked, move the button
    if (!moveNoButton) {
      setMoveNoButton(true);
      setTimeout(() => {
        setMoveNoButton(false);
      }, 1000);
      setButtonPosition({
        top: `${Math.random() * 200}px`, // Correctly wrapped in backticks
        left: `${Math.random() * 200}px`, // Correctly wrapped in backticks
      });
    }
  };
    

  const handleNextButtonClick = () => {
    setShowNextButton(true); // Show the "And we are going to..." button
    setShowGogiPopUp(true); // Show the Gogi pop-up after the next button is clicked
  };

  // Handle closing the pop-up when the close button is clicked
  const handleClosePopUp = () => {
    setShowPopUp(false); // Hide the pop-up
    setShowNoPopUp(false); // Hide the No pop-up
    setShowNo3PopUp(false); // Hide the No3 pop-up
    setShowNo4PopUp(false); // Hide the No4 pop-up
    setShowGogiPopUp(false); // Hide the Gogi pop-up
  };
  return (
    <div className="app">
      <header className="app-header">
        <h1>💌 Hi, Mahal💌</h1>

        {/* Envelope animation */}
        {showEnvelope && (
          <animated.div style={envelopeAnimation} className="envelope-container" onClick={handleEnvelopeClick}>
            <img src={Envelope} alt="Envelope" className="envelope-image" />
            <p>Open it, Mahal</p>
          </animated.div>
        )}

        {/* Modal with message after envelope is opened */}
        {showModal && (
          <div className="modal-monthsary">
            <div className="modal-message">
              <p>
                Happy monthsary! Thank you for all the time you spend with me, for all the efforts you put in, and for staying by my side. Can we have dinner together later? I love you, bubby!
              </p>
              <button className="close-btn" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        )}

        {/* Trigger heart-shaped confetti when modal is open */}
        {showModal && (
          <ReactConfetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={200}
            gravity={0.1}
            recycle={false}
            drawShape={(ctx, particle) => {
              if (particle && particle.x && particle.y) {  // Check if particle is valid and has x, y properties
                ctx.font = "30px sans-serif"; // Set font size for the heart
                ctx.fillText("💖", particle.x, particle.y); // Heart emoji as confetti
              }
            }}
          />
        )}

        {/* Show proposal after modal closes */}
        {showProposal && !proceedToNextScreen && (
          <div className="proposal">
            <h2 className="proposal-text">Will you be my Valentine? ❤️</h2>
            <div className="response-buttons">
              <button onClick={handleYesClick}>YES, of course! 💖</button>
              <button
                onClick={handleNoClick}
                style={{
                  position: "relative",
                  top: buttonPosition.top,
                  left: buttonPosition.left,
                  transition: "all 0.5s ease-in-out",
                }}
                className={moveNoButton ? "no-button-moving" : ""}
              >
                No, sorry 😭
              </button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}

            </div>
          </div>
        )}

        {/* Confetti effect triggered by YES */}
        {response === "YES" && (
          <ReactConfetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={200}
            gravity={0.1}
            recycle={false}
          />
        )}

        {response === "YES" && !proceedToNextScreen && (
          <div className="response">
            <h3 className="happy-response">YAY! 🎉 DAPAT LANG HAHAA I LOVE YOU</h3>
          </div>
        )}

        {/* New screen after "YES" */}
        {proceedToNextScreen && (
          <div className="new-screen">
            {/* Animated bouquet with message */}
            {showBouquet && (
              <animated.div style={bouquetStyle} className="bouquet-container">
                <img src={Flowers} alt="Flowers for you" className="bouquet-image" />
                <p className="bouquet-message">Flowers for you po hehe 🌸</p>
              </animated.div>
            )}

            {/* Show the "And we are going to..." button after bouquet */}
            {showBouquet && !showNextButton && (
              <button className="next-button" onClick={handleNextButtonClick}>
                And we are going to...
              </button>
            )}
          </div>
        )}

        {/* Pop-up image with close button */}
        {showPopUp && (
          <div className="pop-up">
            <div className="pop-up-container">
              <img src={CAT} alt="CAT GIF" className="pop-up-image" />
              <p className="pop-up-message">Inulit pa talaga</p>
              <button className="close-btn" onClick={handleClosePopUp}>
                Close
              </button>
            </div>
          </div>
        )}

{showNo3PopUp && (
          <div className="pop-up">
            <div className="pop-up-container">
              <img src={No3} alt="No3 GIF" className="pop-up-image" />
              <h3 className="no3-response">NAG NO PA TALAGA ULIT </h3>
              <button className="close-btn" onClick={handleClosePopUp}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* No4 Pop-up */}
        {showNo4PopUp && (
          <div className="pop-up">
            <div className="pop-up-container">
              <img src={No4} alt="No4 GIF" className="pop-up-image" />
              <h3 className="no4-response">OKAY FINE</h3>
              <button className="close-btn" onClick={handleClosePopUp}>
                Close
              </button>
            </div>
          </div>
        )}

        {showNoPopUp && (
          <div className="no-pop-up">
            <div className="no-pop-up-container">
              <img src={No} alt="No Image" className="no-pop-up-image" />
              <h3 className="angry-response">Ayy nag no? Ayusin mo desisyon mo sa buhay agad 😤</h3>
              <button className="close-btn" onClick={handleClosePopUp}>
                Ulitin mo Kristine Mae
              </button>
            </div>
          </div>
        )}

{showGogiPopUp && (
  <div className="pop-up">
    <div className="pop-up-container">
      <img src={GogiImage} alt="Gogi" className="pop-up-image" />
      <h3 className="gogi-response">GOGI WAAAAAAHHHHH!!</h3>
      <button className="close-btn" onClick={handleClosePopUp}>
        Close
      </button>
    </div>
  </div>
)}

      </header>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // Start the 1-second timeout loop. We use a timeout that re-schedules
  // itself indirectly by depending on timeRemaining.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // time's up: notify parent and reset for next question
          onAnswered(false);
          return 10; // reset to 10 for the next question
        }
        return prev - 1; // count down
      });
    }, 1000);

    // cleanup the timeout if the effect re-runs or component unmounts
    return () => clearTimeout(timeoutId);
  }, [timeRemaining, onAnswered, question]);

  // If a new question arrives, immediately reset the visible timer to 10.
  useEffect(() => {
    setTimeRemaining(10);
  }, [question]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // reset for the next question immediately
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;

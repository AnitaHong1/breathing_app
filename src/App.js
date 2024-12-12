import React, { useState, useEffect } from "react";

const App = () => {
  const [stage, setStage] = useState("Start");
  const [timer, setTimer] = useState(0);
  const [cyclesLeft, setCyclesLeft] = useState(0);
  const [duration, setDuration] = useState(4); // Default duration is 4 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState("Box Breathing");

  const exercises = {
    "Box Breathing": {
      timings: [4, 4, 4, 4],
      description: "Activates the parasympathetic nervous system, helping you relax.",
    },
    "Clear Mind": {
      timings: [3, 0, 9, 0],
      description:
        "Enables resources for innovative solutions searching, stimulates creativity.",
    },
    Relax: {
      timings: [3, 0, 6, 9],
      description: "Relieves nervous and physical tension, helps switch to resting.",
    },
    Calming: {
      timings: [3, 6, 3, 6],
      description:
        "Balances strong emotions, enables taking control over them.",
    },
    Power: {
      timings: [3, 6, 6, 0],
      description:
        "Mobilizes body resources for coping with serious tasks, promotes concentration on important things.",
    },
    Harmony: {
      timings: [3, 9, 6, 3],
      description:
        "Harmonizes psycho-emotional processes, gives the feeling of integrity.",
    },
  };

  useEffect(() => {
    if (isRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (isRunning && timer === 0) {
      handleStageTransition();
    }
  }, [timer, isRunning]);

  const handleStageTransition = () => {
    const timings = exercises[selectedExercise].timings;
    const filteredStages = stages.filter((_, index) => timings[index] > 0); // Skip stages with 0 seconds
    const currentStageIndex = filteredStages.indexOf(stage);
    const nextStage = filteredStages[(currentStageIndex + 1) % filteredStages.length];

    if (currentStageIndex === filteredStages.length - 1) {
      setCyclesLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }

    if (cyclesLeft === 0) {
      stopSession();
    } else {
      setStage(nextStage);
      setTimer(timings[stages.indexOf(nextStage)]); // Set the timer for the next stage
    }
  };

  const startSession = () => {
    const timings = exercises[selectedExercise].timings;
    const totalCycleTime = timings.reduce((sum, time) => sum + (time > 0 ? time : 0), 0);
    const totalCycles = Math.floor((duration * 60) / totalCycleTime);
    setCyclesLeft(totalCycles);
    setStage("Inhale");
    setTimer(timings[0]); // Start with Inhale time
    setIsRunning(true);
  };

  const stopSession = () => {
    setIsRunning(false);
    setStage("Start");
    setTimer(0);
    setCyclesLeft(0);
  };

  const handleDurationChange = (event) => {
    setDuration(Number(event.target.value));
  };

  const handleExerciseChange = (event) => {
    setSelectedExercise(event.target.value);
  };

  const stages = ["Inhale", "Hold", "Exhale", "Hold"]; // Standard stages

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Breathing Exercises</h1>

      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="exercise">Choose Exercise: </label>
        <select
          id="exercise"
          value={selectedExercise}
          onChange={handleExerciseChange}
          style={{ padding: "5px", fontSize: "14px", marginLeft: "10px" }}
        >
          {Object.keys(exercises).map((exercise) => (
            <option key={exercise} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>
      </div>

      {!isRunning && (
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="duration">Session Duration:</label>
          <select
            id="duration"
            value={duration}
            onChange={handleDurationChange}
            style={{
              marginLeft: "10px",
              padding: "5px",
              fontSize: "14px",
            }}
          >
            <option value={4}>4 Minutes</option>
            <option value={8}>8 Minutes</option>
          </select>
        </div>
      )}

      {isRunning && (
        <div style={{ marginTop: "10px", fontSize: "16px" }}>
          <p>Cycles Left: {cyclesLeft}</p>
        </div>
      )}

      <div
        style={{
          width: "200px",
          height: "200px",
          margin: "60px auto 20px auto",
          backgroundColor: "lightblue",
          borderRadius: "50%",
          transform: stage === "Inhale" || stage === "Hold" ? "scale(1.2)" : "scale(1)",
          transition: stage === "Hold" ? "none" : "transform 4s ease-in-out",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          cursor: "pointer",
        }}
        onClick={isRunning ? stopSession : startSession}
      >
        <span style={{ fontSize: "20px", fontWeight: "bold", color: "black", textAlign: "center" }}>
          {isRunning ? `${stage} - ${timer}s` : "Start"}
        </span>
      </div>

      <div
        style={{
          marginTop: "50px",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
          maxWidth: "400px",
          margin: "50px auto",
          textAlign: "left",
          color: "black",
          fontSize: "14px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>{selectedExercise}</h2>
        <p>{exercises[selectedExercise].description}</p>
        <ul>
          <li>Inhale: {exercises[selectedExercise].timings[0]} seconds</li>
          <li>Hold: {exercises[selectedExercise].timings[1]} seconds</li>
          <li>Exhale: {exercises[selectedExercise].timings[2]} seconds</li>
          <li>Hold: {exercises[selectedExercise].timings[3]} seconds</li>
        </ul>
      </div>
    </div>
  );
};

export default App;

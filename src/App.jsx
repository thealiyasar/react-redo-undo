import { useState } from "react";

function App() {
  // List of points created by the user (visible)
  const [currPoint, setCurrPoint] = useState([]);

  // List of points that have been deleted in the Undo operation but can be restored with Redo
  const [undoPoint, setUndoPoint] = useState([]);

  // Function called when the screen is clicked
  const clickHandle = e => {
    // Coordinates of the clicked point
    const newPoint = { x: e.clientX, y: e.clientY };

    // The new point is added to the currPoint list.
    setCurrPoint(prev => [...prev, newPoint]);

    // When a new point is added, undoPoint (redo history) is cleared.
    setUndoPoint([]);
  };

  // Undo operation: undo the last point added
  const undoHandle = e => {
    e.stopPropagation(); // Prevents screen clicks from being triggered

    // No action taken if no dot is present
    if (currPoint.length === 0) return;

    // A copy of the currPoint list is taken and the last element is removed.
    const newCurr = [...currPoint];
    const last = newCurr.pop();

    // currPoint is updated with the updated list
    setCurrPoint(newCurr);

    // The undone point is added to the undoPoint list.
    setUndoPoint(prev => [...prev, last]);
  };

  // Redo operation: restore the last undone point
  const redoHandle = e => {
    e.stopPropagation(); // Prevents screen clicks

    // If there is no point to restore, no action is taken.
    if (undoPoint.length === 0) return;

    // A copy of the undoPoint list is taken and the last element is removed.
    const newUndo = [...undoPoint];
    const last = newUndo.pop();

    // undoPoint is updated
    setUndoPoint(newUndo);

    // The retrieved point is added back to the currPoint list.
    setCurrPoint(prev => [...prev, last]);
  };

  const goGithub = e => {
    e.stopPropagation();
    window.open("https://github.com/thealiyasar/react-redo-undo", "_blank");
  };

  return (
    // Main screen, clicks are recorded here
    <div className="screen" onClick={clickHandle}>
      {/* The buttons remain fixed at the top. */}
      <header className="buttons">
        <button disabled={currPoint.length === 0} onClick={undoHandle}>
          Undo
        </button>
        <button disabled={undoPoint.length === 0} onClick={redoHandle}>
          Redo
        </button>
        <button className="github" onClick={goGithub}>
          Github
        </button>
      </header>

      {/* The visible points are drawn on the screen. */}
      {currPoint.map((point, index) => (
        <div
          key={index}
          className="point"
          style={{
            left: point.x, // Horizontal position of the point
            top: point.y, // Vertical position of the point
          }}
        />
      ))}
    </div>
  );
}

export default App;

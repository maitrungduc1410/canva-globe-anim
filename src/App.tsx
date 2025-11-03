import { useRive, StateMachineInput } from "@rive-app/react-canvas";
import { useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
  const riveInputs = useRef<Record<string, StateMachineInput>>({});
  const [showFullRive, setShowFullRive] = useState(false);

  const { RiveComponent, rive } = useRive({
    src: `${import.meta.env.BASE_URL}c8cefb7b49258078c162ec0c6a8626fd.riv`,
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  // Grab inputs for the first Rive
  useEffect(() => {
    if (!rive) return;
    const inputs = rive.stateMachineInputs("State Machine 1");
    const inputMap: Record<string, StateMachineInput> = {};
    inputs.forEach((i) => {
      inputMap[i.name] = i;
    });
    riveInputs.current = inputMap;
  }, [rive]);

  // Handler for click → show fullscreen animation
  const handleClick = () => {
    setShowFullRive(true);
  };

  return (
    <div className="App">
      {/* ✅ Small button Rive */}
      <div
        style={{
          width: 120,
          height: 120,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onMouseEnter={() => {
          if (riveInputs.current["onHover"])
            riveInputs.current["onHover"].value = true;
        }}
        onMouseLeave={() => {
          if (riveInputs.current["onHover"])
            riveInputs.current["onHover"].value = false;
        }}
        onMouseDown={() => {
          if (riveInputs.current["onMousedown"])
            riveInputs.current["onMousedown"].value = true;
        }}
        onMouseUp={() => {
          if (riveInputs.current["onMousedown"])
            riveInputs.current["onMousedown"].value = false;
          handleClick();
        }}
      >
        <RiveComponent style={{ width: 120, height: 120 }} />
      </div>

      {/* ✅ Fullscreen Rive overlay */}
      {showFullRive && <FullscreenRive onClose={() => setShowFullRive(false)} />}
    </div>
  );
}

export function FullscreenRive({ onClose }: { onClose: () => void }) {
  const { RiveComponent } = useRive({
    src: `${import.meta.env.BASE_URL}ea63eccd3888013bc2e29d27247b8220.riv`,
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        zIndex: 1000,
        cursor: "pointer",
      }}
      onClick={onClose}
    >
      <div className="wDupLw" />
      <RiveComponent
        style={{
          width: "100vw",
          height: "100vh",
          background: "transparent",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}



/**
 * we can also play animation directly without state machines
 * but it doesn't give 100% same as the above state machine version
 * anim disappears abruptly instead of smoothly fading out
 */
// import { useRive } from "@rive-app/react-canvas";
// import { useEffect, useState } from "react";
// import "./App.css";

// export default function App() {
//   const [currentAnim, setCurrentAnim] = useState("Dark Mode");

//   const { RiveComponent, rive } = useRive({
//     src: "https://static.canva.com/web/riv/c8cefb7b49258078c162ec0c6a8626fd.riv",
//     animations: currentAnim,
//   });

//   // Play base animation
//   useEffect(() => {
//     if (rive) rive.play(currentAnim);
//   }, [rive, currentAnim]);

//   return (
//     <div className="App">
//       <div
//         style={{
//           height: 120,
//           width: 120,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           cursor: "pointer",
//         }}
//         onMouseEnter={() => setCurrentAnim("HoverAnim")}
//         onMouseLeave={() => setCurrentAnim("Dark Mode")}
//         onMouseDown={() => {
//           if (rive) {
//             rive.play("Click", true);
//           } // true → don't reset others
//         }}
//         onMouseUp={() => {
//           if (rive) {
//             rive.stop("Click");
//           }
//         }}
//       >
//         <RiveComponent style={{ height: 120, width: 120 }} />
//       </div>
//     </div>
//   );
// }


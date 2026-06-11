import { useEffect, useRef } from "react";

export function CursorTrail({ colorRgb = [245, 197, 24] }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const pointsRef = useRef([]);
  const activeRef = useRef(false);
  const isHiddenRef = useRef(false);

  useEffect(() => {
    // Prevents the ribbon from running on mobile devices or devices without hover capabilities
    if (window.matchMedia("(hover: none)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const TRAIL = 10;      // Number of tracking segments in the ribbon
    const THICKNESS = 8;   // Max thickness of the ribbon head

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Initialize all trailing points off-screen
    pointsRef.current = Array.from({ length: TRAIL }, () => ({
      x: -200,
      y: -200,
    }));

    // Updates the target mouse coordinates on move
    function onMove(e) {
      if (e.target && e.target.closest && e.target.closest('.tilted-card-figure')) {
        isHiddenRef.current = true;
      } else {
        isHiddenRef.current = false;
      }

      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!activeRef.current) {
        activeRef.current = true;
        pointsRef.current = Array.from({ length: TRAIL }, () => ({
          x: e.clientX,
          y: e.clientY,
        }));
      }
    }
    window.addEventListener("mousemove", onMove);

    // The Animation Loop using RequestAnimationFrame
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smoothly ease the head point toward the real mouse position
      const head = pointsRef.current[0];
      head.x += (mouseRef.current.x - head.x) * 0.36;
      head.y += (mouseRef.current.y - head.y) * 0.36;

      // Make every following point ease toward the point ahead of it (creates the physics lag trail)
      for (let i = 1; i < TRAIL; i++) {
        const prev = pointsRef.current[i - 1];
        const cur = pointsRef.current[i];
        cur.x += (prev.x - cur.x) * 0.42;
        cur.y += (prev.y - cur.y) * 0.42;
      }

      if (isHiddenRef.current) {
        frameRef.current = requestAnimationFrame(draw);
        return;
      }

      const [baseR, baseG, baseB] = colorRgb;

      // Render the ribbon geometry onto the HTML5 Canvas
      for (let i = 0; i < TRAIL - 1; i++) {
        const t = i / (TRAIL - 1);
        const p1 = pointsRef.current[i];
        const p2 = pointsRef.current[i + 1];

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        
        // Calculate perpendicular vectors to give the line thickness
        const nx = (-dy / len) * THICKNESS * (1 - t) * 0.5;
        const ny = (dx / len) * THICKNESS * (1 - t) * 0.5;

        const alpha = (1 - t) * 0.55; // Fades out toward the tail

        // Draw the complex quad shape connecting point segments
        ctx.beginPath();
        ctx.moveTo(p1.x + nx, p1.y + ny);
        ctx.lineTo(p1.x - nx, p1.y - ny);
        ctx.lineTo(p2.x - nx * (1 - 1 / TRAIL), p2.y - ny * (1 - 1 / TRAIL));
        ctx.lineTo(p2.x + nx * (1 - 1 / TRAIL), p2.y + ny * (1 - 1 / TRAIL));
        ctx.closePath();

        ctx.fillStyle = `rgba(${baseR},${baseG},${baseB},${alpha})`;
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    }

    frameRef.current = requestAnimationFrame(draw);

    // Cleanup listeners and animation frames when component unmounts
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [colorRgb]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none", // Ensures you can click items underneath the canvas
        zIndex: 9999,          // Sits completely on top of everything else
      }}
    />
  );
}

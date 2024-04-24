import React, { useEffect, useRef } from "react";
import { ScrollingTextProps } from "../../types/types";

const ScrollingCanvas: React.FC<ScrollingTextProps> = ({ text }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let xPos1 = 0;
  let xPos2 = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const speed = 0.5; // Ajusta la velocidad aquí (menor valor = más lento)
    const gap = 60; // Espacio entre los dos textos

    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    const textWidth = ctx.measureText(text).width;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    const draw = () => {
      if (!ctx) {
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dibujar el primer texto
      ctx.fillText(text, xPos1, canvas.height / 2);

      // Dibujar el segundo texto
      ctx.fillText(text, xPos2, canvas.height / 2);

      // Actualizar la posición del primer texto
      xPos1 -= speed;
      if (xPos1 <= -textWidth) {
        xPos1 = canvas.width;
      }

      // Actualizar la posición del segundo texto
      xPos2 -= speed;
      if (xPos2 <= -textWidth) {
        xPos2 = xPos1 + textWidth + gap;
      }

      requestAnimationFrame(draw);
    };

    // Establecer la posición inicial del segundo texto
    xPos2 = textWidth + gap;

    // Ajustar el tamaño del canvas al cargar la página
    resizeCanvas();

    // Ajustar el tamaño del canvas al cambiar el tamaño de la ventana
    window.addEventListener("resize", resizeCanvas);

    draw();

    // Limpiar el evento de resize al desmontar el componente
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [text]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100px" }} />;
};

export default ScrollingCanvas;

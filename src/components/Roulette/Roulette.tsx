import { useRef, useState, useEffect, FC } from 'react';
import {observer} from "mobx-react";
import { rouletteTitlesStore } from "../../stores/RouletteTitlesStore";

import './Roulette.scss';
import {imageStore} from "../../stores/ImageStore";
import {rouletteStore} from "../../stores/RouletteStore";

interface RouletteEntry {
  id: number;
  name: string;
  weight: number;
  image?: HTMLImageElement;
}

class Clock {
  private lastMs = 0;
  private _delta = 0;

  public get time() {
    return this.lastMs;
  }

  public get delta() {
    return this._delta;
  }

  public set time(t: number) {
    this._delta = t - this.lastMs;
    this.lastMs = t;
  }
}

const
  ROULETTE_SCALE = 0.92;

const
  START_SPEED = 11,
  START_VARIATION = 3,
  DECELERATION_START = 1.6,
  DECELERATION_VARIATION = 0.3,
  DECELERATION_LENGTH = 3;

interface IProps {
  getSpin?: (spin: (clock: Clock) => void) => void;
}

export const Roulette: FC<IProps> = observer((props) => {
  const canvasRef = useRef(null);
  const clock = new Clock();

  let angleOffset = 0;
  let initialSpeed = 0;
  let rotationSpeed = 0;
  let decelerationStart = 0;

  const speedEasing = (t: number) => Math.pow(1 - t, 5);

  const spin = () => {
    if (rotationSpeed === 0) {
      rouletteStore.cleanWinner();
      rotationSpeed = START_SPEED + (Math.random() * 2 - 1) * START_VARIATION;
      initialSpeed = rotationSpeed;
      decelerationStart = clock.time + (DECELERATION_START + Math.random() * DECELERATION_VARIATION) * 1000;
    }
  };

  const spinRef = useRef(spin);

  const getCurrentEntry = () => {
    let entries = rouletteTitlesStore.titles;
    let angle = 0;
    let totalWeight = entries.reduce((a, b) => a + b.weight, 0);

    for (let i = 0; i < entries.length; i++) {
      let imageAngle = Math.PI * 2 * (entries[i].weight / totalWeight);
      angle += imageAngle;

      if(angleOffset < angle)
        return entries[i];
    }

    return entries[0];
  };

  const update = (clock: Clock) => {
    if (rotationSpeed === 0) return;

    let delta = clock.delta / 1000;

    angleOffset += rotationSpeed * delta;
    angleOffset %= Math.PI * 2;

    if (decelerationStart > clock.time) return;

    rotationSpeed = initialSpeed * speedEasing((clock.time - decelerationStart) / 1000 / DECELERATION_LENGTH);

    if (rotationSpeed < 0.05) {
      rotationSpeed = 0;
      rouletteStore.setWinner(getCurrentEntry());
      console.log(getCurrentEntry().item.name);
    }
  };

  const render = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let entries = rouletteTitlesStore.titles;

    const RADIUS = canvas.width / 2;
    const center = [canvas.width / 2, canvas.height / 2];

    const totalWeight = entries.reduce((a, b) => a + b.weight, 0);

    let angle = 0;

    for (let i = 0; i < entries.length; i++) {
      let { item, weight } = entries[i];
      weight /= totalWeight;
      let imageAngle = Math.PI * 2 * weight;

      let stored = imageStore.getImage(item.id);

      if(stored?.image) {
        let centerAngle = angle + imageAngle / 2 - angleOffset;

        ctx.save();

        ctx.beginPath();
        ctx.moveTo(center[0], center[1]);
        ctx.arc(center[0], center[1], RADIUS, centerAngle + imageAngle / 2, centerAngle - imageAngle / 2, true);
        ctx.clip();

        let sectorWidth = weight >= 0.5
          ? 2 * RADIUS
          : 2 * RADIUS * Math.sin(imageAngle / 2);

        let scale = Math.max(
          sectorWidth / stored.image.width,
          RADIUS / stored.image.height,
        );

        let x = center[0] + Math.cos(centerAngle) * RADIUS;
        let y = center[1] + Math.sin(centerAngle) * RADIUS;
        // ctx.filter = 'blur(2px)';
        ctx.translate(x, y);
        ctx.rotate(centerAngle + Math.PI / 2);
        ctx.drawImage(stored.image, -stored.image.width * scale / 2, 0, stored.image.width * scale, stored.image.height * scale);
        ctx.restore();
      }

      angle += imageAngle;
    }

    if(entries.length !== 0) {
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.moveTo(center[0] + RADIUS - 9, center[1]);
      ctx.lineTo(center[0] + RADIUS + 6, center[1] - 7);
      ctx.lineTo(center[0] + RADIUS + 6, center[1] + 7);
      ctx.fill();
    }
  };

  const getCanvas = () => {
    const canvas = canvasRef.current! as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;

    return { canvas, ctx };
  };

  const resize = () => {
    const { canvas } = getCanvas();
    let rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.width;
  };

  useEffect(() => {
    const { canvas, ctx } = getCanvas();
    props.getSpin?.(spinRef.current);

    let animationFrameId: number;

    const draw = (ms: number) => {
      clock.time = ms;
      update(clock);
      render(canvas, ctx);
      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    resize();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    }
  }, []);

  return (
    <canvas
      className="roulette-canvas"
      ref={canvasRef}
      onClick={() => spin()}
    />
  );
});

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "#050B19",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: false,
            },
            onHover: {
              enable: false,
            },
            resize: true,
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            enable: false,
          },
          collisions: {
            enable: false,
          },
          move: {
            enable: true,
            speed: 5,
            direction: "none",
            outMode: "destroy", // Destroy particles when they hit the edge
            straight: true,
          },
          number: {
            value: 0,
          },
          opacity: {
            value: 0.5,
            anim: {
              enable: true,
              speed: 0.5,
              opacity_min: 0.1,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: 4,
            random: { min: 0.1, max: 1 },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
              startValue: "min",
              destroy: "max",
            },
          },
        },
        emitters: [
          {
            direction: "none",
            rate: {
              delay: 0.1,
              quantity: 5,
            },
            position: {
              x: 50,
              y: 50,
            },
            size: {
              width: 0,
              height: 0,
            },
            move: {
              enable: true,
              speed: 3,
              direction: "none",
              outMode: "destroy", // Destroy particles when they hit the edge
            },
          },
        ],
        detectRetina: true,
      }}
    />
  );
}

export default ParticlesBackground;

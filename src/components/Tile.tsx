import React from "react";
import Feels from "../assets/Icon-components/Feels";
import Humidity from "../assets/Icon-components/Humidity";
import Wind from "../assets/Icon-components/Wind";
import Visibility from "../assets/Icon-components/Visibility";
import Pressure from "../assets/Icon-components/Pressure";
import Precipitation from "../assets/Icon-components/Precipitation";
import Sunrise from "../assets/Icon-components/Sunrise";
import Sunset from "../assets/Icon-components/Sunset";

type Props = {
  icon:
    | "Feels"
    | "Humidity"
    | "Wind"
    | "Visibility"
    | "Pressure"
    | "Precipitation"
    | "Sunrise"
    | "Sunset";
  title: string;
  info: string | JSX.Element;
  description: string;
};

const icons = {
  Wind,
  Feels,
  Humidity,
  Visibility,
  Pressure,
  Precipitation,
  Sunrise,
  Sunset,
};

// Define a type for components that accept className
type IconComponent = React.ComponentType<{ className?: string }>;

const Tile = ({ icon, title, info, description }: Props): JSX.Element => {
  const Icon = icons[icon] as IconComponent;

  return (
    <article className="w-full bg-black bg-opacity-30 backdrop-blur-lg rounded drop-shadow-lg p-3 mb-3 flex flex-col justify-between h-30 text-white">
      <div className="flex items-center justify-center mb-2">
        <Icon className="w-6 h-6 text-white mr-2" />
        <h4 className="font-medium text-sm">{title}</h4>
      </div>
      <h3 className="font-bold text-lg text-center mb-1">{info}</h3>
      <p className="text-xs text-center">{description}</p>
    </article>
  );
};

export default Tile;

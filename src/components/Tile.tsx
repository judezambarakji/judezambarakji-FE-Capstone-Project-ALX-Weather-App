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

const Tile = ({ icon, title, info, description }: Props): JSX.Element => {
  const Icon = icons[icon];

  return (
    <article className="w-full bg-white/20 backdrop-blur-lg rounded drop-shadow-lg p-3 mb-3 flex flex-col justify-between h-32">
      <div className="flex items-center justify-center mb-2">
        <Icon className="w-6 h-6 text-zinc-700" />
        <h4 className="text-zinc-700 font-medium text-sm ml-1">{title}</h4>
      </div>
      <h3 className="text-zinc-700 font-bold text-lg text-center mb-2">
        {info}
      </h3>
      <p className="text-zinc-700 text-xs text-center">{description}</p>
    </article>
  );
};

export default Tile;

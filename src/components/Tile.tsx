import Feels from "../assets/Icon-components/Feels";
import Humidity from "../assets/Icon-components/Humidity";
import Wind from "../assets/Icon-components/Wind";
import Visibility from "../assets/Icon-components/Visibility";
import Pressure from "../assets/Icon-components/Pressure";
import Precipitation from "../assets/Icon-components/Precipitation";

type Props = {
  icon:
    | "Feels"
    | "Humidity"
    | "Wind"
    | "Visibility"
    | "Pressure"
    | "Precipitation";

  title: string;
  info: string | JSX.Element;
  description: string;
  //Sometimes the information will include degrees and that means it will be a JSX Element.
};

const icons = {
  Wind: Wind,
  Feels: Feels,
  Humidity: Humidity,
  Visibility: Visibility,
  Pressure: Pressure,
  Precipitation: Precipitation,
};

const Tile = ({ icon, title, info, description }: Props): JSX.Element => {
  const Icon = icons[icon];

  return (
    <article className="w-[140px] h-[130px] text-zinc-700 bg-white/20 backdrop-blur-lg rounded drop-shadow-lg p-2 mb-5 flex flex-col justify-between">
      <div className="flex items-center text-sm font-bold">
        <Icon /> <h4 className="ml-1">{title}</h4>
      </div>
      <h3 className="mt-2 text-lg">{info}</h3>
      <p className="text-xs font-bold">{description}</p>
    </article>
  );
};

export default Tile;

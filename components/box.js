import { cx } from "@utils/all";
import Image from "next/image";
import GetImage from "@utils/getImage";

export default function Boxes(props) {
  // console.log(props);
  return (
    <div
      className={cx(
        "grid gap-5",
        props.column === 1 ? "" : "md:grid-cols-2"
      )}>
      {props.items.map((item, index) => (
        <Box key={item._key} {...item} />
      ))}
    </div>
  );
}

function Box(props) {
  // console.log(props.icon);
  return (
    <div
      className={cx(
        "flex gap-3 items-start flex-col  border p-6 rounded-lg border-slate-200"
      )}>
      {props?.icon && (
        <div className="text-violet-600 flex bg-violet-100 p-3 rounded-full relative overflow-hidden">
          <div className="absolute inset-0 bg-violet-600 z-10 mix-blend-screen"></div>
          <Image
            src={GetImage(props.icon).src}
            width={16}
            height={16}
            alt="icon"
          />
        </div>
      )}
      <div className="flex flex-col">
        <span className="font-semibold text-xl">{props.title}</span>
        <span className="mt-1 text-gray-500">
          {" "}
          {props.description}
        </span>
      </div>

      {props.link && (
        <a
          href={props.link.href}
          className="text-violet-500 hover:text-violet-600 text-sm"
          rel="noopener  ">
          {props.link.text}
        </a>
      )}
    </div>
  );
}

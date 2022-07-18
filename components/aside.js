import { cx } from "@utils/all";

export default function Aside(props) {
  console.log();
  return (
    <div className="hidden lg:block sticky top-[55px] h-max">
      <nav className="w-64 px-5">
        {props.items.length > 0 && (
          <div>
            <h3 className="font-semibold text-sm mt-10 mb-2">
              On This Page
            </h3>
            <TableOfContents outline={props.items} />
          </div>
        )}
      </nav>
    </div>
  );
}

const getChildrenText = props =>
  props.children
    .map(node => (typeof node === "string" ? node : node.text || ""))
    .join("");

const TableOfContents = props => (
  <ol className={cx(" text-sm", props.subheading && "mt-1 ml-6")}>
    {props.outline.map(heading => (
      <li key={heading._key}>
        <a
          className="inline-flex py-1 text-slate-600 hover:text-violet-500 focus:text-violet-500"
          href={"#" + heading.slug}>
          {getChildrenText(heading)}
        </a>
        {heading.subheadings.length > 0 && (
          <TableOfContents
            outline={heading.subheadings}
            subheading={true}
          />
        )}
      </li>
    ))}
  </ol>
);

import { cx } from "@utils/all";
import Link from "next/link";
export default function Sidebar(props) {
  return (
    <div className="sticky h-[calc(100vh-55px)] border-r  border-gray-200 top-[55px] hidden md:block">
      <SideNav items={props.items} active={props.active} />
      <div className="border-t border-gray-200 p-4 absolute bottom-0 w-full ">
        <p className="text-sm text-slate-500">
          Made by{" "}
          <a
            href="https://web3templates.com"
            target="_blank"
            className="text-violet-500 hover:text-violet-600"
            rel="noopener">
            Web3Templates
          </a>
        </p>
      </div>
    </div>
  );
}

export function SideNav(props) {
  return (
    <div
      className={cx(
        "lg:w-64 pb-5  px-5 overflow-y-auto ",
        !props.mobile && " h-[calc(100%-53px)] "
      )}>
      <ul>
        {props.items.map((item, index) => (
          <li key={index} className="mt-5">
            <span className=" font-semibold"> {item.title}</span>
            <ul className="mt-2 mx-4">
              {item.items.map((doc, docindex) => (
                <li key={docindex}>
                  <Link
                    href={`/docs/${item.slug.current}/${doc.slug.current}`}>
                    <a
                      onClick={props.closeModal}
                      className={cx(
                        "inline-flex py-1 text-sm  hover:text-violet-500 focus:text-violet-500",
                        doc.slug.current === props.active
                          ? "text-violet-500"
                          : "text-slate-600"
                      )}>
                      {" "}
                      {doc.title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

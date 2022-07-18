export default function Anchor({ slug }) {
  return (
    <a
      href={`#${slug}`}
      className=" xl:-ml-[1.2em]   xl:float-left no-underline opacity-0 group-hover:opacity-100 group-focus:opacity-100  xl:pr-[0.55em]">
      #
    </a>
  );
}

import Image from "next/image";
import {
  groq,
  createClient,
  createPreviewSubscriptionHook
} from "next-sanity";
import { PortableText as PortableTextComponent } from "@portabletext/react";
import createImageUrlBuilder from "@sanity/image-url";
import { config } from "./config";
import GetImage from "@utils/getImage";
import Refractor from "react-refractor";
import js from "refractor/lang/javascript";
import jsx from "refractor/lang/jsx";
import html from "refractor/lang/markup";
import css from "refractor/lang/css";
import bash from "refractor/lang/bash";
import Link from "next/link";
import speakingurl from "speakingurl";
import Alert from "@components/alert";
import Boxes from "@components/box";
import Anchor from "@components/anchor";
Refractor.registerLanguage(js);
Refractor.registerLanguage(jsx);
Refractor.registerLanguage(html);
Refractor.registerLanguage(css);
Refractor.registerLanguage(bash);
if (!config.projectId) {
  throw Error(
    "The Project ID is not set. Check your environment variables."
  );
}
export const urlFor = source =>
  createImageUrlBuilder(config).image(source);

export const imageBuilder = source =>
  createImageUrlBuilder(config).image(source);

export const usePreviewSubscription =
  createPreviewSubscriptionHook(config);

// Barebones lazy-loaded image component
const ImageComponent = ({ value }) => {
  // const {width, height} = getImageDimensions(value)
  return (
    <Image
      {...GetImage(value)}
      blurDataURL={GetImage(value).blurDataURL}
      objectFit="cover"
      sizes="(max-width: 800px) 100vw, 800px"
      alt={value.alt || "Image"}
      placeholder="blur"
      loading="lazy"
    />
  );
};

const Code = ({ value }) => {
  return (
    <Refractor
      // In this example, `props` is the value of a `code` field
      language={value.language || "bash"}
      value={value.code}
      markers={value.highlightedLines}
    />
  );
};

const BoxType = ({ value }) => {
  return <Boxes {...value} />;
};

const Alertbox = ({ value }) => {
  return <Alert {...value} />;
};

const PortableTextTable = ({ value }) => {
  const [head, ...rows] = value.table.rows;
  // console.log(head);

  return (
    <table>
      {head.cells.filter(Boolean).length > 0 && (
        <thead>
          <tr>
            {head.cells.map(cell => (
              <th key={cell}>{cell}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {row.cells.map((cell, index) => {
              return <td key={cell}>{cell}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const getChildrenText = props =>
  props
    .map(node => (typeof node === "string" ? node : node.text || ""))
    .join("");

// Set up Portable Text serialization
export const PortableText = props => (
  <PortableTextComponent
    components={{
      types: {
        image: ImageComponent,
        code: Code,
        box: BoxType,
        alert: Alertbox,
        table: PortableTextTable
      },
      block: {
        h1: ({ children }) => {
          const text = getChildrenText(children);
          const slug = speakingurl(text);
          return (
            <h1 id={slug} className="group">
              {children} <Anchor slug={slug} />
            </h1>
          );
        },
        h2: ({ children }) => {
          const text = getChildrenText(children);
          const slug = speakingurl(text);
          return (
            <h2 id={slug} className="group">
              {children} <Anchor slug={slug} />
            </h2>
          );
        },
        h3: ({ children }) => {
          const text = getChildrenText(children);
          const slug = speakingurl(text);
          return (
            <h3 id={slug} className="group">
              {children} <Anchor slug={slug} />
            </h3>
          );
        },
        h4: ({ children }) => {
          const text = getChildrenText(children);
          const slug = speakingurl(text);
          return (
            <h4 id={slug} className="group">
              {children} <Anchor slug={slug} />
            </h4>
          );
        },
        h5: ({ children }) => {
          const text = getChildrenText(children);
          const slug = speakingurl(text);
          return (
            <h5 id={slug} className="group">
              {children} <Anchor slug={slug} />
            </h5>
          );
        },
        h6: ({ children }) => {
          const text = getChildrenText(children);
          const slug = speakingurl(text);
          return (
            <h6 id={slug} className="group">
              {children} <Anchor slug={slug} />
            </h6>
          );
        }
      },
      marks: {
        link: ({ children, value }) => {
          const rel = !value.href.startsWith("/")
            ? "noopener"
            : undefined;
          const target = !value.href.startsWith("/")
            ? "_blank"
            : undefined;
          return (
            <a href={value.href} rel={rel} target={target}>
              {children}
            </a>
          );
        },
        internalLink: ({ children, value }) => {
          return (
            <Link href={`/docs/${value.slug.current}`}>
              <a> {children}</a>
            </Link>
          );
        }
      }
    }}
    {...props}
  />
);

export const client = createClient(config);

export const previewClient = createClient({
  ...config,
  useCdn: false
});

export const getClient = usePreview =>
  usePreview ? previewClient : client;
export default client;

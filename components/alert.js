import {
  InfoCircledIcon,
  ExclamationTriangleIcon,
  CheckCircledIcon,
  CrossCircledIcon
} from "@radix-ui/react-icons";
import { cx } from "@utils/all";

export default function Alert(props) {
  // console.log(props);
  // switch case
  const Icon = () => {
    switch (props.type) {
      case "info":
        return <InfoCircledIcon className="w-5 h-5" />;
      case "success":
        return <CheckCircledIcon className="w-5 h-5" />;
      case "warning":
        return <ExclamationTriangleIcon className="w-5 h-5" />;
      case "error":
        return <CrossCircledIcon className="w-5 h-5" />;
    }
  };

  const theme = {
    info: "bg-sky-50 border-sky-900/10",
    warning: "bg-amber-50 border-amber-900/10",
    success: "border-green-900/10 bg-green-50",
    error: "border-red-900/10 bg-red-50"
  };

  const text = {
    info: "text-sky-700",
    warning: "text-amber-700",
    success: "text-green-700",
    error: "text-red-700"
  };

  return (
    <div
      className={cx(
        "p-4 border rounded flex items-start gap-2  mt-5",
        theme[props.type || "info"]
      )}
      role="alert">
      <span className={cx("pt-px mt-px", text[props.type || "info"])}>
        <Icon />
      </span>
      <div className="flex flex-col">
        {props.title && (
          <span
            className={cx(
              "text-base font-semibold",
              text[props.type || "info"]
            )}>
            {props.title}
          </span>
        )}
        {props.description && (
          <span
            className={cx(
              "text-sm font-medium ",
              props.title ? "mt-2" : "mt-1",
              text[props.type || "info"]
            )}>
            {props.description}
          </span>
        )}
        {props.link && (
          <a
            href={props.link.href}
            rel="noopener"
            className={cx(
              "text-sm font-medium mt-2",
              text[props.type || "info"]
            )}>
            {props.link.text}
          </a>
        )}
      </div>
    </div>
  );
}

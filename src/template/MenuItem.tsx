import Link from "next/link";
import { ElementType } from "react";

type Props = {
  icon: ElementType;
  text: string;
  url: string;
};

export default function MenuItem(props: Props) {
  return (
    <Link href={props.url} className="flex gap-2 px-4 py-2 hover:bg-slate-950">
      <props.icon size={24} stroke={1} />
      <span>{props.text}</span>
    </Link>
  );
}

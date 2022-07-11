import Button from "../../../core/Button/Button";
import Image from "next/image";
import Link from "next/link";

export default function FeedItem(props) {
  const { description, title, image, link } = props.article;
  return (
    <div className="grid grid-cols-3 xl:grid-cols-4 gap-3.75">
      <div className="col-span-1 flex flex-col w-full">
        <Image
          src={image}
          alt={title}
          className="rounded-2.5xl"
          layout="responsive"
          width="100%"
          height="100%"
        />
      </div>
      <div className="col-span-2 xl:col-span-3">
        <div className="flex flex-col h-full justify-between">
          <span className="text-base font-bold">{title}</span>
          <div>{description}</div>

          <Button>
            <Link href={link}>
              <>
                Read more{" "}
                <i className="fa-solid fa-circle-chevron-right pl-2 mt-0.5" />
              </>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

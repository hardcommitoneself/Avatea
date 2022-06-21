export default function ButtonOutlineFit(props) {
  return (
    <div
      className="flex justify-center py-2.5 px-10 items-center border border-indigo-500 text-indigo-500 rounded-full hover:cursor-pointer hover:bg-indigo-500 hover:text-white transition"
      onClick={props.handleClick}
    >
      {props.name}
    </div>
  );
}
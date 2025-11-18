import imgImage3 from "figma:asset/998e1333223a691be364d61c39bfa68a41a6848f.png";

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative size-full">
      <div className="aspect-[1491/731] relative shrink-0 w-full" data-name="image 3">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[273.6%] left-[-17.04%] max-w-none top-[-73.46%] w-[134.14%]" src={imgImage3} />
        </div>
      </div>
    </div>
  );
}
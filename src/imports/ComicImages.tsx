import imgComic5 from "figma:asset/c785ef4e083f943a6476d946c253313fad8f3d4a.png";
import imgComic1 from "figma:asset/2ce5a36e14e87806485c33800656ded5a1485124.png";
import imgComic2 from "figma:asset/e145d46d138b86f7d4dcd4a4996839a18e68edf7.png";
import imgComic3 from "figma:asset/6106edd412f878f27ce98ecae257c1e5a17a7f77.png";
import imgComic4 from "figma:asset/2281fd25f5cea14c4e86cbe294def8e9122d8885.png";

export default function ComicImages() {
  return (
    <div className="relative size-full" data-name="Comic Images">
      <div className="absolute h-[720px] left-0 top-0 w-[1280px]" data-name="Comic 5">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgComic5} />
      </div>
      <div className="absolute h-[720px] left-[1320px] top-0 w-[1280px]" data-name="Comic 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgComic1} />
      </div>
      <div className="absolute h-[720px] left-[2640px] top-0 w-[1280px]" data-name="Comic 2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgComic2} />
      </div>
      <div className="absolute h-[720px] left-0 top-[760px] w-[1280px]" data-name="Comic 3">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgComic3} />
      </div>
      <div className="absolute h-[720px] left-[1320px] top-[760px] w-[1280px]" data-name="Comic 4">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgComic4} />
      </div>
    </div>
  );
}
import imgImage2 from "figma:asset/40113f013cebce61f6435dec7d017c2dbd9c97ce.png";

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[33px] items-start not-italic relative shrink-0 text-white w-full">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] min-w-full relative shrink-0 text-[77.664px] w-[min-content]">
        Become a Kidspiration
        <br aria-hidden="true" />
        Hero Today
      </p>
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[48px] text-nowrap whitespace-pre">
        <p className="mb-0">Enlist to join the ER100 Campaign.</p>
        <p>Everyone reach 100 children.</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#ba87e8] box-border content-stretch flex gap-[10px] items-center justify-center px-[48px] py-[24px] relative rounded-[100px] shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[48px] text-nowrap text-white whitespace-pre">Join Now</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[79px] items-start relative shrink-0 w-full">
      <Frame3 />
      <Frame1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white h-[82px] relative rounded-[100px] shrink-0 w-[80px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[82px] items-center justify-center px-[48px] py-[24px] relative w-[80px]">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[48px] text-black text-nowrap whitespace-pre">{`<`}</p>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-white h-[82px] relative rounded-[100px] w-[80px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[82px] items-center justify-center px-[48px] py-[24px] relative w-[80px]">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[48px] text-black text-nowrap whitespace-pre">{`<`}</p>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[35px] items-center relative shrink-0">
      <Frame2 />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Frame4 />
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[42px] items-start relative shrink-0 w-[853px]">
      <Frame5 />
      <Frame6 />
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[688px] relative rounded-[54px] shrink-0 w-[1492px]">
      <div className="absolute h-[688px] left-0 rounded-bl-[102px] top-0 w-[1492px]" data-name="image 2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-bl-[102px] size-full" src={imgImage2} />
      </div>
    </div>
  );
}

export default function Frame8() {
  return (
    <div className="content-stretch flex gap-[108px] items-start relative size-full">
      <Frame7 />
      <Frame />
    </div>
  );
}
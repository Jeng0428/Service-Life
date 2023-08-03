export default function LiveLoveLife({ visibleSections }) {
  return (
    <section className="bg-yellow pt-[10vh]">
      <div className="container md:px-0 px-[15px]">
        <div className="md:w-10/12 mx-auto text-center">
          <h3 className="xl:text-[6rem] sm:text-[5rem] text-[2.5rem] tracking-[.2rem] text-black leading-[5rem] font-bold mb-8 font-Lemon">
            Live, Love & Laugh
          </h3>
          <p className="md:text-[25px] text-[16px] md:leading-[38px] leading-[28px] mb-4 text-black/80 font-normal ">
            
"Welcome to our inviting space where you can truly live, love, and laugh. Embrace the beauty of life's joyful moments as you find comfort and happiness in our warm and vibrant haven, where every day is filled with laughter and cherished memories."
          </p>
          <button className="bg-black rounded-full text-white px-16 py-2.5 border-0 shadow-lg flex items-center gap-3 mx-auto">
            Discover yourself at zestos
          </button>
          <img
            src="images/home/live_life.png"
            className="w-8/12 mx-auto mt-[6vh]"
          />
        </div>
      </div>
    </section>
  );
}

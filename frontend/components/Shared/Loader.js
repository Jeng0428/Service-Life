// import LoadingAnimation from "./LoadingAnimation";

// const Loader = ({ loading }) => {
//   return (
//     <>
//       {loading && (
//         <div style={{marginTop: -100}} className="preloader">
//           <div id="cupcake" className="box">
//             <span className="letter box">Z</span>
//             <span className="letter box">e</span>
//             <span className="letter box">s</span>
//             <span className="letter box">t</span>

//             <div className="cupcakeCircle box">
//               <div className="cupcakeInner box">
//                 <div className="cupcakeCore box"></div>
//               </div>
//             </div>
//             <span className="letter box">s</span>
//           </div>
//           <div style={{marginTop: 20 }}>
//           <LoadingAnimation progress={75} duration={1000} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Loader;

import React from "react";
import LoadingAnimation from "./LoadingAnimation";

const Loader = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999999999999]">
          <img src="/images/home/logo_white.png" className="w-[200px]" />
          <div style={{marginTop: 10 }}>
           <LoadingAnimation progress={75} duration={1000} />
           </div>
        </div>
      )}
    </>
  );
};

export default Loader;

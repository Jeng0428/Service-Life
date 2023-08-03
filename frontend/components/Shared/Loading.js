// import React from "react";
// // import LoadingAnimation from "./LoadingAnimation";

// function Loading() {
//   return (
//     <>
//     <div className="preloader">
//     <div className="sub-preloader">
//       <div className="spinner-border text-light" role="status"></div>
//       {/* <LoadingAnimation progress={75} duration={1000} /> */}
//     </div>      
//         </div>
//     </>
//   );
// }

// export default Loading;

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

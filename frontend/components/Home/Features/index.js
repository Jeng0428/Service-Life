import { CgWorkAlt } from "react-icons/cg";
import { BsMicrosoftTeams } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { motion } from "framer-motion";

export default function Features({ anime }) {
  return (
    <>
      {anime == "yes" ? (
        <motion.div
          initial={{ opacity: 0, y: "10vh" }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.9 }}
          transition={{ staggerChildren: 0.9, duration: 0.9 }}
        >
          <div className="overflow-hidden 2xl:px-0 px-[15px]">
            <div className="container 2xl:mt-28">
              <div className="grid xl:grid-cols-2 grid-cols-1 !gap-5 items-center">
                <div className="relative">
                  <p className="text-green text-[16px] font-medium leading-[20px] !mb-2">
                    Why choose us
                  </p>
                  {/* <h2 className="md:text-[36px] text-3xl leading-[40px] font-bold lg:text-[50px] lg:leading-[64px]">
                    Lorem ipsum Lorem ipsum ipsum
                  </h2>
                  <p className="text-[16px] leading-[28px] !mb-4 mt-8">
                    {" "}
                    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                    Lorem ipsum Lorem ipsum
                  </p> */}
                  <div className="flex sm:flex-row flex-col !text-center sm:!text-left !gap-5 items-center mt-8">
                    <div className="w-[55px] h-[55px] flex-shrink-0 flex items-center justify-center rounded-full bg-green">
                      <CgWorkAlt
                        size={34}
                        className="text-white flex-shrink-0"
                      />
                    </div>
                    <div>
                      <h6 className="text-[20px] leading-[24px] text-[#232728] font-semibold !mb-2">
                        Comfortable and Convenient Accommodation:
                      </h6>
                      <p className="text-[18px] text-[#232728]/70 font-normal">
                      The paying guest service should prioritize providing comfortable and well-furnished accommodations for guests. This includes offering clean and spacious rooms with necessary amenities such as beds, desks, storage space, and access to common areas like a kitchen, living room, or dining area. Convenience is also crucial, with easy access to public transportation, nearby amenities like supermarkets or restaurants, and a safe and secure environment.
                      </p>
                    </div>
                  </div>
                  <div className="flex sm:flex-row flex-col !text-center sm:!text-left !gap-5 items-center mt-8">
                    <div className="w-[55px] h-[55px] flex-shrink-0 flex items-center justify-center rounded-full bg-yellow">
                      <BsMicrosoftTeams
                        size={28}
                        className="text-white flex-shrink-0"
                      />
                    </div>
                    <div>
                      <h6 className="text-[20px] leading-[24px] text-[#232728] font-semibold !mb-2">
                        Quality Services and Facilities
                      </h6>
                      <p className="text-[18px] text-[#232728]/70 font-normal">
                      A paying guest service should offer high-quality services and facilities to enhance the guest's experience. This may include regular housekeeping services to maintain cleanliness, prompt maintenance and repairs, reliable Wi-Fi connectivity, and utilities such as electricity, water, and heating/cooling systems. Additionally, providing access to recreational facilities like a gym, laundry facilities, or common entertainment areas can further elevate the guest's satisfaction.
                      </p>
                    </div>
                  </div>
                  <div className="flex sm:flex-row flex-col !text-center sm:!text-left !gap-5 items-center mt-8">
                    <div className="w-[55px] h-[55px] flex-shrink-0 flex items-center justify-center rounded-full bg-orange">
                      <BiSupport
                        size={30}
                        className="text-white flex-shrink-0"
                      />
                    </div>
                    <div>
                      <h6 className="text-[20px] leading-[24px] text-[#232728] font-semibold !mb-2">
                        Supportive and Responsive Staff
                      </h6>
                      <p className="text-[18px] text-[#232728]/70 font-normal">
                      A crucial aspect of a paying guest service is the presence of supportive and responsive staff. Guests should feel welcomed and have access to staff members who are readily available to address their queries, concerns, and needs. This includes having a dedicated point of contact or a front desk service for assistance, ensuring a timely response to maintenance requests or complaints, and creating a friendly and professional atmosphere that promotes positive interactions between staff and guests.









                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative lg:block hidden">
                  <img src="images/home/creative.png" className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="overflow-hidden 2xl:px-0 px-[15px]">
          <div className="container 2xl:mt-28">
            <div className="grid xl:grid-cols-2 grid-cols-1 !gap-5 items-center">
              <div className="relative">
                <p className="text-green text-[16px] font-medium leading-[20px] !mb-2">
                  Why choose us
                </p>
                {/* <h2 className="md:text-[36px] text-3xl leading-[40px] font-bold lg:text-[50px] lg:leading-[64px]">
                  Lorem ipsum Lorem ipsum ipsum
                </h2>
                <p className="text-[16px] leading-[28px] !mb-4 mt-8">
                  {" "}
                  Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                  Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                  Lorem ipsum Lorem ipsum
                </p> */}
                <div className="flex sm:flex-row flex-col !text-center sm:!text-left !gap-5 items-center mt-8">
                  <div className="w-[55px] h-[55px] flex-shrink-0 flex items-center justify-center rounded-full bg-green">
                    <CgWorkAlt size={34} className="text-white flex-shrink-0" />
                  </div>
                  <div>
                    <h6 className="text-[20px] leading-[24px] text-[#232728] font-semibold !mb-2">
                      Comfortable and Convenient Accommodation:
                    </h6>
                    <p className="text-[18px] text-[#232728]/70 font-normal">
                    The paying guest service should prioritize providing comfortable and well-furnished accommodations for guests. This includes offering clean and spacious rooms with necessary amenities such as beds, desks, storage space, and access to common areas like a kitchen, living room, or dining area. Convenience is also crucial, with easy access to public transportation, nearby amenities like supermarkets or restaurants, and a safe and secure environment.
                    </p>
                  </div>
                </div>
                <div className="flex sm:flex-row flex-col !text-center sm:!text-left !gap-5 items-center mt-8">
                  <div className="w-[55px] h-[55px] flex-shrink-0 flex items-center justify-center rounded-full bg-yellow">
                    <BsMicrosoftTeams
                      size={28}
                      className="text-white flex-shrink-0"
                    />
                  </div>
                  <div>
                    <h6 className="text-[20px] leading-[24px] text-[#232728] font-semibold !mb-2">
                      Quality Services and Facilities
                    </h6>
                    <p className="text-[18px] text-[#232728]/70 font-normal">
                    A paying guest service should offer high-quality services and facilities to enhance the guest's experience. This may include regular housekeeping services to maintain cleanliness, prompt maintenance and repairs, reliable Wi-Fi connectivity, and utilities such as electricity, water, and heating/cooling systems. Additionally, providing access to recreational facilities like a gym, laundry facilities, or common entertainment areas can further elevate the guest's satisfaction.
                    </p>
                  </div>
                </div>
                <div className="flex sm:flex-row flex-col !text-center sm:!text-left !gap-5 items-center mt-8">
                  <div className="w-[55px] h-[55px] flex-shrink-0 flex items-center justify-center rounded-full bg-orange">
                    <BiSupport size={30} className="text-white flex-shrink-0" />
                  </div>
                  <div>
                    <h6 className="text-[20px] leading-[24px] text-[#232728] font-semibold !mb-2">
                      Supportive and Responsive Staff
                    </h6>
                    <p className="text-[18px] text-[#232728]/70 font-normal">
                    A crucial aspect of a paying guest service is the presence of supportive and responsive staff. Guests should feel welcomed and have access to staff members who are readily available to address their queries, concerns, and needs. This includes having a dedicated point of contact or a front desk service for assistance, ensuring a timely response to maintenance requests or complaints, and creating a friendly and professional atmosphere that promotes positive interactions between staff and guests.









                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

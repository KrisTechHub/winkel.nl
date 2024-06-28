import React, { useState } from "react";

const Tabs = () => {
  const [open, setOpen] = useState("home");

  const handleTabOpen = (tabCategory) => {
    setOpen(tabCategory);
  };

  return (
    <>
      <section className="py-20 dark:bg-dark lg:py-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mb-14 w-full">
                <div className="flex flex-col flex-wrap rounded-lg border border-[#E4E4E4] px-4 py-3 dark:border-dark-3 sm:flex-row">
                  <a onClick={() => handleTabOpen("home")}
                    className={`cursor-pointer rounded-md px-4 py-3 text-sm font-medium md:text-base lg:px-6 ${
                      open === "home" ? "bg-primary text-white" : "text-body-color hover:bg-primary hover:text-white dark:text-dark-6 dark:hover:text-white"
                    }`} > Home
                  </a>
                  <a onClick={() => handleTabOpen("about")} className={`cursor-pointer rounded-md px-4 py-3 text-sm font-medium md:text-base lg:px-6 ${
                      open === "about" ? "bg-primary text-white" : "text-body-color hover:bg-primary hover:text-white dark:text-dark-6 dark:hover:text-white"
                    }`} > About Us
                  </a>
                </div>
                <TabContent
                  details=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia nisi, doloribus nulla cumque molestias corporis eaque harum vero! Quas sit odit optio debitis nulla quisquam, dolorum quaerat animi iusto quod."
                  tabCategory="home"
                  open={open}
                />
                <TabContent
                  details=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia nisi, doloribus nulla cumque molestias corporis eaque harum vero! "
                  tabCategory="about"
                  open={open}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tabs;

const TabContent = ({ open, tabCategory, details }) => {
  return (
    <div>
      <div
        className={`p-6 text-base leading-relaxed text-body-color dark:text-dark-6 ${
          open === tabCategory ? "block" : "hidden"
        } `}
      >
        {details}
      </div>
    </div>
  );
};

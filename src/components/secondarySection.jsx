import React, { useState } from "react";

const tabData = {
  "popular Attractions": [
    [
      "Victoria Falls",
      "Hwange National Park",
      "Matobo National Park",
      "Great Zimbabwe Ruins",
    ],
    [
      "Mana Pools National Park",
      "Lake Kariba",
      "Chimanimani Mountains",
      "Gonarezhou National Park",
    ],
    [
      "Bulawayo",
      "Nyanga National Park",
      "Chinhoyi Caves",
      "Harare Gardens",
    ],
  ],
  airports: [
    [
      "Robert Gabriel Mugabe International Airport",
      "Victoria Falls International Airport",
      "Joshua Mqabuko Nkomo International Airport",
      "Charles Prince Airport",
    ],
    [
      "Buffalo Range Airport",
      "Masvingo Airport",
      "Mutare Airport",
      "Kariba Airport",
    ],
    [
      "Hwange National Park Airport",
      "Gweru-Thornhill Air Base",
    ],
  ],
  cities: [
    [
      "Bulawayo",
      "Victoria Falls Town",
      "Harare",
      "Mutare",
    ],
    [
      "Masvingo",
      "Gweru",
      "Kwekwe",
      "Chinhoyi",
    ],
    [
      "Kariba",
      "Chipinge",
    ],
  ],
  hospitals: [
    [
      "Parirenyatwa Group of Hospitals",
      "Harare Central Hospital",
      "United Bulawayo Hospitals (UBH)",
      "Mpilo Central Hospital",
    ],
    [
      "Chitungwiza Central Hospital",
      "St. Anne's Hospital",
      "Avenues Clinic",
      "Mater Dei Hospital",
    ],
    [
      "Karanda Mission Hospital",
      "Howard Mission Hospital",
    ],
  ],
};

const tabTitles = [
  "popular Attractions",
  "cities",
  "airports",
  "hospitals"
];

const SecondarySection = () => {
  const [activeTab, setActiveTab] = useState("popular Attractions");

  return (
    <section id="secondary">
      <h4>Top Locations</h4>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis,
        cupiditate, vitae ipsa voluptates consequatur saepe esse in deleniti,
        debitis totam molestiae obcaecati! Laboriosam architecto fugiat odit?
        Eaque possimus reprehenderit similique repellendus laboriosam. Natus
        sed repellat dolore eaque soluta nulla commodi quasi doloremque
        laborum expedita, placeat asperiores tempore voluptatem, fugit
        deleniti!
      </p>
      <div className="tab-titles">
        {tabTitles.map((title) => (
          <p
            key={title}
            className={`tab-links${activeTab === title ? " active-link" : ""}`}
            onClick={() => setActiveTab(title)}
          >
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </p>
        ))}
      </div>
      {tabTitles.map((title) => (
        <div
          key={title}
          className={`tab-contents${activeTab === title ? " active-tab" : ""}`}
          style={{ display: activeTab === title ? "block" : "none" }}
          id={title}
        >
          <div className="info">
            {tabData[title].map((group, i) => (
              <div key={i}>
                <ul>
                  {group.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default SecondarySection;
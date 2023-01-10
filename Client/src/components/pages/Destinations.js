import React from "react";
import "../../App.css";
import "./Destinations.css";
import CardItem from "./../CardItem";

export default function Destinations() {
  return (
    <div>
      <h1 className="destinations">DESTINATIONS</h1>
      <div className="cards">
        <h1>Fly with us! Seek these EPIC Destinations!</h1>
        <div className="cards__container">
          <div className="cards__wrapper">
            <ul className="cards__items">
              <CardItem
                src="images/img-colombo.jpg"
                text="Explore the vibrant and diverse capital of Sri Lanka"
                // text="Explore the hidden waterfall deep inside the Amazon Jungle"
                label="Colombo"
              />
              <CardItem
                src="images/img-maththala.jpg"
                text="Seek a relaxing getaway in the southern coast of Sri Lanka"
                // text="Travel through the Islands of Bali in a Private Cruise"
                label="Maththala"
              />
            </ul>
            <ul className="cards__items">
              <CardItem
                src="images/img-minnesota.jpg"
                text="Feel the natural beauty in the upper midwest of the United States"
                // text="Set Sail in the Atlantic Ocean visiting Uncharted Waters"
                label="Minnesota"
              />
              <CardItem
                src="images/img-newdelhi.jpg"
                text="Explore the culture in the bustling and vibrent city of New Delhi"
                // text="Experience Football on Top of the Himilayan Mountains"
                label="New Delhi"
              />
              <CardItem
                src="images/img-mumbai.jpg"
                text="Seek the hustle and bustle of the city of Mumbai"
                // text="Ride through the Sahara Desert on a guided camel tour"
                label="Mumbai"
              />
            </ul>
            <ul className="cards__items">
              <CardItem
                src="images/img-chennai.jpg"
                text="Embrace the religious vibe in the city of Chennai"
                label="Chennai"
              />
              <CardItem
                src="images/img-bangkok.jpg"
                text="Get blessing from ornate temples and shrines in the city of Bangkok"
                label="Bangkok"
              />
              <CardItem
                src="images/img-singapore.jpg"
                text="Seek the modern and vibrant city of Singapore"
                label="Singapore"
              />
            </ul>
            <ul className="cards__items">
              <CardItem
                src="images/img-indonisia.jpg"
                text="Enjoy the unique blend of culture, history, and natural beauty"
                label="Indonesia"
              />
              <CardItem
                src="images/img-bali.jpg"
                text="Travel through the Islands of Bali in a Private Cruise"
                label="Bali"
              />
              <CardItem
                src="images/img-ny.jpg"
                text="Witness the beauty of the city that never sleeps"
                label="New York"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

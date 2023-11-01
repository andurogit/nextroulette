import { Wheel } from "@/components/roulette";
import React, { useState, useEffect } from "react";
import styles from "../styles/customRoulette.module.css";

interface Option {
  text: string;
}

interface RouletteProps {
  data: Option[];
}

const backgroundColors = ["#ff8f43", "#70bbe0", "#0b3351", "#f9dd50"];
const textColors = ["#0b3351"];
const outerBorderColor = "#eeeeee";
const outerBorderWidth = 10;
const innerBorderColor = "#30261a";
const innerBorderWidth = 0;
const innerRadius = 0;
const radiusLineColor = "#eeeeee";
const radiusLineWidth = 8;
const fontFamily = "Nunito";
const fontSize = 20;
const textDistance = 60;
const spinDuration = 1.0;

const Roulette: React.FC<RouletteProps> = ({ data }) => {
  const [mustSpin, setMustSpin] = useState<boolean>(false);
  const [prizeNumber, setPrizeNumber] = useState<number>(0);
  const [rouletteData, setRouletteData] = useState<
    {
      completeOption: string;
      option: string;
    }[]
  >(
    data.map((item) => ({
      completeOption: item.text,
      option:
        item.text.length >= 30
          ? item.text.substring(0, 30).trimEnd() + "..."
          : item.text,
    }))
  );

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  useEffect(() => {
    const addShortString = data.map((item) => ({
      completeOption: item.text,
      option:
        item.text.length >= 30
          ? item.text.substring(0, 30).trimEnd() + "..."
          : item.text,
    }));
    setRouletteData(addShortString);
  }, [data]);

  return (
    <>
      <div className={styles["roulette-container"]}>
        <Wheel
          mustStartSpinning={mustSpin}
          //   spinDuration={[0.2]}
          prizeNumber={prizeNumber}
          data={rouletteData}
          innerBorderColor={"#ccc"}
          outerBorderWidth={9}
          radiusLineColor={"tranparent"}
          radiusLineWidth={1}
          fontFamily={fontFamily}
          textColors={["#f5f5f5"]}
          textDistance={55}
          fontSize={20}
          backgroundColors={[
            "#3f297e",
            "#175fa9",
            "#169ed8",
            "#239b63",
            "#64b031",
            "#efe61f",
            "#f7a416",
            "#e6471d",
            "#dc0936",
            "#e5177b",
            "#be1180",
            "#871f7f",
          ]}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />
        <button
          className={styles["button roulette-button"]}
          onClick={handleSpinClick}
        >
          돌려🚀
        </button>
      </div>
      <br />
      {/* <button
        className={styles["prize-message"]}
        onClick={handleSpinClick}
        disabled={mustSpin}
      >
        {!mustSpin ? rouletteData[prizeNumber].completeOption : "돌리는 중..."}
      </button> */}
    </>
  );
};

export default Roulette;

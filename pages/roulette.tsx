/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";
import styles from "../styles/customRoulette.module.css";
import {
  DragDropContext,
  Draggable,
  type DragUpdate,
} from "react-beautiful-dnd";
import { BiGridVertical, BiPlus, BiTrash } from "react-icons/bi";

interface InputItem {
  [key: string]: string;
  id: string;
  text: string;
}

const Roulette = dynamic(() => import("@/components/customRoulette"), {
  ssr: false,
});

const DraggableCustom = dynamic(() => import("@/components/customDraggable"), {
  ssr: false,
});

function RouletteCust() {
  const [inputList, setInputList] = useState<InputItem[]>([
    {
      id: uuidv4(),
      text: "홍콩반점",
    },
    {
      id: uuidv4(),
      text: "참진-돈가스",
    },
    {
      id: uuidv4(),
      text: "진룽마라탕",
    },
    {
      id: uuidv4(),
      text: "규동",
    },
    {
      id: uuidv4(),
      text: "수라멘(송파)",
    },
    {
      id: uuidv4(),
      text: "필라멘(가락)",
    },
    {
      id: uuidv4(),
      text: "닭칼국수",
    },
  ]);

  // handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { text: "", id: uuidv4() }]);
  };

  return (
    <div className={styles["main-form"]}>
      <div className={styles["text-title"]}>
        <h2>돌려 돌려 돌림판</h2>
      </div>
      <Roulette data={inputList} />
      <DraggableCustom inputList={inputList} setInputList={setInputList} />
    </div>
  );
}

export default RouletteCust;

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

const defaultData = [
  {
    id: uuidv4(),
    text: "한식",
  },
  {
    id: uuidv4(),
    text: "중식",
  },
  {
    id: uuidv4(),
    text: "일식",
  },
  {
    id: uuidv4(),
    text: "분식",
  },
  {
    id: uuidv4(),
    text: "양식",
  },
];

function RouletteCust() {
  const [inputList, setInputList] = useState<InputItem[]>(defaultData);

  useEffect(() => {
    // 클라이언트 측에서만 실행되도록 제한
    if (typeof window !== "undefined") {
      const savedData = JSON.parse(localStorage.getItem("items") || "[]");
      if (savedData.length > 0) {
        setInputList(savedData);
      }
    }
  }, []);

  // 스토리지에 데이터가 없을 경우 세팅
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = JSON.parse(localStorage.getItem("items") || "[]");
      if (savedData.length == 0) {
        localStorage.setItem("items", JSON.stringify(inputList));
      }
    }
  }, [inputList]);

  // const [inputList, setInputList] = useState<InputItem[]>([
  //   {
  //     id: uuidv4(),
  //     text: "홍콩반점",
  //   },
  //   {
  //     id: uuidv4(),
  //     text: "참진-돈가스",
  //   },
  //   {
  //     id: uuidv4(),
  //     text: "진룽마라탕",
  //   },
  //   {
  //     id: uuidv4(),
  //     text: "규동",
  //   },
  //   {
  //     id: uuidv4(),
  //     text: "수라멘(송파)",
  //   },
  //   {
  //     id: uuidv4(),
  //     text: "필라멘(가락)",
  //   },
  //   {
  //     id: uuidv4(),
  //     text: "닭칼국수",
  //   },
  // ]);

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

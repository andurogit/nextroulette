/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";

interface InputItem {
  [key: string]: string;
  id: string;
  text: string;
}

const Roulette = dynamic(() => import("@/components/customRoulette"), {
  ssr: false,
});

function roulette() {
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

  // function handleOnDragEnd(result: DragUpdate) {
  //   if (!result.destination) return;

  //   const items = Array.from(inputList);
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);

  //   setInputList(items);
  // }
  return (
    <>
      <Roulette data={inputList} />
    </>
  );
}

export default roulette;

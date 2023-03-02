/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
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

  function handleOnDragEnd(result: DragUpdate) {
    if (!result.destination) return;

    const items = Array.from(inputList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setInputList(items);
  }
  return (
    <div className={styles["main-form"]}>
      <div className={styles["text-title"]}>
        <h2>돌려 돌려 돌림판</h2>
      </div>
      <Roulette data={inputList} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Draggable draggableId="draggable-1" index={0}>
          {(provided) => (
            <ul
              className="items"
              {...provided.draggableProps}
              ref={provided.innerRef}
              style={{ listStyle: "none" }}
            >
              {inputList.map((x, index) => {
                return (
                  <Draggable key={x.id} draggableId={x.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles["list-item"]}
                      >
                        <div className={styles.item}>
                          <BiGridVertical />
                          <input
                            name="text"
                            placeholder="항목을 입력하세요 ( 입력하지 않음 )"
                            value={x.text}
                            onChange={(e) => handleInputChange(e, index)}
                            className={styles["input"]}
                          />
                        </div>
                        <div className={styles["btn-box"]}>
                          {inputList.length !== 1 && (
                            <button
                              className={styles["button"]}
                              onClick={() => handleRemoveClick(index)}
                            >
                              <BiTrash />
                            </button>
                          )}
                        </div>
                      </li>
                    )}
                  </Draggable>
                );
              })}
            </ul>
          )}
        </Draggable>
      </DragDropContext>
      <button
        onClick={handleAddClick}
        style={{ marginLeft: "2.1rem" }}
        className={styles["button"]}
      />
      <BiPlus />
    </div>
  );
}

export default roulette;

import {
  DragDropContext,
  Draggable,
  Droppable,
  type DragUpdate,
} from "react-beautiful-dnd";
import { BiGridVertical } from "react-icons/bi";
import styles from "../styles/customRoulette.module.css";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

interface InputItem {
  [key: string]: string;
  id: string;
  text: string;
}

interface DraggableProps {
  inputList: InputItem[];
  setInputList: React.Dispatch<React.SetStateAction<InputItem[]>>;
}

// uuid 중복 검사
const generatedUniqueUUID = () => {
  let uuid;
  const items = localStorage.getItem("items");
  if (items !== null) {
    do {
      uuid = uuidv4();
    } while (items.includes(uuid));
  } else {
    uuid = uuidv4();
  }

  return uuid;
};

const DraggableCustom: React.FC<DraggableProps> = (props) => {
  const { inputList, setInputList } = props;

  // 데이터 저장
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(inputList));
  }, [inputList]);

  const handleOnDragEnd = (result: DragUpdate) => {
    if (!result.destination) return;

    const items = Array.from(inputList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setInputList(items);
  };

  // handle click event of the Remove button
  // const handleRemoveClick = (index: number) => {
  //   const list = [...inputList];
  //   list.splice(index, 1);
  //   setInputList(list);
  // };

  // handle click event of the Add button
  const handleAddClick = () => {
    // list 에 넣기
    setInputList([...inputList, { text: "", id: generatedUniqueUUID() }]);
  };

  // handle input change
  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   index: number
  // ) => {
  //   const { name, value } = e.target;
  //   const list = [...inputList];
  //   list[index][name] = value;
  //   setInputList(list);
  // };

  // 데이터 업데이트
  const updateItem = (id: string, newText: string) => {
    const updatedItems = inputList.map((item) =>
      item.id === id ? { ...item, text: newText } : item
    );
    setInputList(updatedItems);
  };

  // 데이터 삭제
  const deleteItem = (id: string) => {
    const updatedItems = inputList.filter((item) => item.id !== id);
    setInputList(updatedItems);
  };

  return (
    <div>
      {/* Test component */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <ul
              className="items"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ listStyle: "none" }}
            >
              {inputList.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
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
                            value={item.text}
                            onChange={(e) =>
                              updateItem(item.id, e.target.value)
                            }
                            className={styles["input"]}
                          />

                          <div className={styles["btn-box"]}>
                            {inputList.length !== 1 && (
                              <button
                                className={styles["button"]}
                                onClick={() => deleteItem(item.id)}
                              >
                                삭제
                              </button>
                            )}
                          </div>
                        </div>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <button
        onClick={handleAddClick}
        style={{ marginLeft: "2.1rem" }}
        className={styles["add-btn"]}
      >
        추가
      </button>
    </div>
  );
};

export default DraggableCustom;

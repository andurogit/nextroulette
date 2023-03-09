import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface taskProps {
  id: string;
  index: number;
  title: string;
}

function Task(props: taskProps) {
  const { id, index, title } = props;
  let style = {
    backgroundColor: "red",
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h4 style={style}>{title}</h4>
        </div>
      )}
    </Draggable>
  );
}

export default Task;

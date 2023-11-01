import { useState, useEffect } from "react";

interface Item {
  id: number;
  text: string;
}

function MyComponent() {
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState<string>("");

  // 데이터 초기화
  useEffect(() => {
    const storedItems = JSON.parse(
      localStorage.getItem("items") || "[]"
    ) as Item[];
    setItems(storedItems);
  }, []);

  // 데이터 저장
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (text) {
      const newItem: Item = { id: Date.now(), text };
      setItems((prevItems) => [...prevItems, newItem]);
      setText("");
    }
  };

  const updateItem = (id: number, newText: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, text: newText } : item
    );
    setItems(updatedItems);
  };

  const deleteItem = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addItem}>Add</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              type="text"
              value={item.text}
              onChange={(e) => updateItem(item.id, e.target.value)}
            />
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyComponent;

import React from "react";

interface Props {
  items: { id: number; text: string }[];
  func: (text: string) => void;
}
const Example: React.FC<Props> = props => {
  return (
    <div>
      {props.items.map(item => {
        return (
          <div key={item.id}>
            <p>id: {item.id}</p>
            <p>text: {item.text}</p>
            <button
              onClick={() => {
                props.func(item.text);
              }}
            >
              {item.text}
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default Example;

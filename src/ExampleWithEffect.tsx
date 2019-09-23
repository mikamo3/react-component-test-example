import * as React from "react";
import { useState, useEffect } from "react";
import { asyncProc } from "./exampleLib";

// mount時にprops.strを引数に非同期な処理を呼び出し
// 結果をstateに入れて
// div要素で表示する

interface Props {
  str: string;
}
const ExampleWithEffect: React.FC<Props> = props => {
  const [procResult, setProcResult] = useState("");
  useEffect(() => {
    const proc = async () => {
      try {
        const res = await asyncProc(props.str);
        setProcResult(res);
      } catch (e) {
        setProcResult(e);
      }
    };
    proc();
  }, []);
  return <div>{procResult}</div>;
};

export default ExampleWithEffect;

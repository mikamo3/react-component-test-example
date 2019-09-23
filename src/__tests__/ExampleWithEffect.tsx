//https://chaika.hatenablog.com/entry/2019/09/12/083000
//https://ja.reactjs.org/docs/testing-recipes.html#data-fetching
//https://dev.to/theactualgivens/testing-react-hook-state-changes-2oga

import React from "react";
import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";
import ExampleWithEffect from "../ExampleWithEffect";
import { asyncProc } from "../exampleLib";
let container: HTMLDivElement | null;
jest.mock("../exampleLib");
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
  }
  container = null;
  jest.clearAllMocks();
});

describe("useEffectの確認", () => {
  describe("mount時", () => {
    describe("asyncProcがresolveされたとき", () => {
      it("asyncLibがpropsのstrの値を引数に実行され、procResultに実行結果が格納され、div要素に表示されること", async () => {
        //componentで呼び出しているmoduleをモック
        const mockedAsyncProc = asyncProc as jest.MockedFunction<
          typeof asyncProc
        >;
        // resolvedで返す値を設定
        mockedAsyncProc.mockResolvedValue("foo");

        // componentをレンダリング、useEffectが実行完了するのを待つ
        await act(async () => {
          render(<ExampleWithEffect str="bar" />, container);
        });
        expect(mockedAsyncProc.mock.calls).toEqual([["bar"]]);
        expect((container as HTMLDivElement).textContent).toEqual("foo");
      });
    });
    describe("asyncProcがrejectされたとき", () => {
      //omit
    });
  });
});

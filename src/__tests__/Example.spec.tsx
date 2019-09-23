import Example from "../Example";

// findやらが使いにくいのでenzyme使ったほうがいいかもしれない
// スナップショットの確認につかう
import renderer from "react-test-renderer";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import React from "react";

//ここは別途jestのsetupFileに書く
//https://qiita.com/Hitomi_Nagano/items/df30da9086b705532aca

Enzyme.configure({ adapter: new Adapter() });

const items = [
  { id: 1, text: "foo" },
  { id: 2, text: "bar" },
  { id: 3, text: "baz" }
];

describe("snapshot test", () => {
  //https://jestjs.io/docs/ja/snapshot-testing
  it("意図していないUIの変更がないこと", () => {
    const tree = renderer
      .create(<Example items={items} func={() => {}} />)
      .toJSON();
    //codesandboxではうまく動かない
    //expect(tree).toMatchSnapshot();
  });
});

describe("domの確認", () => {
  let wrapper: Enzyme.ShallowWrapper;
  // describe配下のitが実行される前に1度だけ実行
  beforeAll(() => {
    //Shallow rendering is useful to constrain yourself to testing a component
    //as a unit, and to ensure that your tests aren't indirectly asserting on
    // behavior of child components.
    //子コンポーネントはレンダリングされないので対象のコンポーネントのUnitTestに使用する
    wrapper = shallow(<Example items={items} func={() => {}} />);
  });

  it("itemsの件数分divが存在すること", () => {
    expect(wrapper.find("div > div")).toHaveLength(items.length);
  });

  describe("div要素の確認", () => {
    let firstDivNode: Enzyme.ShallowWrapper;
    beforeAll(() => {
      firstDivNode = wrapper.find("div > div").at(0);
    });
    it("最初のpタグの値が「id: item.id」の値であること", () => {
      expect(
        firstDivNode
          .find("p")
          .at(0)
          .text()
      ).toEqual(`id: ${items[0].id.toString()}`);
    });
    it("2つめのpタグの値が「text: item.text」の値であること", () => {
      expect(
        firstDivNode
          .find("p")
          .at(1)
          .text()
      ).toEqual(`text: ${items[0].text}`);
    });
    it("ボタンのtextがitem.textの値であること", () => {
      expect(firstDivNode.find("button").text()).toEqual(items[0].text);
    });
  });
});
describe("イベントの確認", () => {
  describe("buttonクリック時", () => {
    let mockFunc: jest.MockedFunction<(str: string) => void>;
    beforeAll(() => {
      // describe配下のitが実行される前に1度だけ実行
      mockFunc = jest.fn();
      const wrapper = shallow(<Example items={items} func={mockFunc} />);
      // 最初のdiv要素にあるボタンのクリックをシミュレーションする
      wrapper
        .find("div > div")
        .at(0)
        .find("button")
        .simulate("click");
    });
    it("funcで指定した関数が1回呼ばれ、その引数がstrのあたいであること", () => {
      expect(mockFunc.mock.calls).toEqual([[items[0].text]]);
    });
  });
});

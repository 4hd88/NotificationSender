import {
  ButtonItem,
  PanelSection,
  PanelSectionRow,
  Navigation,
  staticClasses
} from "@decky/ui";
import {
  addEventListener,
  removeEventListener,
  callable,
  definePlugin,
  toaster,
  // routerHook
} from "@decky/api"
import { useState } from "react";
import { FaShip } from "react-icons/fa";

// import logo from "../assets/logo.png";

// This function calls the python function "add", which takes in two numbers and returns their sum (as a number)
// Note the type annotations:
//  the first one: [first: number, second: number] is for the arguments
//  the second one: number is for the return value
const add = callable<[first: number, second: number], number>("add");

const showNotification = callable<[InputTester: string, TitleText: string], void>("callNotification");

function Content() {
  //const [result, setResult] = useState<number | undefined>();
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");


  //const onClick = async () => {
  //  const result = await add(Math.random(), Math.random());
  //  setResult(result);
  //};

  return (
    <PanelSection title="">
      
      {/* Added textboxes */}
      <PanelSectionRow>
        <input
          type="text"
          value={text2}
          onChange={(e) => setText2(e.target.value)}
          placeholder="Notification Title"
          style={{
            background: "#23262e",
            color: "#c7d5e0",
            border: "1px solid #3a3f4b",
            borderRadius: "6px",
            padding: "10px",
            fontSize: "16px",
            width: "100%",
            marginBottom: "8px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
            boxSizing: "border-box",
            display: "block"
          }}
        />
      </PanelSectionRow>
      <PanelSectionRow>
        <input
          type="text"
          value={text1}
          onChange={(e) => setText1(e.target.value)}
          placeholder="Notification Message"
          style={{
            background: "#23262e",
            color: "#c7d5e0",
            border: "1px solid #3a3f4b",
            borderRadius: "6px",
            padding: "10px",
            fontSize: "16px",
            width: "100%",
            marginBottom: "8px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
            boxSizing: "border-box",
            display: "block"
          }}
        />
      </PanelSectionRow>
        <ButtonItem
          layout="below"
          onClick={() => showNotification(text1, text2)}
        >
          {"Send Notification"}
        </ButtonItem>
    </PanelSection>
  );
};


export default definePlugin(() => {
  console.log("notificationtester plugin initializing, this is called once on frontend startup")

  // serverApi.routerHook.addRoute("/decky-plugin-test", DeckyPluginRouterTest, {
  //   exact: true,
  // });

  // Add an event listener to the "timer_event" event from the backend
  const listener = addEventListener<[
    test1: string,
    test2: boolean,
    test3: number
  ]>("timer_event", (test1, test2) => {
    console.log(`${test2} got timer_event with:`, test1);
    toaster.toast({
      title: `${test2}`,
      body: `${test1}`
    });
  });

  return {
    // The name shown in various decky menus
    name: "Notification Tester",
    // The element displayed at the top of your plugin's menu
    titleView: <div className={staticClasses.Title}>Notification Tester</div>,
    // The content of your plugin's menu
    content: <Content />,
    // The icon displayed in the plugin list
    icon: <FaShip />,
    // The function triggered when your plugin unloads
    onDismount() {
      console.log("Unloading")
      removeEventListener("timer_event", listener);
      // serverApi.routerHook.removeRoute("/decky-plugin-test");
    },
  };
});

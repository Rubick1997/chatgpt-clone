import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

const pageDataUtils = {
  descriptionItems: [
    {
      icon: SunIcon,
      title: "Examples",
      promts: [
        "Explain Something to me",
        "Dog or Cats ?",
        "What is the color of the sun ?",
      ],
    },
    {
      icon: BoltIcon,
      title: "Capabilities",
      promts: [
        "Change the ChatGpt model to use",
        "Messages stored in firebase store",
        "Cool notifications",
      ],
    },
    {
      icon: ExclamationTriangleIcon,
      title: "Limitations",
      promts: [
        "Not always the right information",
        "Do not trust to everything",
        "Some times not all questions are answered",
      ],
    },
  ],
};

export { pageDataUtils };

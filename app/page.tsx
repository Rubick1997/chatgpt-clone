import { pageDataUtils } from "@/dataUtils";

export default function Home() {
  const { descriptionItems } = pageDataUtils;
  return (
    <div className="text-white flex flex-col items-center justify-center h-screen px-2">
      <h1 className="text-5xl font-bold mb-20">ChatGPT</h1>
      <div className="flex space-x-2 text-center">
        {descriptionItems.map(({ icon: Icon, ...item }) => (
          <div key={item.title}>
            <div>
              <div className="flex flex-col items-center justify-center mb-5">
                <Icon className="h-8 w-8" />
                <h2>{item.title}</h2>
              </div>
              <div className="space-y-2">
                {item.promts.map((promt) => (
                  <p key={promt} className="infoText">
                    {promt}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

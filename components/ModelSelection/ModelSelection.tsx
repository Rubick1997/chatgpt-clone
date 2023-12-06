"use client";
import axios from "axios";
import useSWR from "swr";
import Select from "react-select";

const fetchModels = () => axios.get("/api/getEngines").then((res) => res);

function ModelSelection() {
  const { data: models, isLoading } = useSWR("models", fetchModels);
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "gpt-4-vision-preview",
  });

  return (
    <div>
      <Select
        className="mt-2"
        options={models?.data.modelOptions}
        isLoading={isLoading}
        defaultValue={model}
        placeholder={model}
        menuPosition="fixed"
        isSearchable
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: "#434654",
            borderColor: "#434654",
          }),
        }}
        onChange={(e) => {
          console.log(e);
          setModel(e.value);
        }}
      />
    </div>
  );
}
export default ModelSelection;

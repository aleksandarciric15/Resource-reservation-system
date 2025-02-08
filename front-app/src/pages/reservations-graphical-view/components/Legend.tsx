import { ColorResource } from "@/api/models/resource";

type LegendProps = {
  resources: ColorResource[];
};

export default function Legend({ resources }: LegendProps) {
  const uniqueResourceTypes = [
    ...new Set(resources.map((r) => r.resourceTypeName)),
  ];

  return (
    <div className="flex flex-col">
      <div>
        <p className="text-sm">
          <code>* To see details hover over rectangles</code>
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4 mt-6 p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-100 mr-2 rounded"></div>
          <span className="text-sm text-gray-600">Available</span>
        </div>
        {uniqueResourceTypes.map((type, index) => {
          const resourceOfType = resources.find(
            (r) => r.resourceTypeName === type
          );
          return (
            <div key={index} className="flex items-center">
              <div
                className="w-4 h-4 mr-2 rounded"
                style={{ backgroundColor: resourceOfType?.color }}
              ></div>
              <span className="text-sm text-gray-600">{type}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

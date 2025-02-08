import { Separator } from "@/components/ui/separator";
import DepartmentForm from "./DepartmentForm";

const DepartmentPage = () => {
  return (
    <div className="flex-1 lg:max-w-2xl">
      <div className="space-y-6 ">
        <div>
          <h3 className="text-lg font-medium">Department</h3>
          <p className="text-sm text-muted-foreground">
            Here you configure which group you belong to.
          </p>
          <Separator className="my-6" />
          <DepartmentForm />
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage;

import { User } from "@/api/models/user";
import { getAllDepartments } from "@/api/services/department-service";
import { getEmployee, setDepartment } from "@/api/services/user-service";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useKeycloak } from "@/pages/shared/KeycloakProvider";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Department = {
  id: number;
  name: string;
};

export default function DepartmentForm() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const { userId } = useKeycloak();
  const [user, setUser] = useState<User | null>(null);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    fetchUser();
    fetchDepartments();
  }, [userId]);

  useEffect(() => {
    if (user?.departmentId && departments.length > 0) {
      const defaultDept = departments.find(
        (dept) => dept.id === user.departmentId
      );
      if (defaultDept) {
        setSelectedDepartment(defaultDept);
      }
    }
  }, [user, departments]);

  const fetchUser = async () => {
    try {
      if (userId) {
        const response = await getEmployee(userId);
        setUser(response);
      }
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load user.");
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await getAllDepartments();
      setDepartments(response);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load departments.");
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedDepartment) {
      setValidationError("Please select a department.");
      return;
    }

    try {
      await setDepartment({
        userId: userId,
        departmentId: selectedDepartment.id,
      });
      toast.success("Department updated successfully!");
    } catch (error) {
      toast.error("Failed to update department.");
    }
  };

  if (loading) return <div>Loading departments...</div>;

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-medium tracking-tight text-foreground/90">
        Select Department
      </h2>

      <div className="flex flex-col space-y-2">
        <label htmlFor="department">Department</label>
        <Select
          value={selectedDepartment ? selectedDepartment.id.toString() : ""}
          onValueChange={(value) => {
            const department = departments.find(
              (dept) => dept.id.toString() === value
            );
            if (department) {
              setSelectedDepartment(department);
            }
          }}
        >
          <SelectTrigger id="department">
            <SelectValue placeholder="Select a department">
              {selectedDepartment
                ? selectedDepartment.name
                : "Select a department"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {departments.map((department) => (
              <SelectItem key={department.id} value={department.id.toString()}>
                {department.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {validationError && (
          <p className="text-red-500 text-sm mt-2">{validationError}</p>
        )}
      </div>

      <div className="flex space-x-2 pt-2">
        <Button onClick={handleSubmit}>Save</Button>
        <Button variant="outline" onClick={() => setSelectedDepartment(null)}>
          Clear
        </Button>
      </div>
    </div>
  );
}

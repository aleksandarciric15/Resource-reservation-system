import { Department } from "@/api/models/department";
import { ResourceType } from "@/api/models/resource";
import {
  createDepartment,
  editDepartment,
  getAllDepartments,
} from "@/api/services/department-service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Pagination } from "./Pagination";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Resource type name must be at least 2 characters.",
  }),
});

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemsPerPage] = useState(10); // 10 by default
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [editingDepartment, setEditingDepartment] =
    useState<ResourceType | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    fetchResourceTypes();
  }, []);

  useEffect(() => {
    if (editingDepartment) {
      form.reset({
        name: editingDepartment.name,
      });
    } else {
      form.reset({
        name: "",
      });
    }
  }, [editingDepartment, form]);

  const fetchResourceTypes = async () => {
    try {
      const data = await getAllDepartments();
      setDepartments(data);
    } catch (error) {
      toast.error("Couldnt' load departments!");
    }
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredItems = departments.filter((department) =>
    department.name.toLowerCase().includes(filter.toLowerCase())
  );
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (editingDepartment !== null) {
        const data = { ...values, id: editingDepartment.id };
        const editedDepartment: Department = await editDepartment(data);
        setDepartments((prev) =>
          prev.map((department) =>
            department.id === editedDepartment.id
              ? editedDepartment
              : department
          )
        );
        toast.success("Successfully edited resource!");
      } else {
        const newDepartment: Department = await createDepartment(values);
        setDepartments((prev) => [...prev, newDepartment]);
        toast.success("Successfully department!");
      }
    } catch (error) {
      toast.error("Couldn't create department!");
    } finally {
      setIsDialogOpen(false);
      setEditingDepartment(null);
      form.reset({});
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Filter by department name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 w-80"
      />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>Create Department</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingDepartment ? "Edit" : "Create"} Department
            </DialogTitle>
            <DialogDescription>
              Enter the details for the {editingDepartment ? "existing" : "new"}{" "}
              Department.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter department name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {editingDepartment ? "Update" : "Create"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((department) => (
            <TableRow key={department.id}>
              <TableCell>{department.id}</TableCell>
              <TableCell>{department.name}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mr-2"
                  onClick={() => {
                    setEditingDepartment(department);
                    setIsDialogOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4">
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredItems.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

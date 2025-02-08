import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  createResourceType,
  editResourceType,
  fetchAllResourceTypes,
} from "@/api/services/resource-service";
import { toast } from "sonner";
import { ResourceType } from "@/api/models/resource";
import { Pagination } from "./Pagination";
import { Pencil } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Resource type name must be at least 2 characters.",
  }),
});

export default function ResourceTypeManagement() {
  const [resourceTypes, setResourceTypes] = useState<ResourceType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemsPerPage] = useState(10); // 10 by default
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [editingResourceType, setEditingResourceType] =
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
    if (editingResourceType) {
      form.reset({
        name: editingResourceType.name,
      });
    } else {
      form.reset({
        name: "",
      });
    }
  }, [editingResourceType, form]);

  const fetchResourceTypes = async () => {
    try {
      const data = await fetchAllResourceTypes();
      setResourceTypes(data);
    } catch (error) {
      toast.error("Couldnt' load resource types!");
    }
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredItems = resourceTypes.filter((resourceType) =>
    resourceType.name.toLowerCase().includes(filter.toLowerCase())
  );
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (editingResourceType !== null) {
        const data = { ...values, id: editingResourceType.id };
        const editedResourceType: ResourceType = await editResourceType(data);
        setResourceTypes((prev) =>
          prev.map((resourceType) =>
            resourceType.id === editedResourceType.id
              ? editedResourceType
              : resourceType
          )
        );
        toast.success("Successfully edited resource!");
      } else {
        const newResourceType: ResourceType = await createResourceType(values);
        setResourceTypes((prev) => [...prev, newResourceType]);
        toast.success("Successfully created resoure type!");
      }
    } catch (error) {
      toast.error("Couldn't create resource type!");
    } finally {
      setIsDialogOpen(false);
      form.reset({});
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Filter by resource name or resource name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 w-80"
      />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>Create Resource Type</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingResourceType ? "Edit" : "Create"} Resource Type
            </DialogTitle>
            <DialogDescription>
              Enter the details for the{" "}
              {editingResourceType ? "existing" : "new"} resource type.
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
                      <Input
                        placeholder="Enter resource type name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {editingResourceType ? "Update" : "Create"}
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
          {currentItems.map((resourceType) => (
            <TableRow key={resourceType.id}>
              <TableCell>{resourceType.id}</TableCell>
              <TableCell>{resourceType.name}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mr-2"
                  onClick={() => {
                    setEditingResourceType(resourceType);
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

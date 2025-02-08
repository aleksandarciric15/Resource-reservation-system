import type { Resource, ResourceType } from "@/api/models/resource";
import {
  createResource,
  deleteResource,
  editResource,
  fetchAllResources,
  fetchAllResourceTypes,
} from "@/api/services/resource-service";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Pagination } from "./Pagination";
import YesNoModal from "./YesNoModal";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Resource name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  resourceTypeId: z.string({
    required_error: "Please select a resource type.",
  }),
});

export default function ResourceManagement() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [resourceTypes, setResourceTypes] = useState<ResourceType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedResourceId, setSelectedResourceId] = useState<number | null>(
    null
  );
  const [itemsPerPage] = useState(10); // 10 by default
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [filter, setFilter] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      resourceTypeId: "",
    },
  });

  useEffect(() => {
    fetchResources();
    fetchResourceTypes();
  }, []);

  useEffect(() => {
    if (editingResource) {
      form.reset({
        name: editingResource.name,
        description: editingResource.description,
        resourceTypeId: editingResource.resourceTypeId.toString(),
      });
    } else {
      form.reset({
        name: "",
        description: "",
        resourceTypeId: "",
      });
    }
  }, [editingResource, form]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredItems = resources.filter(
    (resource) =>
      resource.resourceTypeName.toLowerCase().includes(filter.toLowerCase()) ||
      resource.name.toLowerCase().includes(filter.toLowerCase())
  );
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const fetchResources = async () => {
    try {
      const data: Resource[] = await fetchAllResources();
      setResources(data);
    } catch (error) {
      toast.error("Couldnt' load resources!");
    }
  };

  const fetchResourceTypes = async () => {
    try {
      const data = await fetchAllResourceTypes();
      setResourceTypes(data);
    } catch (error) {
      toast.error("Couldnt' load resource types!");
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (editingResource !== null) {
        const data = { ...values, id: editingResource.id };
        const editedResource = await editResource(data);
        setResources((prev) =>
          prev.map((resource) =>
            resource.id === editedResource.id ? editedResource : resource
          )
        );
        toast.success("Successfully edited resource!");
      } else {
        const newResource: Resource = await createResource(values);
        setResources((prev) => [...prev, newResource]);
        toast.success("Successfully created resource!");
      }
    } catch (error) {
      toast.error("Cloudn't create resource!");
    } finally {
      setEditingResource(null);
      setIsDialogOpen(false);
      form.reset({});
    }
  };

  const handleDeleteClick = (id: number) => {
    setSelectedResourceId(id);
    setShowModal(true);
  };

  const confirmDenyReservation = async () => {
    if (selectedResourceId !== null) {
      setShowModal(false);
      handleDeleteResource(selectedResourceId);
      setSelectedResourceId(null);
    }
  };

  const handleDeleteResource = async (id: number) => {
    try {
      await deleteResource(id);
      setResources((prev) => prev.filter((resource) => resource.id !== id));
      toast.success("Successfully deleted resource!");
    } catch (error) {
      toast.error("Couldn't delete resource!");
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
          <Button>Create Resource</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingResource ? "Edit" : "Create"} Resource
            </DialogTitle>
            <DialogDescription>
              Enter the details for the {editingResource ? "existing" : "new"}{" "}
              resource.
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
                      <Input placeholder="Enter resource name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter resource description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resourceTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resource Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a resource type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resourceTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id.toString()}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {editingResource ? "Update" : "Create"}
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
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell>{resource.id}</TableCell>
              <TableCell>{resource.name}</TableCell>
              <TableCell>{resource.description}</TableCell>
              <TableCell>
                {
                  resourceTypes.find(
                    (type) => type.id === resource.resourceTypeId
                  )?.name
                }
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mr-2"
                  onClick={() => {
                    setEditingResource(resource);
                    setIsDialogOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="remove"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(resource.id);
                  }}
                  className="mr-2"
                >
                  <Trash2 className="h-4 w-4" />
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
      <YesNoModal
        showModal={showModal}
        setShowModal={setShowModal}
        onConfirmation={confirmDenyReservation}
        title="Confirm your action"
        description="Do you really want to delete resource?"
      />
    </div>
  );
}

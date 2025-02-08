import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type YesNoModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  onConfirmation: any;
  title: string;
  description: string;
};

const YesNoModal = ({
  showModal,
  setShowModal,
  onConfirmation,
  title,
  description,
}: YesNoModalProps) => {
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={onConfirmation}>
            Yes
          </Button>
          <Button variant="destructive" onClick={() => setShowModal(false)}>
            No
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default YesNoModal;

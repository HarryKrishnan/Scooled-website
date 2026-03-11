import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

interface Props {
  onConfirm: () => void;
}

export default function DeleteSessionDialog({ onConfirm }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors border border-transparent hover:border-rose-500/20">
          <Trash2 size={16} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#0a0f16] border border-rose-500/20 shadow-[0_0_40px_rgba(225,29,72,0.1)]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Delete Session?</AlertDialogTitle>
          <AlertDialogDescription className="text-slate-400">
            This action cannot be undone. This will permanently delete this session from the schedule.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="border-t border-white/5 pt-4 mt-2">
          <AlertDialogCancel className="bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border-0 transition-colors">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-rose-500 text-white hover:bg-rose-600 transition-colors shadow-[0_0_15px_rgba(225,29,72,0.3)]">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

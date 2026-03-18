import { FilePlus, FilePen, Eye, Undo2, ArrowRightLeft, Trash2, FileCode, Loader2 } from "lucide-react";

interface ToolInvocationBadgeProps {
  toolInvocation: {
    toolName: string;
    state: string;
    output?: unknown;
    input: Record<string, unknown>;
  };
}

function basename(path: string): string {
  return path.split("/").pop() ?? path;
}

function getToolLabel(toolName: string, args: Record<string, unknown>): string {
  const command = args.command as string | undefined;
  const path = args.path as string | undefined;
  const newPath = args.new_path as string | undefined;
  const filename = path ? basename(path) : null;

  if (toolName === "str_replace_editor") {
    switch (command) {
      case "create":
        return filename ? `Creating ${filename}` : "Creating file";
      case "str_replace":
        return filename ? `Editing ${filename}` : "Editing file";
      case "insert":
        return filename ? `Editing ${filename}` : "Editing file";
      case "view":
        return filename ? `Reading ${filename}` : "Reading file";
      case "undo_edit":
        return filename ? `Undoing edit in ${filename}` : "Undoing edit";
    }
  }

  if (toolName === "file_manager") {
    switch (command) {
      case "rename":
        return filename && newPath
          ? `Renaming ${filename} → ${basename(newPath)}`
          : "Renaming file";
      case "delete":
        return filename ? `Deleting ${filename}` : "Deleting file";
    }
  }

  return toolName;
}

function getToolIcon(args: Record<string, unknown>) {
  const command = args.command as string | undefined;
  const className = "w-3 h-3 text-neutral-500";

  switch (command) {
    case "create":
      return <FilePlus className={className} />;
    case "str_replace":
    case "insert":
      return <FilePen className={className} />;
    case "view":
      return <Eye className={className} />;
    case "undo_edit":
      return <Undo2 className={className} />;
    case "rename":
      return <ArrowRightLeft className={className} />;
    case "delete":
      return <Trash2 className={className} />;
    default:
      return <FileCode className={className} />;
  }
}

export function ToolInvocationBadge({ toolInvocation }: ToolInvocationBadgeProps) {
  const { toolName, state, output, input } = toolInvocation;
  const label = getToolLabel(toolName, input);
  const icon = getToolIcon(input);
  const isDone = state === "output-available" && output != null;

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs border border-neutral-200">
      {icon}
      <span className="text-neutral-700">{label}</span>
      {isDone ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
      )}
    </div>
  );
}

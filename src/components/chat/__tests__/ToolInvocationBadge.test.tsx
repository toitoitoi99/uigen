import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolInvocationBadge } from "../ToolInvocationBadge";

afterEach(() => {
  cleanup();
});

function makeProps(toolName: string, input: Record<string, unknown>, state = "output-available", output: unknown = "ok") {
  return { toolInvocation: { toolName, input, state, output } };
}

test("label — create", () => {
  render(<ToolInvocationBadge {...makeProps("str_replace_editor", { command: "create", path: "src/App.jsx" })} />);
  expect(screen.getByText("Creating App.jsx")).toBeDefined();
});

test("label — str_replace", () => {
  render(<ToolInvocationBadge {...makeProps("str_replace_editor", { command: "str_replace", path: "src/Card.jsx" })} />);
  expect(screen.getByText("Editing Card.jsx")).toBeDefined();
});

test("label — insert", () => {
  render(<ToolInvocationBadge {...makeProps("str_replace_editor", { command: "insert", path: "src/utils.ts" })} />);
  expect(screen.getByText("Editing utils.ts")).toBeDefined();
});

test("label — view", () => {
  render(<ToolInvocationBadge {...makeProps("str_replace_editor", { command: "view", path: "src/index.tsx" })} />);
  expect(screen.getByText("Reading index.tsx")).toBeDefined();
});

test("label — undo_edit", () => {
  render(<ToolInvocationBadge {...makeProps("str_replace_editor", { command: "undo_edit", path: "src/App.jsx" })} />);
  expect(screen.getByText("Undoing edit in App.jsx")).toBeDefined();
});

test("label — rename", () => {
  render(<ToolInvocationBadge {...makeProps("file_manager", { command: "rename", path: "src/Old.jsx", new_path: "src/New.jsx" })} />);
  expect(screen.getByText("Renaming Old.jsx → New.jsx")).toBeDefined();
});

test("label — delete", () => {
  render(<ToolInvocationBadge {...makeProps("file_manager", { command: "delete", path: "src/Old.jsx" })} />);
  expect(screen.getByText("Deleting Old.jsx")).toBeDefined();
});

test("label — missing path", () => {
  render(<ToolInvocationBadge {...makeProps("str_replace_editor", { command: "create" })} />);
  expect(screen.getByText("Creating file")).toBeDefined();
});

test("label — unknown tool", () => {
  render(<ToolInvocationBadge {...makeProps("unknown_tool", {})} />);
  expect(screen.getByText("unknown_tool")).toBeDefined();
});

test("state — pending shows spinner", () => {
  const { container } = render(
    <ToolInvocationBadge toolInvocation={{ toolName: "str_replace_editor", input: { command: "create", path: "src/App.jsx" }, state: "input-streaming" }} />
  );
  expect(container.querySelector(".animate-spin")).toBeDefined();
});

test("state — result shows green dot", () => {
  const { container } = render(
    <ToolInvocationBadge toolInvocation={{ toolName: "str_replace_editor", input: { command: "create", path: "src/App.jsx" }, state: "output-available", output: "ok" }} />
  );
  expect(container.querySelector(".bg-emerald-500")).toBeDefined();
});

test("state — result with null output shows spinner", () => {
  const { container } = render(
    <ToolInvocationBadge toolInvocation={{ toolName: "str_replace_editor", input: { command: "create", path: "src/App.jsx" }, state: "output-available", output: null }} />
  );
  expect(container.querySelector(".animate-spin")).toBeDefined();
});

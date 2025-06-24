"use client";

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  Quote,
  Minus,
  Pilcrow,
  Undo2,
  Redo2,
  Underline as UnderlineIcon,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function TiptapEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      TextStyle,
      Color,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const buttonBase =
    "flex items-center justify-center p-2 border rounded-md hover:bg-gray-100 disabled:opacity-40";
  const activeClass = "bg-blue-500 text-white";

  const iconButton = (
    icon: React.ReactNode,
    label: string,
    onClick: () => void,
    isActive: boolean = false,
    disabled: boolean = false,
  ) => (
    <button
      type="button" // <-- Add this
      onClick={onClick}
      disabled={disabled}
      title={label}
      className={`${buttonBase} ${isActive ? activeClass : ""}`}
    >
      {icon}
    </button>
  );

  return (
    <div className="space-y-4 rounded-md border p-4">
      <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-13">
        {iconButton(
          <Bold size={16} />,
          "Bold",
          () => editor.chain().focus().toggleBold().run(),
          editor.isActive("bold"),
          !editor.can().chain().focus().toggleBold().run(),
        )}
        {iconButton(
          <Italic size={16} />,
          "Italic",
          () => editor.chain().focus().toggleItalic().run(),
          editor.isActive("italic"),
        )}
        {iconButton(
          <UnderlineIcon size={16} />,
          "Underline",
          () => editor.chain().focus().toggleUnderline?.().run(),
          editor.isActive("underline"),
        )}
        {iconButton(
          <Strikethrough size={16} />,
          "Strike",
          () => editor.chain().focus().toggleStrike().run(),
          editor.isActive("strike"),
        )}
        {iconButton(
          <Code size={16} />,
          "Inline Code",
          () => editor.chain().focus().toggleCode().run(),
          editor.isActive("code"),
        )}
        <div />
        {iconButton(
          <Pilcrow size={16} />,
          "Paragraph",
          () => editor.chain().focus().setParagraph().run(),
          editor.isActive("paragraph"),
        )}
        {iconButton(
          <Heading1 size={16} />,
          "H1",
          () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
          editor.isActive("heading", { level: 1 }),
        )}
        {iconButton(
          <Heading2 size={16} />,
          "H2",
          () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          editor.isActive("heading", { level: 2 }),
        )}
        {iconButton(
          <Heading3 size={16} />,
          "H3",
          () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
          editor.isActive("heading", { level: 3 }),
        )}
        {iconButton(
          <Heading4 size={16} />,
          "H4",
          () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
          editor.isActive("heading", { level: 4 }),
        )}
        {iconButton(
          <Heading5 size={16} />,
          "H5",
          () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
          editor.isActive("heading", { level: 5 }),
        )}
        {iconButton(
          <Heading6 size={16} />,
          "H6",
          () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
          editor.isActive("heading", { level: 6 }),
        )}
        {iconButton(
          <List size={16} />,
          "Bullet List",
          () => editor.chain().focus().toggleBulletList().run(),
          editor.isActive("bulletList"),
        )}
        {iconButton(
          <ListOrdered size={16} />,
          "Ordered List",
          () => editor.chain().focus().toggleOrderedList().run(),
          editor.isActive("orderedList"),
        )}
        {iconButton(
          <Quote size={16} />,
          "Blockquote",
          () => editor.chain().focus().toggleBlockquote().run(),
          editor.isActive("blockquote"),
        )}
        {iconButton(<Minus size={16} />, "Horizontal Rule", () =>
          editor.chain().focus().setHorizontalRule().run(),
        )}
        {iconButton(<Pilcrow size={16} />, "Hard Break", () =>
          editor.chain().focus().setHardBreak().run(),
        )}
        <div className="col-span-6" />

        {iconButton(
          <Undo2 size={16} />,
          "Undo",
          () => editor.chain().focus().undo().run(),
          false,
          !editor.can().chain().focus().undo().run(),
        )}
        {iconButton(
          <Redo2 size={16} />,
          "Redo",
          () => editor.chain().focus().redo().run(),
          false,
          !editor.can().chain().focus().redo().run(),
        )}
      </div>

      <EditorContent
        editor={editor}
        className="prose min-h-[10px] p-2 focus:outline-none"
      />
    </div>
  );
}

"use client";

import { useEffect } from "react";
import {
  EditorContent,
  useEditor,
} from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import ItalicIcon from "./icons/ItalicIcon";
import ToolbarButton from "./ToolbarButton";
import BoldIcon from "./icons/BoldIcon";
import UnderlineIcon from "./icons/UnderlineIcon";
import H1Icon from "./icons/H1Icon";
import H2Icon from "./icons/H2Icon";
import H3Icon from "./icons/H3Icon";
import BulletListIcon from "./icons/BulletList";
import OrderedListIcon from "./icons/OrderedList";
import AlignTextLeftIcon from "./icons/AlignTextLeftIcon";
import AlignTextRightIcon from "./icons/AlignTextRightIcon";
import AlignTextCenterIcon from "./icons/AlignTextCenterIcon";

interface RichTextEditorProps {
  content: string;
  onChange?: (content: string) => void;
  editable?: boolean;
}

export default function RichTextEditor({
  content,
  onChange,
  editable = true,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Bold,
      Italic,
      Underline,
      ListItem,
      BulletList,
      OrderedList,
      Placeholder.configure({
        placeholder:
          "Descrição de como fazer sua receita...",
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      if (onChange && editable) {
        onChange(editor.getHTML());
      }
    },
    editable,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  useEffect(() => {
    if (editor) {
      editor.setEditable(editable);
    }
  }, [editor, editable]);

  if (!editor) {
    return null;
  }

  return (
    <div className="prose max-w-none border border-muted rounded-xl">
      <header className="flex flex-wrap gap-3 items-center border-b border-muted p-2">
        <ToolbarButton
          icon={<BoldIcon size="sm" />}
          isActive={editor.isActive("bold")}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
        />
        <ToolbarButton
          icon={<ItalicIcon size="sm" />}
          isActive={editor.isActive("italic")}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
        />
        <ToolbarButton
          icon={<UnderlineIcon size="sm" />}
          isActive={editor.isActive("underline")}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleUnderline()
              .run()
          }
        />
        <ToolbarButton
          icon={<H1Icon size="sm" />}
          isActive={editor.isActive("heading", {
            level: 1,
          })}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 1 })
              .run()
          }
        />
        <ToolbarButton
          icon={<H2Icon size="sm" />}
          isActive={editor.isActive("heading", {
            level: 2,
          })}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 2 })
              .run()
          }
        />
        <ToolbarButton
          icon={<H3Icon size="sm" />}
          isActive={editor.isActive("heading", {
            level: 3,
          })}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 3 })
              .run()
          }
        />
        <ToolbarButton
          icon={<BulletListIcon size="sm" />}
          isActive={editor.isActive(
            "orderedList"
          )}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          }
        />
        <ToolbarButton
          icon={<OrderedListIcon size="sm" />}
          isActive={editor.isActive(
            "orderedList"
          )}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleOrderedList()
              .run()
          }
        />
        <ToolbarButton
          icon={<AlignTextLeftIcon size="sm" />}
          isActive={
            editor.isActive("heading", {
              textAlign: "left",
            }) ||
            editor.isActive("paragraph", {
              textAlign: "left",
            })
          }
          onClick={() =>
            editor
              .chain()
              .focus()
              .setTextAlign("left")
              .run()
          }
        />
        <ToolbarButton
          icon={<AlignTextCenterIcon size="sm" />}
          isActive={
            editor.isActive("heading", {
              textAlign: "center",
            }) ||
            editor.isActive("paragraph", {
              textAlign: "center",
            })
          }
          onClick={() =>
            editor
              .chain()
              .focus()
              .setTextAlign("center")
              .run()
          }
        />
        <ToolbarButton
          icon={<AlignTextRightIcon size="sm" />}
          isActive={
            editor.isActive("heading", {
              textAlign: "right",
            }) ||
            editor.isActive("paragraph", {
              textAlign: "right",
            })
          }
          onClick={() =>
            editor
              .chain()
              .focus()
              .setTextAlign("right")
              .run()
          }
        />
      </header>
      <main className="max-h-64 overflow-y-auto">
        <EditorContent
          editor={editor}
          className="px-2"
        />
      </main>
    </div>
  );
}

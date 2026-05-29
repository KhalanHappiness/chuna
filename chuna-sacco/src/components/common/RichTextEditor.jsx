import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import Link from '@tiptap/extension-link'
import { adminAPI } from '../../api/axios'

const MenuBar = ({ editor }) => {
  if (!editor) return null

  const addImage = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
      const file = input.files[0]
      if (!file) return
      try {
        const formData = new FormData()
        formData.append('file', file)
        const res = await adminAPI.uploadImage(formData)
        editor.chain().focus().setImage({ src: res.data.url }).run()
      } catch (err) {
        console.error('Image upload failed', err)
      }
    }
    input.click()
  }

  const addYoutube = () => {
    const url = window.prompt('Enter YouTube URL')
    if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run()
  }

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Enter URL', previousUrl || 'https://')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const btn = (active) =>
    `px-2 py-1 rounded text-sm ${active ? 'bg-primary-500 text-white' : 'bg-white border'}`

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${btn(editor.isActive('bold'))} font-bold`}>B</button>

      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${btn(editor.isActive('italic'))} italic`}>I</button>

      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={btn(editor.isActive('heading', { level: 2 }))}>H2</button>

      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={btn(editor.isActive('heading', { level: 3 }))}>H3</button>

      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btn(editor.isActive('bulletList'))}>• List</button>

      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btn(editor.isActive('orderedList'))}>1. List</button>

      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={btn(editor.isActive('blockquote'))}>″ Quote</button>

      <button type="button" onClick={addLink}
        className={btn(editor.isActive('link'))}>🔗 Link</button>

      {editor.isActive('link') && (
        <button type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="px-2 py-1 rounded text-sm bg-red-100 border border-red-300 text-red-600">
          ✕ Unlink
        </button>
      )}

      <button type="button" onClick={addImage}
        className="px-2 py-1 rounded text-sm bg-white border">🖼 Image</button>

      <button type="button" onClick={addYoutube}
        className="px-2 py-1 rounded text-sm bg-white border">▶ Video</button>

      <button type="button" onClick={() => editor.chain().focus().undo().run()}
        className="px-2 py-1 rounded text-sm bg-white border">↩ Undo</button>

      <button type="button" onClick={() => editor.chain().focus().redo().run()}
        className="px-2 py-1 rounded text-sm bg-white border">↪ Redo</button>
    </div>
  )
}

const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Image,
      Youtube.configure({ controls: true }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: 'text-primary-500 underline cursor-pointer',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
    ],
    content: value || '',
    onCreate: ({ editor }) => {
      console.log('onCreate fired — value:', JSON.stringify(value))
    // Runs once editor is fully ready — force-load content if it exists
    if (value && editor.getHTML() !== value) {
      editor.commands.setContent(value)
       }
     },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // When editing, `value` arrives after the editor mounts (API fetch completes).
  // This effect detects that and loads the content into the editor.
  useEffect(() => {
      console.log('useEffect — value:', JSON.stringify(value), 'editor HTML:', editor?.getHTML())

    if (!editor || value === undefined) return
    // Avoid resetting if content is already the same (prevents cursor jumping while typing)
    if (editor.getHTML() === value) return
    editor.commands.setContent(value)
  }, [value, editor])

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary-500">
      <MenuBar editor={editor} />
      {/*
        The [&_ul] and [&_ol] Tailwind classes below are the fix for the list bullet/number
        display issue. Tailwind's base CSS reset (preflight) removes all default list styles,
        so even though Tiptap correctly outputs <ul> and <ol> tags, no bullets or numbers
        appear. These arbitrary variant classes restore them inside the editor.
      */}
      <EditorContent
        editor={editor}
        className="
          prose max-w-none p-4 min-h-[250px]
          [&_ul]:list-disc [&_ul]:pl-6
          [&_ol]:list-decimal [&_ol]:pl-6
          [&_li]:my-0.5
          [&_a]:text-primary-500 [&_a]:underline
        "
      />
    </div>
  )
}

export default RichTextEditor
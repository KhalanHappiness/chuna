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
    // Cancelled
    if (url === null) return
    // Empty — remove link
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const btnClass = (active) =>
    `px-2 py-1 rounded text-sm ${active ? 'bg-primary-500 text-white' : 'bg-white border'}`

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${btnClass(editor.isActive('bold'))} font-bold`}>
        B
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${btnClass(editor.isActive('italic'))} italic`}>
        I
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={btnClass(editor.isActive('heading', { level: 2 }))}>
        H2
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={btnClass(editor.isActive('heading', { level: 3 }))}>
        H3
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btnClass(editor.isActive('bulletList'))}>
        • List
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btnClass(editor.isActive('orderedList'))}>
        1. List
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={btnClass(editor.isActive('blockquote'))}>
        " Quote
      </button>
      <button type="button" onClick={addLink}
        className={btnClass(editor.isActive('link'))}>
        🔗 Link
      </button>
      {editor.isActive('link') && (
        <button type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="px-2 py-1 rounded text-sm bg-red-100 border border-red-300 text-red-600">
          ✕ Unlink
        </button>
      )}
      <button type="button" onClick={addImage}
        className="px-2 py-1 rounded text-sm bg-white border">
        🖼 Image
      </button>
      <button type="button" onClick={addYoutube}
        className="px-2 py-1 rounded text-sm bg-white border">
        ▶ Video
      </button>
      <button type="button" onClick={() => editor.chain().focus().undo().run()}
        className="px-2 py-1 rounded text-sm bg-white border">
        ↩ Undo
      </button>
      <button type="button" onClick={() => editor.chain().focus().redo().run()}
        className="px-2 py-1 rounded text-sm bg-white border">
        ↪ Redo
      </button>
    </div>
  )
}

const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Image,
      Youtube.configure({ controls: true }),
      Link.configure({
        openOnClick: false,        // Don't navigate on click in editor
        autolink: true,            // Auto-detect URLs as you type
        linkOnPaste: true,         // Convert pasted URLs to links
        HTMLAttributes: {
          class: 'text-primary-500 underline cursor-pointer',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary-500">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="prose max-w-none p-4 min-h-[250px]"
      />
    </div>
  )
}

export default RichTextEditor
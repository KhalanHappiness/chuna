import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
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

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-2 py-1 rounded text-sm font-bold ${editor.isActive('bold') ? 'bg-primary-500 text-white' : 'bg-white border'}`}>
        B
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-2 py-1 rounded text-sm italic ${editor.isActive('italic') ? 'bg-primary-500 text-white' : 'bg-white border'}`}>
        I
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-2 py-1 rounded text-sm ${editor.isActive('heading', { level: 2 }) ? 'bg-primary-500 text-white' : 'bg-white border'}`}>
        H2
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-2 py-1 rounded text-sm ${editor.isActive('heading', { level: 3 }) ? 'bg-primary-500 text-white' : 'bg-white border'}`}>
        H3
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-2 py-1 rounded text-sm ${editor.isActive('bulletList') ? 'bg-primary-500 text-white' : 'bg-white border'}`}>
        • List
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-2 py-1 rounded text-sm ${editor.isActive('orderedList') ? 'bg-primary-500 text-white' : 'bg-white border'}`}>
        1. List
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-2 py-1 rounded text-sm ${editor.isActive('blockquote') ? 'bg-primary-500 text-white' : 'bg-white border'}`}>
        " Quote
      </button>
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
      StarterKit,
      Image,
      Youtube.configure({ controls: true }),
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
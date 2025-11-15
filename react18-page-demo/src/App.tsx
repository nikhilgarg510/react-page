import { useState } from 'react'
import Editor from '@react-page/editor'
import type { Value } from '@react-page/editor'
import slate from '@react-page/plugins-slate'
import '../../packages/editor/lib/index.css'
import '../../packages/plugins/content/slate/lib/index.css'
import './App.css'

function App() {
  const [value, setValue] = useState<Value | undefined>(undefined)

  const cellPlugins = [slate()]

  return (
    <div style={{ padding: '20px' }}>
      <h1>React Page Editor - React 18 Demo with Slate</h1>
      <p>Edit content below. Changes to packages/editor/src will reflect instantly!</p>
      <p>Click anywhere in the editor to add content blocks.</p>

      <Editor
        value={value}
        onChange={setValue}
        cellPlugins={cellPlugins}
      />
    </div>
  )
}

export default App

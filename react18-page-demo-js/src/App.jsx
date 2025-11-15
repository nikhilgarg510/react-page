import { useState } from 'react'
import Editor from '@react-page/editor'
import slate from '@react-page/plugins-slate'
import '@react-page/editor/lib/index.css'
import '@react-page/plugins-slate/lib/index.css'
import './App.css'

function App() {
  const [value, setValue] = useState(undefined)

  const cellPlugins = [slate()]

  return (
    <div style={{ padding: '20px' }}>
      <h1>React Page Editor - React 18 Demo (JavaScript) with Slate</h1>
      <p>Using exportable .tgz packages with ESM-first build!</p>
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

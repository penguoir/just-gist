import React from 'react'
import { useRouter } from 'next/router'

import File from '../components/file'

const GistPage = () => {
  const router = useRouter() 
  const gist_id = router.query.gist_id

  const [files, setFiles] = React.useState([])

  React.useEffect(() => {
    const updateGist = async () => {
      setFiles([])

      const data = await fetch(`https://api.github.com/gists/${gist_id}`)
      const { files } = await data.json()

      Object.keys(files).forEach(async (key) => {
        const req = await fetch(files[key].raw_url)
        const file_content = await req.text()

        setFiles(prevFiles => [...prevFiles, {
          filename: files[key].filename,
          language: files[key].language,
          content: file_content
        }])
      })
    }

    if (gist_id) {
      updateGist()
    } else {
      console.log('Gist ID is not defined')
    }
  }, [gist_id])

  return (
    <div className="background">
      {files.map(f =>
        <File key={f.filename} filename={f.filename} markdown={f.content} />
      )}

        {/* #fcfbf9 */}
    </div>
  )
}

export default GistPage

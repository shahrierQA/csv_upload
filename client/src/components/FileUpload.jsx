import { CloudUploadIcon } from "@heroicons/react/outline"

const FileUpload = ({ children, fileRef, ...props }) => {
  return (
    <div className="pt-2">
      <input ref={fileRef} type="file" hidden {...props} />
      <div onClick={() => fileRef.current.click()} className="input-file">
        <span>
          <CloudUploadIcon width={24} height={24} />
        </span>
        <span>{children}</span>
      </div>
    </div>
  )
}

export default FileUpload

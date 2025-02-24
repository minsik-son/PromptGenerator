"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { uploadImage } from "@/lib/firebase/uploadImage"

interface FileUploadProps {
  onFileSelect: (fileUrl: string | null) => void;
  className?: string
}

export default function FileUpload({ onFileSelect, className }: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const fileUrl = await uploadImage(file);
        if (fileUrl){
          onFileSelect(fileUrl);
          setPreview(fileUrl);

        }
      }
    },
    [onFileSelect],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxFiles: 1,
  })

  const removeFile = () => {
    setPreview(null)
    onFileSelect(null)
  }

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-4 transition-colors",
          "min-h-[200px] flex items-center justify-center cursor-pointer",
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          preview ? "bg-background" : "bg-muted/50",
        )}
      >
        <input {...getInputProps()} />
        <AnimatePresence>
          {preview ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full h-full min-h-[200px]"
            >
              <img src={preview || "/placeholder.svg"} alt="Preview" className="object-contain w-full h-full" />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile()
                }}
                className="absolute top-2 right-2 p-1 rounded-full bg-background/80 hover:bg-background"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-2"
            >
              <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
              <div className="text-sm">
                <span className="font-medium text-primary">Click to upload</span> or drag and drop
              </div>
              <p className="text-xs text-muted-foreground">PNG, JPG, JPEG or WebP (max. 5MB)</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}


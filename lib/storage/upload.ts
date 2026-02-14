import { createClient } from "@/lib/supabase/client"
import { nanoid } from "nanoid"

/**
 * Uploads a video file to the 'pitch-videos' bucket.
 * 
 * @param file The file object to upload
 * @param userId The ID of the user uploading the file (used for folder structure)
 * @returns Object containing the public URL and storage path
 */
export async function uploadPitchVideo(file: File, userId: string) {
    const supabase = createClient()
    const fileExt = file.name.split(".").pop()
    const fileName = `${nanoid()}.${fileExt}`
    const filePath = `${userId}/${fileName}`

    const { error } = await supabase.storage
        .from("pitch-videos")
        .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
        })

    if (error) {
        throw error
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from("pitch-videos")
        .getPublicUrl(filePath)

    return {
        path: filePath,
        publicUrl,
    }
}

/**
 * Deletes a video file from the 'pitch-videos' bucket.
 * 
 * @param path The full storage path of the file to delete (e.g. "user_123/video.mp4")
 */
export async function deletePitchVideo(path: string) {
    const supabase = createClient()
    const { error } = await supabase.storage
        .from("pitch-videos")
        .remove([path])

    if (error) {
        console.error("Failed to delete old video:", error)
        // We don't throw here because the new upload might still succeed, 
        // and we don't want to block the user flow for a cleanup error.
    }
}

/**
 * Uploads an image file to the 'pitch-assets' bucket.
 * 
 * @param file The file object to upload
 * @param userId The ID of the user uploading the file
 * @returns Object containing the public URL and storage path
 */
export async function uploadPitchImage(file: File, userId: string) {
    const supabase = createClient()

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        throw new Error("Image file too large. Max 5MB.")
    }

    const fileExt = file.name.split(".").pop()
    const fileName = `${nanoid()}.${fileExt}`
    const filePath = `${userId}/images/${fileName}`

    const { error } = await supabase.storage
        .from("pitch-assets")
        .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type
        })

    if (error) {
        throw error
    }

    const { data: { publicUrl } } = supabase.storage
        .from("pitch-assets")
        .getPublicUrl(filePath)

    return {
        path: filePath,
        publicUrl,
    }
}

/**
 * Deletes an image file from the 'pitch-assets' bucket.
 * 
 * @param path The full storage path of the file to delete
 */
export async function deletePitchImage(path: string) {
    const supabase = createClient()
    const { error } = await supabase.storage
        .from("pitch-assets")
        .remove([path])

    if (error) {
        console.error("Failed to delete image:", error)
    }
}

/**
 * Uploads a resume file to the 'pitch-assets' bucket.
 * 
 * @param file The file object to upload
 * @param userId The ID of the user uploading the file
 * @returns Object containing the public URL and storage path
 */
export async function uploadPitchResume(file: File, userId: string) {
    const supabase = createClient()

    // Validate file size (10MB max for resumes)
    if (file.size > 10 * 1024 * 1024) {
        throw new Error("Resume file too large. Max 10MB.")
    }

    // Validate mime type
    const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]
    if (!allowedTypes.includes(file.type)) {
        throw new Error("Invalid file type. Only PDF, DOC, and DOCX are allowed.")
    }

    const fileExt = file.name.split(".").pop()
    const fileName = `${nanoid()}.${fileExt}`
    const filePath = `${userId}/resumes/${fileName}`

    const { error } = await supabase.storage
        .from("pitch-assets")
        .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type
        })

    if (error) {
        throw error
    }

    const { data: { publicUrl } } = supabase.storage
        .from("pitch-assets")
        .getPublicUrl(filePath)

    return {
        path: filePath,
        publicUrl,
    }
}

/**
 * Deletes a resume file from the 'pitch-assets' bucket.
 * 
 * @param path The full storage path of the file to delete
 */
export async function deletePitchResume(path: string) {
    const supabase = createClient()
    const { error } = await supabase.storage
        .from("pitch-assets")
        .remove([path])

    if (error) {
        console.error("Failed to delete resume:", error)
    }
}

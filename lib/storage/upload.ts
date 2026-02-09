import { createClient } from "@/lib/supabase/client"
import { nanoid } from "nanoid"

/**
 * Uploads a video file to the 'pitch-media' bucket.
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
        .from("pitch-media")
        .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
        })

    if (error) {
        throw error
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from("pitch-media")
        .getPublicUrl(filePath)

    return {
        path: filePath,
        publicUrl,
    }
}

/**
 * Deletes a video file from the 'pitch-media' bucket.
 * 
 * @param path The full storage path of the file to delete (e.g. "user_123/video.mp4")
 */
export async function deletePitchVideo(path: string) {
    const supabase = createClient()
    const { error } = await supabase.storage
        .from("pitch-media")
        .remove([path])

    if (error) {
        console.error("Failed to delete old video:", error)
        // We don't throw here because the new upload might still succeed, 
        // and we don't want to block the user flow for a cleanup error.
    }
}

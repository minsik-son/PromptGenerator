import { storage } from "@/lib/firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const storageRef = ref(storage, `uploads/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    console.log("✅ Firebase Storage Test Success:", downloadURL);
    return downloadURL; // 업로드된 이미지의 URL 반환
  } catch (error) {
    console.error("Firebase Upload Error:", error);
    return null;
  }
};

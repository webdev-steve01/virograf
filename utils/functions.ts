export const handleImageUpload = async (
  event: React.ChangeEvent<HTMLInputElement>,
  setImageUrl: (url: string) => void
) => {
  if (!event.target.files || event.target.files.length === 0) return;

  const file = event.target.files[0];

  // ✅ Validate file is an image
  if (!file.type.startsWith("image/")) {
    alert("Please select a valid image file.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "virofund"); // Replace with your Cloudinary preset

  try {
    // Upload to Cloudinary
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dlpty7kky/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.secure_url) {
      setImageUrl(data.secure_url); // Update imageUrl state
      console.log("Image URL:", data.secure_url); // ✅ Log the actual uploaded URL
    }
  } catch (error) {
    console.error("Upload failed:", error);
  }
};

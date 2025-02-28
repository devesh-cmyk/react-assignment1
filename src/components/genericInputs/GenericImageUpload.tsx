import { useState } from 'react';
import { useFormContext } from 'react-hook-form';


type ImageUploadType = {
  name: string;
  accept?: string;
  placeholder?: string;
};

const GenericImageUpload = ({ name, accept = 'image/*', placeholder }: ImageUploadType) => {
  const { register } = useFormContext();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);

    //   setValue(name, file);
    }
  };

  return (
    <div>
      <input
        {...register(name)}
        className="w-[350px] outline-none p-2 py-2 rounded-sm"
        type="file"
        accept={accept}
        placeholder={placeholder}
        onChange={handleImageChange}
      />
      {imagePreview && (
        <div className="mt-2">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-[150px] h-[150px] object-cover rounded-sm"
          />
        </div>
      )}
    </div>
  );
};

export default GenericImageUpload;

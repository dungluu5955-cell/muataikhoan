import { NextResponse } from "next/server";
import { assertAdminRequest } from "@/lib/server-auth";
import { cloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
  const authError = await assertAdminRequest();

  if (authError) {
    return authError;
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folderValue = formData.get("folder");
    const folder = typeof folderValue === "string" && folderValue.trim() ? folderValue : "products";

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "Không tìm thấy file upload." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;

    const uploaded = await cloudinary.uploader.upload(dataUri, {
      folder: `mua-tai-khoan/${folder}`,
      resource_type: "image"
    });

    return NextResponse.json(
      {
        message: "Upload thành công.",
        item: {
          imageUrl: uploaded.secure_url,
          publicId: uploaded.public_id
        }
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ message: "Không thể upload ảnh lên Cloudinary." }, { status: 500 });
  }
}

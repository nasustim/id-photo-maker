"use client";

import { ImageUploader } from "@/components/composites/image-uploader";
import { useIdImage } from "@/hooks/useIdImage";

export default function Home() {
	const { setImage, download, rawImage, predictedImage } = useIdImage();

	return (
		<div className="flex justify-items-center min-h-screen p-10 gap-1">
			<main className="flex-[3] flex justify-items-center">
				<div className="w-full h-full">
					{predictedImage && (
						<img src={predictedImage} className="w-full" alt="predicted" />
					)}
				</div>
			</main>
			<nav className="flex-1 flex flex-col">
				<div>
					<ImageUploader onUpload={setImage} />
				</div>
				{rawImage && (
					<>
						<div className="h-[200px] flex-grow-0 flex-shrink-0">
							<img src={rawImage} className="h-full" alt="uploaded portlait" />
						</div>
						<button
							type="button"
							onClick={() => {
								download();
							}}
						>
							Download
						</button>
					</>
				)}
			</nav>
		</div>
	);
}

"use client";

import type { FC } from "react";

type Props = {
	onUpload: (file: File) => void;
};

export const ImageUploader: FC<Props> = ({ onUpload }) => {
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return; // todo: handle error

		onUpload(file);
	};

	return <input type="file" accept="image/*" onChange={onChange} />;
};

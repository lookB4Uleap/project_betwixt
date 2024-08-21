"use client"

import Image from 'next/image';
import React from 'react';

type ImageContainerProps = {
    name?: string,
    url?: string
}

function ImageContainer(props: ImageContainerProps) {
  return (
    <div className="flex flex-1 items-center justify-center">
        <Image 
            src={props?.url ?? "https://picsum.photos/seed/picsum/400/400"}
            alt={`Image ${props?.name ?? "IMAGE"}`}
            width={400}
            height={400}
            // fill
        />
    </div>
  );
}

export default ImageContainer;
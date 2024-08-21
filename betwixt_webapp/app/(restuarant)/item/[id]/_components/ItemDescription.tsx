"use client";

import React from "react";

function ItemDescription() {
    return (
		<div className="flex flex-1 flex-col items-start justify-center px-24">
			<div
				className="text-black dark:text-white"
			>
				Price
			</div>
			<div className="text-black dark:text-white">Quantity</div>
			<div className="text-black dark:text-white">Info</div>
			<div className="flex flex-col items-center justify-center">
				<div className="text-black dark:text-white">Info1</div>
				<div className="text-black dark:text-white">Info1</div>
				<div className="text-black dark:text-white">Info1</div>
			</div>
		</div>
	);
}

export default ItemDescription;

import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
    product: Product;
}
const ProductCard = ({ product }: Props) => {
    return (
        <Link href={`/products/${product._id}`} className="product-card">
            <div className="product-card_img-container  bg-white rounded-md p-4">
                <Image
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="product-card_img"
                />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="product-title">{product.title}</h3>
            </div>

            <div>
                <p className="text-black text-lg font-semibold">
                    <span>{product?.currency}</span>
                    <span>{product?.currentPrice}</span>
                </p>
            </div>
        </Link>
    );
};

export default ProductCard;

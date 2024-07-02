"use client";
import { scrapeAndStoreProduct } from "@/lib/actions";
import React, { FormEvent, useState } from "react";

const isValidAmazonProductURL = (url: string) => {
    try {
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname;

        if (
            hostname.includes("amazon.com") ||
            hostname.includes("amazon.") ||
            hostname.includes("amazon")
        ) {
            return true;
        }
    } catch (error) {
        return false;
    }

    return false;
};

const Searchbar = () => {
    const [searchPrompt, setSearchPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isValidLink = isValidAmazonProductURL(searchPrompt);

        if (!isValidLink) return alert("Please provide a valid Amazon link");

        try {
            setIsLoading(true);

            //Scrape the product page
            const product = await scrapeAndStoreProduct(searchPrompt);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter product link"
                value={searchPrompt}
                onChange={(event) => setSearchPrompt(event.target.value)}
                className="searchbar-input"
            ></input>

            <button
                type="submit"
                className="searchbar-btn"
                disabled={searchPrompt === ""}
            >
                Search
            </button>
        </form>
    );
};

export default Searchbar;
